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

            const productsInfo = cart.map(p => {
                return {
                    ...p,
                    id: p.uid,
                    cantidad: p.cantidad
                }
            });

            await clienteAxio.post("/compras", { customer: user.uid, products: productsInfo })

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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-16 w-9/12 mx-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Imagen</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Producto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cantidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(p => (<ProductTableRow key={p.uid} product={p}></ProductTableRow>))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td>
                                <p>Total Pagar: <span className='font-bold'>${cart.reduce((t, c) => t += c.price * c.cantidad, 0)}</span></p>
                            </td>
                        </tr>
                    </tfoot>
                </table>

                <div className='flex justify-end gap-5'>
                    <button className='bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600' onClick={handleClick}>Limpiar Carrito</button>

                    {user.uid !== null && user.uid !== "" ? (<button className='bg-cyan-500 p-2 rounded text-white hover:bg-cyan-600' onClick={handleClickCompra}>Finalizar Compra</button>) : (<Link to="/login" className=' capitalize bg-red-500 hover:bg-red-600 p-2 text-white rounded'>
                        <p>Debes Inicar Sesión para finalizar la compra</p>
                    </Link>)}
                </div>
            </div>) : (
            <div className='w-9/12 mx-auto my-80 flex items-center justify-center'>
                <h1 className='bg-cyan-500 text-white text-2xl lg:text-4xl p-3 rounded-md font-bold capitalize text-center'>No hay productos en el carrito</h1>
            </div>)

    )
}

export default CartPage