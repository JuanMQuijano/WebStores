import React from 'react'
import CategoriaCard from './CategoriaCard'

const Categorias = ({ categorias }) => {
    return (
        <>
            {categorias.map(c => (<CategoriaCard key={c.uid} categoria={c} />))}
        </>
    )
}

export default Categorias