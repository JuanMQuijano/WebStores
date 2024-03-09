import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import CrearCategoriaForm from '../../components/CrearCategoriaForm';
import Categorias from '../../components/Categorias';
import { getCategorias } from '../../../store/thunks/categorias';

const CategoriasPage = () => {
    const navigate = useNavigate();
    const { user } = useSelector(selector => selector.auth)
    const { admin } = user;

    //Bloque el acceso a las rutas de admin
    useEffect(() => {
        if (admin === 0 || admin === null) {
            navigate("/")
            return;
        }
    }, [])

    const { loading, categorias } = useSelector(state => state.categorias);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategorias())
    }, [])


    return (
        <>
            {loading ? (<Spinner />) : (

                <>
                    <div className='flex gap-14 lg:gap-28 mt-5 p-3'>

                        <CrearCategoriaForm />

                        <Categorias categorias={categorias} />

                    </div>
                </>)}

        </>

    )
}

export default CategoriasPage