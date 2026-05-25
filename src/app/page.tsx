'use client'

import { api} from '../api/api'
import { useEffect, useState } from "react";
import { Filters } from "./components/Filters/Filters";
import { apiResponse } from "./types/types";
import { CharacterCard } from "./components/CharacterCard/CharacterCard";


export default function Home() {
  const [results, setResults] = useState<apiResponse>()

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(true)

  const [name, setName] = useState<string>("")
  const [page, setPage] = useState<number>(1)

  const fetchCharacters = () => { 
        let url :string
        if (name !== "" && name !== undefined && name !== null ){
           url =  `/character?name=${name}&page=${page}` 
        } else {
            url = `/character`         
        }
        api.get(url)
        .then((e) =>  setResults(e.data))
        .catch(() => setError(true))
        .finally(() => {setLoading(false) ; setError(false);})
    }

     useEffect(() => fetchCharacters(), [page])


  return (
    <div className="home">
      <Filters/>
      <div className="character-container">
        {results && results.results.map((e) => <CharacterCard key={e.id} name={e.name} status={e.status} gender={e.gender} image={e.image} id={e.id}/>)}

      </div>


    </div>
  );
}
