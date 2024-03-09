import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCompras } from '../../../store/thunks/compras';
import Spinner from '../../components/Spinner';
import PedidoCard from '../../components/PedidoCard';

const PedidosPage = () => {

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

    const { compras, loading } = useSelector(state => state.compras)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompras())
    }, [])

    return (
        loading ? (<Spinner />) : (
            <div className='flex flex-col w-11/12 mx-auto mt-16 mb-36'>
                <h1 className='text-2xl lg:text-4xl'>Pedidos</h1>
                <hr className='bg-black h-1' />

                <div className='grid grid-cols-3 lg:grid-cols-5 gap-5 mt-5 w-11/12 mx-auto'>
                    {compras.map(c => (<PedidoCard key={c._id} pedido={c} />))}
                </div>
            </div>

        )
    )
}

export default PedidosPage