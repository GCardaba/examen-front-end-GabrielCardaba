'use client'

import { api } from '../api/api'
import { useEffect, useState } from "react"
import { Filters } from "./components/Filters/Filters"
import { Paginator } from "./components/Paginator/Paginator"
import { apiResponse } from "./types/types"
import { CharacterCard } from "./components/CharacterCard/CharacterCard"

export default function Home() {
    const [results, setResults]   = useState<apiResponse>()
    const [loading, setLoading]   = useState<boolean>(true)
    const [error, setError]       = useState<boolean>(false)   // ← false, no true

    const [name, setName]         = useState<string>("")
    const [activeName, setActiveName] = useState<string>("")   // ← nombre confirmado
    const [status, setStatus]     = useState<string>("")
    const [gender, setGender]     = useState<string>("")
    const [page, setPage]         = useState<number>(1)

    const fetchCharacters = () => {
        setLoading(true)
        const params = new URLSearchParams()
        params.set('page', String(page))
        if (activeName) params.set('name', activeName)
        if (status)     params.set('status', status)
        if (gender)     params.set('gender', gender)

        api.get(`/character?${params.toString()}`)
            .then(e  => { setResults(e.data); setError(false) })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    // Se ejecuta cuando cambia página, status o gender (automático)
    useEffect(() => { fetchCharacters() }, [page, status, gender, activeName])

    // Al cambiar filtros automáticos, volver a página 1

    // Buscar por nombre solo con botón/Enter
    const handleSearch = () => { setActiveName(name); setPage(1) }

    if (loading) return <h1>Cargando...</h1>

    return (
        <div className="home">
            <Filters
                name={name}           setName={setName}
                status={status}       setStatus={setStatus}
                gender={gender}       setGender={setGender}
            />
            <div className="character-container">
                {error || !results?.results.length ? 
                <p>No se encontraron personajes.</p>:
                 results.results.map(e => (<CharacterCard key={e.id} id={e.id} name={e.name} status={e.status} gender={e.gender} image={e.image}/> ))
                }
            </div>
            <Paginator
                page={page}
                setPage={setPage}
                pages={results?.info.pages || 1}
                next={results?.info.next || null}
                prev={results?.info.prev || null}
            />
        </div>
    )
}