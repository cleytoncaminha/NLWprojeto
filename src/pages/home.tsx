import { useHistory } from 'react-router-dom';

import { auth, firebase } from '../services/firebase'
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


async function HandleCreateRoom(){
    if(!user){
        await signInWithGoogle()
    }

        history.push('/rooms/new')
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
                    <button onClick={HandleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                        type="text"
                        placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}