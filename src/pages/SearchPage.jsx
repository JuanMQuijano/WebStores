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

        loading ? (<Spinner />) : (<Products products={products} />)

    )
}

export default SearchPage