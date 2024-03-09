import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { searchProducts } from '../../store/thunks/products';
import Products from '../components/Products';
import Spinner from '../components/Spinner';

const SearchPage = () => {

    const dispatch = useDispatch()

    const params = useParams();
    const { name } = params;

    useEffect(() => {
        dispatch(searchProducts(name))
    }, [name]);

    const { products, loading } = useSelector(state => state.products)

    return (

        loading ? (<Spinner />) : (
            <div className='flex flex-col w-11/12 mx-auto mt-16 mb-36'>
                <h1 className='text-2xl lg:text-4xl'>Resultados</h1>
                <hr className='bg-black h-1'/>
                <Products products={products} />
            </div>)

    )
}

export default SearchPage