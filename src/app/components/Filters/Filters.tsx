'use client'
import './Filter.css'

type Props = {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    status: string
    setStatus: React.Dispatch<React.SetStateAction<string>>
    gender: string
    setGender: React.Dispatch<React.SetStateAction<string>>
    fetchCharacters: () => void

}

const STATUS_CYCLE  = ['Alive', 'Dead', 'unknown', '']
const GENDER_CYCLE  = ['Female', 'Male', 'Genderless', 'unknown', '']

export const Filters = ({ name, setName, status, setStatus, gender, setGender , fetchCharacters}: Props) => {
    // ciclo de filtros, de primeras vacío (todos), luego cada opción, y vuelve a empezar
    const nextStatus = () => {
        const i = STATUS_CYCLE.indexOf(status)
        setStatus(STATUS_CYCLE[(i + 1) % STATUS_CYCLE.length])
    }

    const nextGender = () => {
        const i = GENDER_CYCLE.indexOf(gender)
        setGender(GENDER_CYCLE[(i + 1) % GENDER_CYCLE.length])
    }

    return (
        <div className="filters">
            <button onClick={nextStatus}>Estado: {status || 'Todos'}</button>
            <button onClick={nextGender}>Género: {gender || 'Todos'}</button>
            <input
                value={name}
                placeholder="Buscar por nombre..."
                onChange={e => setName(e.target.value)}
            />
            <button onClick={() => fetchCharacters()}>Buscar</button>
        </div>
    )
}