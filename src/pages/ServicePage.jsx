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

    const [data, setData] = useState({ serviceId: id, name: "", tel: "", weigth: "", from: "", to: "", price: 1 })
    const [alerta, setAlerta] = useState({ ok: null, msg: "" })

    const { product } = useSelector(state => state.products)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductToView(id))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (data.weigth) {
            case "1T": data.price = 50000
                break
            case "2T": data.price = 100000
                break
            case "3T": data.price = 150000
                break
        }

        if (name === "from" && data.to !== "") {

            if (value === "Popayán" && data.to === "Medellín") {
                data.price *= 6;
            } else if (value === "Popayán" && data.to === "Bogotá") {
                data.price *= 7;
            } else if (value === "Cali" && data.to === "Medellín") {
                data.price *= 4;
            } else if (value === "Cali" && data.to === "Bogotá") {
                data.price *= 5;
            }
        }

        if (name === "to" && data.from !== "") {

            if (value === "Medellín" && data.from === "Cali") {
                data.price *= 4;
            } else if (value === "Medellín" && data.from === "Popayán") {
                data.price *= 6;
            } else if (value === "Bogotá" && data.from === "Cali") {
                data.price *= 5;
            } else if (value === "Bogotá" && data.from === "Popayán") {
                data.price *= 7;
            }
        }



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

            const { data } = await clienteAxio.post('/cotizacion', { products: [id], name, tel, weigth, to, from, price });

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

    const { name, tel, weigth, from, to, price } = data;
    const { ok, msg } = alerta;

    return (
        <div className='flex my-24 gap-5 w-11/12 lg:w-8/12 mx-auto'>
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

                    <div className='flex flex-col mt-5'>
                        <label htmlFor="weigth" className='uppercase font-bold '>Peso</label>
                        <select name="weigth" id="weigth" value={weigth} onChange={handleChange}>
                            <option value="">-- Seleccione --</option>
                            <option value="1T">1T - $50.000</option>
                            <option value="2T">2T - $100.000</option>
                            <option value="3T">3T - $150.000</option>
                        </select>
                    </div>

                    <div className='flex flex-col mt-5'>
                        <label htmlFor="from" className='uppercase font-bold '>Desde</label>
                        <select name="from" id="from" value={from} onChange={handleChange}>
                            <option value="">-- Seleccione --</option>
                            <option value="Popayán">Popayán</option>
                            <option value="Cali">Cali</option>
                        </select>
                    </div>

                    <div className='flex flex-col mt-5'>
                        <label htmlFor="to" className='uppercase font-bold '>Hacia</label>
                        <select name="to" id="to" value={to} onChange={handleChange}>
                            <option value="">-- Seleccione --</option>
                            <option value="Medellín">Medellín</option>
                            <option value="Bogotá">Bogotá</option>
                        </select>
                    </div>

                    <div className='uppercase font-bold mt-5'>Precio: {price === 1 ? "$0" : `$${price}`}</div>

                    <button type="submit" className='mt-5 p-2 bg-indigo-500 hover:bg-indigo-600 uppercase text-white rounded font-bold' >Enviar</button>

                </form>
            </div>
        </div>
    )
}

export default ServicePage