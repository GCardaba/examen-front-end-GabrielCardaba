'use client'

import './CharacterCard.css'

import { useRouter } from "next/navigation"

type Props = {
    id: number,
    name: string,
    status: string,
    gender: string,
    image: string
}


export const CharacterCard = (props: Props ) => {

    const {id, name, status, gender, image } = props
    
    const router = useRouter()


    return (
        <div className="character-card">
            <img src={image} onClick={()=>  router.push(`/characters/${id}`)} ></img>
            <div className="character-info">
                <h1>Nombre: {name}</h1>
                <p> Estádo: {status}</p>
                <p> Genero: {gender}</p>
            </div>

        </div>
    )
}