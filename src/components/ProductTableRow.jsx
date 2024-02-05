import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../store/cart/cartSlice'

const ProductTableRow = ({ product }) => {

    const dispatch = useDispatch()
    const { name, price, cantidad, uid, img } = product;

    const handleClick = (uid) => {
        dispatch(removeFromCart(uid))
    }

    return (
        <tr>
            <td>
                <img src={`${import.meta.env.VITE_BACKEND_URL}/products/image/${img[0]}`} alt="Imagen Producto" className='w-48 h-48 mx-auto' />
            </td>
            <td className='text-center'>{name}</td>
            <td className='text-center'>${price}</td>
            <td className='text-center'>{cantidad}</td>
            <td >
                <button className='bg-red-500 mx-auto text-white px-2 rounded-sm hover:bg-red-600 flex items-center' onClick={() => handleClick(uid)}>-</button>
            </td>

        </tr>
    )
}

export default ProductTableRow