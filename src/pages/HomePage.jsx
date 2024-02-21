import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { getProducts } from '../../store/thunks/products';
import Banner from '../components/Banner';
import Products from '../components/Products';

const HomePage = () => {

  const { loading, products } = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <>
      {loading ? (<Spinner />) : (

        <>

          <Banner />

          <div className='mt-5'>
            <Products products={products} />
          </div>

        </>)}

    </>

  )
}

export default HomePage