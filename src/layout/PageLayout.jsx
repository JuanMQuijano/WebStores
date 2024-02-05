import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { validarLogin } from '../../store/thunks/auth';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

const PageLayout = () => {

    const { loading } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validarLogin(localStorage.getItem("token-licorlab")))
    }, [])

    return (

        loading ? (<Spinner />) : (
            <>
                <Header />

                <Outlet />

                <Footer />
            </>
        )
    )
}

export default PageLayout
