
export type Info = {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null
}

export type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    gender: string,
    origin: {
        name: string
    }
    location: {
        name: string
    }
    image: string
    episode: string[]
}

export type apiResponse = {
    info : Info,
    results: Character[]

}