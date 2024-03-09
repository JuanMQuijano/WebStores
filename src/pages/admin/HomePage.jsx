import React, { useEffect } from 'react'
import Products from '../../components/Products'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../store/thunks/products';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import CrearProductoForm from '../../components/CrearProductoForm';
import EMPRESA_ID from '../../constant/EMPRESA_ID';

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
                    <div className='flex gap-14 lg:gap-28 mt-5 p-3'>

                        <CrearProductoForm />

                        <Products products={products} />

                    </div>
                </>)}

        </>

    )
}

export default HomePage