import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { onLogout } from '../../store/auth/authSlice';
import EMPRESA_ID from "../constant/EMPRESA_ID";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(seletor => seletor.auth)
  const [show, setShow] = useState(false);

  const handleClick = () => {
    dispatch(onLogout())
    localStorage.removeItem('token-muevelo')
    navigate("/")
  }


  const handleClickShow = () => {
    return setShow(!show)
  }

  return (
    <header className="flex w-full bg-blue-950 text-white p-5 justify-between items-center">
      <Link to="/" className='text-2xl lg:text-4xl'>🚛Mueve-LO📦</Link>

      <nav className={`${show ? 'flex' : 'hidden'} flex-col lg:flex lg:flex-row gap-5`}>
        <a href="https://muevelo-spl.netlify.app#somos" className='font-bold text-lg lg:text-xl'>¿Quien Somos?</a>
        <a href="https://muevelo-spl.netlify.app#servicios" className='font-bold text-lg lg:text-xl'>Servicios</a>
        <Link to="/admin/register" className="text-lg lg:text-xl font-bold">Crear Cuenta Admin</Link>

        {(user.admin === true && user.empresa === EMPRESA_ID) ? (
          <>
            <Link to="/admin" className="text-lg lg:text-xl font-bold">Gestionar Servicios</Link>
            <Link to="/admin/cotizaciones" className="text-lg lg:text-xl font-bold">Gestionar Cotizaciones</Link>
            <button onClick={handleClick} className="text-lg lg:text-xl font-bold">Cerrar Sesión</button>
          </>
        ) : (<></>)
        }
      </nav>

      <button className="flex lg:hidden" onClick={() => { handleClickShow() }}>
        {
          !show ? (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>)
        }
      </button>

    </header>
  )
}

export default Header