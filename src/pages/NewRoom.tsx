import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import {database} from '../services/firebase'
import { Button } from '../components/Button'
import '../styles/auth.scss';

import { useAuth } from '../hooks/useAuth';



export function NewRoom(){
    const { user } = useAuth();

    const [newRoom, setNewRoom] =  useState('');
    
    const history = useHistory()
async function handleCreateRoom(event:FormEvent){
event.preventDefault();

    if(newRoom.trim() === "" ){
        return;
    }
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
    });

history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h2>Criar uma nova sala</h2>
                  
                    <form onSubmit={handleCreateRoom}>
                        <input 
                        type="text"
                        placeholder="Nome da sala"
                        onChange={event=> setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> 
                    </p>
                </div>
            </main>
        </div>
    )
}