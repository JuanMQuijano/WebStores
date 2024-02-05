import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { clienteAxio } from "../axios/clienteAxios";
import { getProducts } from "../../store/thunks/products";
import { addToCart } from "../../store/cart/cartSlice";
import { setProduct } from "../../store/products/productsSlice";

const Card = ({ product }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { admin } = user;

    const { uid, name, des, price, img } = product;

    const handleClick = () => {
        dispatch(addToCart({ uid, name, des, price, img, cantidad: 1 }))

        Swal.fire('¡Genial!', 'Producto Agregado al Carrito', 'success')

        return;
    }

    const handleClickEliminar = (id) => {

        Swal.fire({
            title: "Desea Eliminar?",
            text: "No podrás recuperar el registro!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await clienteAxio.delete(`/products/delete/${id}`, {
                        headers: {
                            'x-token': localStorage.getItem('token-licorlab')
                        }
                    })

                    dispatch(getProducts())

                } catch (error) {
                    console.log(error);
                }

                Swal.fire({
                    title: "Eliminado!",
                    text: "Registro Eliminado.",
                    icon: "success"
                });
            }
        });
    }

    const handleClickUpdate = (product) => {
        dispatch(setProduct(product))
    }

    return (
        <div >
            <img src={`${import.meta.env.VITE_BACKEND_URL}/products/image/${img[0]}`} alt={`Imagen de ${name}`} />
            <h1 className="font-bold text-2xl capitalize">{name}</h1>
            <p>{uid}</p>
            <p className="text-xl text-gray-500 capitalize">{des}</p>
            <p className="font-bold mt-5 text-2xl">${new Intl.NumberFormat('es-CO').format(price)}</p>

            {
                admin === 1 ? (
                    <div className="flex justify-between items-center">
                        <button className="bg-indigo-500 p-3 border-md hover:bg-indigo-600 rounded text-white" onClick={() => handleClickUpdate(product)}>Editar</button>
                        <button className="bg-red-500 p-3 border-md hover:bg-red-600 rounded text-white" onClick={() => handleClickEliminar(uid)}>Eliminar</button>
                    </div>
                ) : (<button type="button" onClick={handleClick} className="mt-3 uppercase bg-indigo-600 text-white w-9/12 p-2 rounded font-bold text-center hover:bg-indigo-700">Agregar al Carrito</button>)
            }
        </div>
    )
}

export default Card