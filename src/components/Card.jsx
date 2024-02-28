import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { clienteAxio } from "../axios/clienteAxios";
import { getProducts } from "../../store/thunks/products";
import { setProduct } from "../../store/products/productsSlice";
import EMPRESA_ID from "../constant/EMPRESA_ID";

const Card = ({ product, pos }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { admin, empresa } = user;

    const { uid, name, description, img } = product;

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
                            'x-token': localStorage.getItem('token-muevelo')
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

    const path = `${import.meta.env.VITE_BACKEND_URL}/products/image/${img}`;

    return (
        <div className="rounded-md" style={{ backgroundImage: `url(${path})` }}>
            <div className={`flex items-center p-16 justify-between my-10 banner-cont text-white h-96 rounded-md ${(pos % 2 != 0) ? '' : 'flex-row-reverse'}`}>
                <h3 className='uppercase text-2xl font-bold'>
                    {name}
                </h3>

                <div>
                    <p>{description}</p>

                    {
                        admin === true && empresa === EMPRESA_ID ? (
                            <div className="flex justify-between items-center">
                                <button className="bg-indigo-500 p-3 border-md hover:bg-indigo-600 rounded text-white" onClick={() => handleClickUpdate(product)}>Editar</button>
                                <button className="bg-red-500 p-3 border-md hover:bg-red-600 rounded text-white" onClick={() => handleClickEliminar(uid)}>Eliminar</button>
                            </div>
                        ) : (<button className='bg-blue-500 hover:bg-blue-600 p-3 rounded-md font-bold'>Obtener Información</button>)
                    }
                </div>
            </div>
        </div >
    )
}

export default Card