import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { onLogout } from "../../store/auth/authSlice";
import SearchBar from "./SearchBar";
import EMPRESA_ID from "../constant/EMPRESA_ID";
import { useState } from "react";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(seletor => seletor.auth)
    const [show, setShow] = useState(false);

    const handleClick = () => {
        dispatch(onLogout())
        localStorage.removeItem('token-licorlab')
        navigate("/")
    }

    const handleClickShow = () => {
        return setShow(!show)
    }


    return (
        <header className="flex w-full bg-black text-white p-5 justify-between items-center">
            <Link to="/" className="text-2xl lg:text-4xl ">🍻Licor-Lab🧪</Link>

            <nav className={`${show ? 'flex' : 'hidden'} flex-col lg:flex lg:flex-row gap-5`}>

                <SearchBar />
                {
                    user.name !== null && user.name !== "" && (
                        <p className="text-lg lg:text-xl">¡Hola {user.name}!</p>)
                }
                <Link className="text-lg lg:text-xl" to="/">Productos</Link>
                {(user.admin === false || user.admin === null) && (<Link className="text-lg lg:text-xl flex items-center gap-2" to="/cart">Carrito
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </Link>)
                }

                {user.name === "" && user.admin === null ? (
                    <>
                        <Link to="/login" className="text-lg lg:text-xl">Iniciar Sesión</Link>
                        <Link to="/register" className="text-lg lg:text-xl">Crear Cuenta</Link>
                        <Link to="/admin/create/account" className="text-lg lg:text-xl">Crear Cuenta Admin</Link>
                    </>) : user.admin === true && user.empresa === EMPRESA_ID ? (<>
                        <Link to="/admin" className="text-lg lg:text-xl">Gestionar Productos</Link>
                        <Link to="/admin/categorias" className="text-lg lg:text-xl">Gestionar Categorias</Link>
                        <Link to="/admin/pedidos" className="text-lg lg:text-xl">Gestionar Pedidos</Link>
                        <button onClick={handleClick} className="text-lg lg:text-xl">Cerrar Sesión</button>
                    </>) : (
                    <>
                        <button onClick={handleClick} className="text-lg lg:text-xl">Cerrar Sesión</button>
                    </>
                )
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