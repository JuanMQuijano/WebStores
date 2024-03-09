import React from 'react'
import { useDispatch } from 'react-redux';
import { getCotizaciones } from '../../store/thunks/cotizacion';
import { clienteAxio } from '../axios/clienteAxios';

const CotizacionCard = ({ pedido }) => {
    let dateFormatted;
    const dispatch = useDispatch();
    const { name, tel, products, status, date, _id, weigth, from, to, price } = pedido;

    const handleClick = async () => {
        try {
            await clienteAxio.put(`/cotizacion/${_id}`, null, {
                headers: {
                    'x-token': localStorage.getItem("token-muevelo")
                }
            })

            dispatch(getCotizaciones())
        } catch (error) {
            console.log(error?.response.data);
        }
    }

    dateFormatted = date.split("T")[0] + " " + date.split("T")[1].split(".")[0]
    return (
        <div className={`${status ? 'bg-cyan-500' : 'bg-red-500'} p-3 rounded-md`} >
            <p><span className="font-bold">Fecha: </span>{dateFormatted}</p>
            <p><span className="font-bold">Cliente: </span> {name} </p>
            <p><span className="font-bold">Teléfono: </span> {tel}</p>
            <h3 className="font-bold">Servicio:</h3>
            <ul key={_id}>
                {products.map(p => (
                    <li key={p.uid}>
                        {p.name}
                    </li>
                ))}
            </ul>

            <p><span className="font-bold">Peso: </span> {weigth}</p>
            <p><span className="font-bold">Desde: </span> {from}</p>
            <p><span className="font-bold">Hacia: </span> {to}</p>
            <p><span className="font-bold">Precio: </span> {price}</p>

            {!status && (<button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md p-1 mt-2" onClick={handleClick}>Completar Cotización</button>)}
        </div>
    )
}

export default CotizacionCard