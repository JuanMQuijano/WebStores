import React from 'react'
import CategoriaCard from './CategoriaCard'

const Categorias = ({ categorias }) => {
    return (
        <div className='flex-1 grid grid-cols-3 lg:grid-cols-5'>
            {categorias.map(c => (<CategoriaCard key={c.uid} categoria={c} />))}
        </div>
    )
}

export default Categorias