import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardServicePage from '../components/CardServicePage';
import { useDispatch, useSelector } from 'react-redux';
import { getProductToView } from '../../store/thunks/products';
import Alerta from '../components/Alerta';
import { clienteAxio } from '../axios/clienteAxios';

const ServicePage = () => {

    const params = useParams();
    const { id } = params;

    const [data, setData] = useState({ serviceId: id, name: "", tel: "" })
    const [alerta, setAlerta] = useState({ ok: null, msg: "" })

    const { product } = useSelector(state => state.products)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductToView(id))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        return setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, tel].includes("")) {
            setAlerta({ ok: false, msg: "Todos los campos son necesarios" })

            setTimeout(() => {
                setAlerta({ ok: null, msg: "" })
            }, 3000)
            return
        }

        try {

            const { data } = await clienteAxio.post('/cotizacion', { products: [id], name, tel });

            setAlerta({ ok: data.ok, msg: data.msg })

            setData({ serviceId: id, name: "", tel: "" })

            setTimeout(() => {
                setAlerta({ ok: null, msg: "" })
            }, 3000)
            return
        } catch (error) {
            console.log(error.response.data);
            setAlerta({ ok: error?.response.data.ok, msg: error?.response.data.msg })

            setTimeout(() => {
                setAlerta({ ok: null, msg: "" })
            }, 3000)
            return
        }
    }

    const { name, tel } = data;
    const { ok, msg } = alerta;

    return (
        <div className='flex my-16 gap-5 w-8/12 mx-auto'>
            <div className='flex-1'>
                <CardServicePage product={product} />
            </div>

            <div >
                <form onSubmit={handleSubmit}>
                    <h3 className='font-bold uppercase text-2xl'>Información de Contacto</h3>

                    {msg.length > 0 && (<Alerta ok={ok} msg={msg} />)}

                    <div className='flex flex-col mt-5'>
                        <label htmlFor="name" className='uppercase font-bold '>Nombre</label>
                        <input type="text" placeholder='Ingresa tu Nombre' id='name' name='name' className='p-1 border border-gray-500 rounded-md' onChange={handleChange} value={name} />
                    </div>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor="tel" className='uppercase font-bold '>Teléfono</label>
                        <input type="number" placeholder='Ingresa tu Número de Contacto' id='tel' name='tel' className='p-1 border border-gray-500 rounded-md' onChange={handleChange} value={tel} />
                    </div>

                    <button type="submit" className='mt-5 p-2 bg-indigo-500 hover:bg-indigo-600 uppercase text-white rounded font-bold' >Enviar</button>

                </form>
            </div>
        </div>
    )
}

export default ServicePage