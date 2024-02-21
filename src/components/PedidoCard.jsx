import { useDispatch } from "react-redux";
import { clienteAxio } from "../axios/clienteAxios";
import { getCompras } from "../../store/thunks/compras";

const PedidoCard = ({ pedido }) => {

    let dateFormatted;
    const dispatch = useDispatch();
    const { customer, products, status, date, _id } = pedido;
    const { name, tel } = customer;

    const handleClick = async () => {
        try {
            await clienteAxio.put(`/compras/${_id}`, null, {
                headers: {
                    'x-token': localStorage.getItem("token-muevelo")
                }
            })

            dispatch(getCompras())
        } catch (error) {
            console.log(error?.response.data);
        }
    }

    dateFormatted = date.split("T")[0] + " " + date.split("T")[1].split(".")[0]

    return (
        <div className={`${status ? 'bg-cyan-500' : 'bg-red-500'} p-3 rounded-md`} >
            <p><span className="font-bold">Fecha: </span>{dateFormatted}</p>
            <p><span className="font-bold">Cliente: </span> {name} - {tel}</p>
            <h3 className="font-bold">Productos:</h3>
            <ul key={_id}>
                {products.map(p => (
                    <li key={p.uid}>
                        {p.name} - ${p.price}
                    </li>
                ))}
            </ul>

            <p><span>Total: $</span>{
                products.reduce((t, p) => t += p.price, 0)
            }</p>

            {!status && (<button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md p-1 mt-2" onClick={handleClick}>Completar Pedido</button>)}
        </div>
    )
}

export default PedidoCard