import { useDispatch } from "react-redux"
import { setCategoria } from "../../store/categorias/categoriasSlice";
import Swal from "sweetalert2";
import { clienteAxio } from "../axios/clienteAxios";
import { getCategorias } from "../../store/thunks/categorias";

const CategoriaCard = ({ categoria }) => {

    const dispatch = useDispatch();

    const handleClick = (categoria) => {
        dispatch(setCategoria(categoria))
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
                    await clienteAxio.delete(`/categorias/${id}`, {
                        headers: {
                            'x-token': localStorage.getItem('token-licorlab')
                        }
                    })

                    dispatch(getCategorias())
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

    return (
        <div>
            Nombre: {categoria.name}

            <div className='flex gap-2'>
                <button className='bg-indigo-500 hover:bg-indigo-600 text-white rounded-md p-1' onClick={() => handleClick(categoria)}>Editar</button>
                <button className='bg-red-500 hover:bg-red-600 text-white rounded-md p-1' onClick={() => handleClickEliminar(categoria.uid)} >Eliminar</button>
            </div>
        </div>
    )
}

export default CategoriaCard