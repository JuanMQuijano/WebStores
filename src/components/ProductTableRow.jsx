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
        <tr >
            <td className="p-4">
                <img src={`${import.meta.env.VITE_BACKEND_URL}/products/image/${img[0]}`} alt="Imagen Producto" className='w-48 h-48 mx-auto' />
            </td>
            <td className="px-6 py-4 font-semibold text-black ">
                {name}
            </td>
            <td className="px-6 py-4 font-semibold text-black ">${price}</td>
            <td className='text-center'>{cantidad}</td>
            <td className="px-6 py-4">
                <button className='' onClick={() => handleClick(uid)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </button>
            </td>

        </tr>
    )
}

export default ProductTableRow