import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../../components/Alerta'
import { clienteAxio } from '../../axios/clienteAxios'
import { useDispatch } from 'react-redux'
import { onAuth } from '../../../store/auth/authSlice'

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({ email: '', password: '' })
    const [alerta, setAlerta] = useState({ ok: null, msg: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;

        return setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = data;

        if ([email, password].some(e => e === "")) {
            setAlerta({ ok: false, msg: 'Todos los campos son obligatorios' })

            setTimeout(() => {
                setAlerta({ ok: null, msg: '' })
            }, 3000)

            return
        }

        try {
            const { data } = await clienteAxio.post('/users/login', { email, password });
            const { token, ...rest } = data;
            const { usuario } = rest;
            const { admin } = usuario

            localStorage.setItem("token-muevelo", token)

            dispatch(onAuth({ name: usuario.name, admin: usuario.admin, uid: usuario.uid, empresa: usuario.empresa }))

            setData({
                email: '',
                password: '',
            })

            admin ? navigate('/admin') : navigate('/');

        } catch (error) {
            console.log(error);
            if (error?.response?.data.ok === false) {
                setAlerta({ ok: error?.response?.data.ok, msg: error?.response?.data.msg })

                setTimeout(() => {
                    setAlerta({ ok: null, msg: '' })
                }, 5000)

                return
            }
        }
    }


    const { email, password } = data;
    const { ok, msg } = alerta;

    return (
        <div className='lg:w-9/12 mx-auto my-5 '>
            <div className='w-2/6 mx-auto my-32 lg:my-28'>

                <h1 className='text-2xl lg:text-4xl text-center capitalize'>Inicia Sesión en Mueve-LO</h1>
                <p className='text-center text-2xl lg:text-4xl font-bold'>Y administra las cotizaciones y servicios</p>

                <form className='mt-10 p-5 border border-gray-400 rounded-md' onSubmit={handleSubmit}>
                    {msg.length > 0 && (<Alerta ok={ok} msg={msg} />)}

                    <div className="flex flex-col my-5">
                        <label htmlFor="email" className='font-bold'>Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={handleChange} placeholder='Ingresa tu Email' className='p-1 rounded border border-gray-500' />
                    </div>

                    <div className="flex flex-col my-5">
                        <label htmlFor="password" className='font-bold'>Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={handleChange} placeholder='Ingresa tu Password' className='p-1 rounded border border-gray-500' />
                    </div>


                    <div className='flex justify-between items-center mt-7'>
                        <button type="submit" className='p-1 bg-indigo-500 text-white rounded-md hover:cursor-pointer hover:bg-indigo-600 font-bold'>Iniciar Sesión</button>
                        <Link to="/admin/register" className='text-gray-400 hover:text-gray-500 hover:underline text-sm lg:text-lg'>¿Aún no tienes cuenta? Crea una</Link>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default LoginPage