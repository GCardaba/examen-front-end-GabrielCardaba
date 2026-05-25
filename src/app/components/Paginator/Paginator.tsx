'use client'
import './Paginator.css'

type Props = {
    page : number,
    setPage: React.Dispatch<React.SetStateAction<number>>
    pages: number
    next: string | null
    prev: string | null
}
export const Paginator = (props: Props) => {
    const {page, setPage, pages, next, prev} = props
const pageSet = new Set([
    1, 2, 3,
    pages - 2, pages - 1, pages,
    page
])

const pageNumbers = [...pageSet]
    .filter(p => p >= 1 && p <= pages)
    .sort((a, b) => a - b)

return (
    <div className="paginator">
        {prev && <button onClick={() => setPage(page - 1)}>{'PREV'}</button>}

        {pageNumbers.map(p => (
            <button
                key={p}
                onClick={() => setPage(p)}            >
                {p}
            </button>
        ))}

        {next && <button onClick={() => setPage(page + 1)}>{'NEXT'}</button>}
    </div>
)}