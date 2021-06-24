import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { auth, database, firebase } from '../services/firebase'
import { useAuth } from '../hooks/useAuth';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import '../styles/auth.scss';
import userEvent from '@testing-library/user-event';



export function Home(){
const history = useHistory()
const {signInWithGoogle, user} = useAuth();
const [roomCode, setRoomCode] = useState('')

async function handleCreateRoom(){
    if(!user){
        await signInWithGoogle()
    }

        history.push('/rooms/new')
    }
    
async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === ''){
        return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
        alert('room does not exist')

    }
    history.push(`/rooms/${roomCode}`);
}

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustação simbolizando perguntas e respontas" />
                <strong>Crie salas de Q&amp;A ao </strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="let me ask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text"
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value= {roomCode}
                        />
                        <Button type="submit">
                            entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}