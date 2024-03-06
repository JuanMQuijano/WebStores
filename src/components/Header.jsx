import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { onLogout } from '../../store/auth/authSlice';
import EMPRESA_ID from "../constant/EMPRESA_ID";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(seletor => seletor.auth)

  const handleClick = () => {
    dispatch(onLogout())
    localStorage.removeItem('token-muevelo')
    navigate("/")
  }

  return (
    <header className='p-3 bg-blue-950 text-white flex justify-between w-full items-center'>

      <h1 className='text-2xl'>🚛Mueve-LO📦</h1>

      <nav className='flex gap-5'>
        <a href="#somos" className='font-bold text-lg'>¿Quien Somos?</a>
        <a href="" className='font-bold text-lg'>Servicios</a>
        <Link to="/admin/register" className="text-xl font-bold">Crear Cuenta Admin</Link>

        {(user.admin === true && user.empresa === EMPRESA_ID) ? (
          <>
            <Link to="/admin" className="text-xl font-bold">Gestionar Servicios</Link>
            <Link to="/admin/cotizaciones" className="text-xl font-bold">Gestionar Cotizaciones</Link>
            <button onClick={handleClick} className="text-xl font-bold">Cerrar Sesión</button>
          </>
        ) : (<></>)
        }
      </nav>

    </header>
  )
}

export default Header