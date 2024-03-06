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

            <div className='grid grid-cols-5 gap-5 mt-5'>
                {compras.map(c => (<PedidoCard key={c._id} pedido={c} />))}
            </div>

        )
    )
}

export default PedidosPage