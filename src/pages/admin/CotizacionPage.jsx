import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCotizaciones } from '../../../store/thunks/cotizacion';
import Spinner from '../../components/Spinner';
import CotizacionCard from '../../components/CotizacionCard';

const CotizacionPage = () => {

    const navigate = useNavigate();
    const { user } = useSelector(selector => selector.auth)
    const { admin } = user;


    //Bloque el acceso a las rutas de admin
    useEffect(() => {
        if (admin === 0 || admin === null) {
            navigate("/")
            return;
        }
    }, [user])

    const { cotizaciones, loading } = useSelector(state => state.cotizaciones)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCotizaciones())
    }, [])


    return (
        loading ? (<Spinner />) : (
            <div className='flex flex-col w-11/12 mx-auto mt-16 mb-36'>
                <h1 className='text-2xl lg:text-4xl'>Cotizaciones</h1>
                <hr className='bg-black h-1' />

                <div className='grid grid-cols-3 lg:grid-cols-5 gap-5 mt-5 w-11/12 mx-auto'>
                    {cotizaciones.map(c => (<CotizacionCard key={c._id} pedido={c} />))}
                </div>
            </div>
        )
    )
}

export default CotizacionPage