import React, { useEffect, useState } from 'react'
import Alerta from './Alerta';
import { clienteAxio } from '../axios/clienteAxios';
import { useDispatch, useSelector } from 'react-redux';
import { getCategorias } from '../../store/thunks/categorias';

const CrearCategoriaForm = () => {

    const dispatch = useDispatch()
    const { categoria } = useSelector(state => state.categorias);

    const [alerta, setAlerta] = useState({ ok: null, msg: "" })
    const [name, setName] = useState("");
    const [editando, setEditando] = useState(false)
    const [id, setId] = useState(null)

    const handleChange = (e) => {
        return setName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === "") {
            setAlerta({ ok: false, msg: "El nombre es obligatorio." })

            setTimeout(() => {
                setAlerta({ ok: null, msg: "" })
            }, 3000)
            return
        }

        try {

            if (!editando) {
                const { data } = await clienteAxio.post("/categorias", { name }, { headers: { 'x-token': localStorage.getItem("token-muevelo") } })

                setName("")

                setAlerta({ ok: data.ok, msg: data.msg })
            } else {
                const { data } = await clienteAxio.put(`/categorias/${id}`, { name }, { headers: { 'x-token': localStorage.getItem("token-muevelo") } })

                setName("")
                setEditando(false)
                setId(null)

                setAlerta({ ok: data.ok, msg: data.msg })
            }


            dispatch(getCategorias())

            setTimeout(() => {
                setAlerta({ ok: null, msg: "" })
            }, 3000)
            return
        } catch (error) {
            console.log(error);
            /*setAlerta({ ok: error.response.data.ok, msg: "El nombre es obligatorio." })

            setTimeout(() => {
                setAlerta({ ok: null, msg: "" })
            }, 3000)
            return*/
        }
    }

    useEffect(() => {
        if (Object.keys(categoria).length > 0) {
            setName(categoria.name)
            setId(categoria.uid)
            setEditando(true)
        }
    }, [categoria])

    const { ok, msg } = alerta;
    return (
        <div>
            <h1 className='text-4xl font-bold capitalize text-center'>
                {!editando ? 'Agregar Categoria' : 'Editar Categoria'}
            </h1>

            <form onSubmit={handleSubmit} className='p-3'>

                {msg.length > 0 && (<Alerta ok={ok} msg={msg} />)}

                <div className='flex flex-col mt-5'>
                    <label htmlFor="name" className='font-bold uppercase'>Nombre</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleChange} className='p-1 border border-gray-500 rounded-md' placeholder='Ingresa el nombre de la Categoria' />
                </div>

                <button type="submit" className='mt-2 bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md'>{!editando ? 'Agregar Categoria' : 'Editar Categoria'}</button>
            </form>
        </div>
    )
}

export default CrearCategoriaForm