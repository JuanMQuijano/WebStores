import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductTableRow from '../components/ProductTableRow'
import { clearCart } from '../../store/cart/cartSlice'
import { clienteAxio } from '../axios/clienteAxios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const CartPage = () => {

    const { cart } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(clearCart())
    }

    const handleClickCompra = async () => {

        try {

            const productsID = cart.map(p => p.uid);

            await clienteAxio.post("/compras", { customer: user.uid, products: productsID })

            Swal.fire({
                title: 'Compra Registrada',
                text: 'En seguida te contactaremos',
                icon: 'success'
            })

            dispatch(clearCart())
        } catch (error) {
            console.log(error);
        }

    }

    return (

        cart.length > 0 ? (
            <div className='w-9/12 mx-auto mt-5'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>
                                Producto
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Precio
                            </th>
                            <th>
                                Cantidad
                            </th>
                            <th>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(p => (<ProductTableRow key={p.uid} product={p}></ProductTableRow>))}
                    </tbody>
                </table>

                <div className='flex justify-end gap-5'>
                    <button className='bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600' onClick={handleClick}>Limpiar Carrito</button>

                    {user.uid !== null && user.uid !== "" ? (<button className='bg-cyan-500 p-2 rounded text-white hover:bg-cyan-600' onClick={handleClickCompra}>Finalizar Compra</button>) : (<Link to="/login" className=' capitalize bg-red-500 hover:bg-red-600 p-2 text-white rounded'>
                        <p>Debes Inicar Sesión para finalizar la compra</p>
                    </Link>)}
                </div>
            </div>) : (
            <div className='w-9/12 mx-auto mt-5 flex items-center justify-center'>
                <h1 className='bg-cyan-500 text-white text-4xl p-3 rounded-md font-bold capitalize text-center'>No hay productos en el carrito</h1>
            </div>)

    )
}

export default CartPage