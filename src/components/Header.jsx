import React from 'react'

const Header = () => {
  return (
    <header className='p-3 bg-blue-950 text-white flex justify-between'>

        <h1 className='text-2xl'>LOGO</h1>

        <nav className='flex gap-5'>
            <a href="" className='font-bold text-lg'>¿Quien Somos?</a>
            <a href="" className='font-bold text-lg'>Servicios</a>
        </nav>

    </header>
  )
}

export default Header