import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EMPRESA_ID from '../../constant/EMPRESA_ID';
import { getProducts } from '../../../store/thunks/products';
import Products from '../../components/Products'
import Spinner from '../../components/Spinner';
import CrearProductoForm from '../../components/CrearProductoForm';

const HomePage = () => {

    const navigate = useNavigate();
    const { user } = useSelector(selector => selector.auth)
    const { admin, empresa } = user;

    //Bloque el acceso a las rutas de admin
    useEffect(() => {
        if (admin === false || admin === null || empresa !== EMPRESA_ID) {
            navigate("/")
            return;
        }
    }, [])

    const { loading, products } = useSelector(state => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    }, [])


    return (
        <>
            {loading ? (<Spinner />) : (

                <>
                    <div className='flex gap-28 mt-5 p-3'>

                        <CrearProductoForm />

                        <Products products={products} />

                    </div>
                </>)}

        </>

    )
}

export default HomePage