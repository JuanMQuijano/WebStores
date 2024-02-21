import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { clienteAxio } from '../axios/clienteAxios';
import EMPRESA_ID from '../constant/EMPRESA_ID';

const RegisterPage = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    tel: '',
    password: '',
    password_confirm: ''
  });

  const [alerta, setAlerta] = useState({ ok: null, msg: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    return setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, tel, email, password, password_confirm } = data;

    if ([name, tel, email, password, password_confirm].some(e => e === "")) {
      setAlerta({ ok: false, msg: 'Todos los campos son obligatorios' })

      setTimeout(() => {
        setAlerta({ ok: null, msg: '' })
      }, 3000)

      return
    }

    if (password.length < 6) {
      setAlerta({ ok: false, msg: 'El password debe ser de 6 o más caracteres' })

      setTimeout(() => {
        setAlerta({ ok: null, msg: '' })
      }, 3000)

      return
    }


    if (password != password_confirm) {
      setAlerta({ ok: false, msg: 'Los password no coinciden' })

      setTimeout(() => {
        setAlerta({ ok: null, msg: '' })
      }, 3000)

      return
    }

    try {
      await clienteAxio.post('/users', { name, tel, email, password })

      setData({
        name: '',
        tel: '',
        email: '',
        password: '',
        password_confirm: ''
      })

      setAlerta({ ok: true, msg: 'Cuenta Creada Exitosamente' })

      setTimeout(() => {
        setAlerta({ ok: null, msg: '' })
      }, 5000)

      return
    } catch (error) {
      if (error?.response?.data.ok === false) {
        setAlerta({ ok: error?.response?.data.ok, msg: error?.response?.data.msg })

        setTimeout(() => {
          setAlerta({ ok: null, msg: '' })
        }, 5000)

        return
      }
    }

  }

  const { name, email, tel, password, password_confirm } = data;
  const { ok, msg } = alerta;

  return (
    <div className='w-9/12 mx-auto mt-5'>
      <div className='w-2/6 mx-auto'>

        <h1 className='text-4xl text-center capitalize'>Crea tu cuenta en LICOR-LAB</h1>
        <p className='text-center text-2xl font-bold'>Y compra bebidas al mejor precio</p>

        <form onSubmit={handleSubmit} className='mt-10 p-5 border border-gray-400 rounded-md'>

          {msg.length > 0 && (<Alerta ok={ok} msg={msg} />)}


          <div className="flex flex-col my-5">
            <label htmlFor="name" className='font-bold'>Nombre Completo</label>
            <input type="text" name="name" id="name" value={name} onChange={handleChange} placeholder='Ingresa tu Nombre' className='p-1 rounded border border-gray-500' />
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="tel" className='font-bold'>Teléfono</label>
            <input type="text" name="tel" id="tel" value={tel} onChange={handleChange} placeholder='Ingresa tu Número de Teléfono' className='p-1 rounded border border-gray-500' />
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="email" className='font-bold'>Email</label>
            <input type="email" name="email" id="email" value={email} onChange={handleChange} placeholder='Ingresa tu Email' className='p-1 rounded border border-gray-500' />
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="password" className='font-bold'>Password</label>
            <input type="password" name="password" id="password" value={password} onChange={handleChange} placeholder='Ingresa tu Password' className='p-1 rounded border border-gray-500' />
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="password_confirm" className='font-bold'>Confirmar Password</label>
            <input type="password" name="password_confirm" id="password_confirm" value={password_confirm} onChange={handleChange} placeholder='Confirma tu Password' className='p-1 rounded border border-gray-500' />
          </div>

          <div className='flex justify-between items-center mt-7'>
            <button type="submit" className='p-2 bg-indigo-500 text-white rounded-md hover:cursor-pointer hover:bg-indigo-600'>Crear Cuenta</button>
            <Link to="/login" className='text-gray-400 hover:text-gray-500 hover:underline'>¿Ya tienes cuenta? Inicia Sesión</Link>
          </div>
        </form>

      </div>
    </div>
  )
}

export default RegisterPage