import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { validarLogin } from '../../store/thunks/auth'

const LayoutPage = () => {

    const { loading } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validarLogin(localStorage.getItem("token-muevelo")))
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

export default LayoutPage