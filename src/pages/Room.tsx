import { type } from 'os'
import { FormEvent, useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'

import logoImg from '../assets/images/logo.png'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import '../styles/room.scss'


type firebaseQuestions = Record<string, {
    author: {
        name: string ;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type RoomParams= {
    id: string;
}

type Question = {
    id: string;
    author: {
        name: string ;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}



export function Room(){
    const {user} = useAuth()
    const params = useParams<RoomParams>();
    const roomID = params.id
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomID}`)
    
        roomRef.on('value', room=>{
            const databaseRoom = room.val();
            const firebaseQuestions: firebaseQuestions = databaseRoom.questions ?? {};


            const parsedQuestions =  Object.entries(firebaseQuestions).map(([key, value])=>{
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
    })
},[roomID]);

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();
        if(newQuestion.trim() === ""){
            return
        }
        if(!user) {
            throw new Error('você precisa fazer o login');
        }
        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        }
        await database.ref(`room/${roomID}/questions`).push(question)

        setNewQuestion('');
    }

    return(
       <div id="page-room">
        <header>
            <div className="content">
                <img src={logoImg} alt="letmeask" />
                <RoomCode code={roomID} />
            </div>
        </header>

        <main className="content">
            <div className="room-title">
                <h1>Sala {title}</h1>
                {questions.length > 0 && <span>{questions.length} perguntas</span>}
            </div>

            <form onSubmit={handleSendQuestion}>
                <textarea placeholder= "o que você quer perguntar"
                onChange={event=> setNewQuestion(event.target.value)}
                value={newQuestion}
                />

                <div className="form-footer">
                    {user ? (
                        <div className="user-ingo">
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>
                        </div>
                    ) : (
                        <span>para enviar uma pergunta, <button>faça seu login</button>.</span>
                    )}
                    <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                </div>
            </form>

            {JSON.stringify(questions)}
        </main>

       </div>
    )
}