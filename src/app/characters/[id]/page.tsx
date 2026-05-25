'use client'

import './page.css'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Character } from "@/app/types/types"
import { api } from "@/api/api"

const CharacterPage = () => {
    const { id }    = useParams()
    const router    = useRouter()

    const [character, setCharacter] = useState<Character | null>(null)
    const [loading, setLoading]     = useState<boolean>(true)
    const [error, setError]         = useState<boolean>(false)

    useEffect(() => {
        api.get(`/character/${id}`)
            .then(e  => setCharacter(e.data))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <h1>Cargando...</h1>
    if (error || !character) return <h1>Personaje no encontrado.</h1>

    return (
        <div className="character-detail">
            <button onClick={() => router.back()}>← Volver</button>
            <img src={character.image} alt={character.name} />
            <h1>{character.name}</h1>
            <p><strong>ID:</strong> {character.id}</p>
            <p><strong>Estado:</strong> {character.status}</p>
            <p><strong>Género:</strong> {character.gender}</p>
            <p><strong>Especie:</strong> {character.species}</p>
            <p><strong>Origen:</strong> {character.origin.name}</p>
            <p><strong>Localización:</strong> {character.location.name}</p>
        </div>
    )
}

export default CharacterPage