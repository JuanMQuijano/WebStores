import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const handleClick = () => {
        navigate(`/products/${search}`)
    }

    return (
        <div className='flex items-center justify-center gap-3'>
            <label htmlFor="search" className='uppercase'>Buscador</label>
            <div className='flex items-center'>
                <input type="text" placeholder='Buscar Producto' name='search' id='search' className='p-1 rounded-md text-black' onChange={
                    (e) => { setSearch(e.target.value) }
                } value={search} />

                <button type="button" onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>

            </div>
        </div>
    )
}

export default SearchBar