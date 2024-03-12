import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clienteAxio } from '../axios/clienteAxios';
import Alerta from './Alerta';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct, setProducts } from '../../store/products/productsSlice';
import { getProducts } from '../../store/thunks/products';
import { getCategorias } from '../../store/thunks/categorias';

const CrearProductoForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(selector => selector.auth)
    const { admin } = user;

    //Bloque el acceso a las rutas de admin
    useEffect(() => {
        if (admin === 0 || admin === null) {
            navigate("/")
            return;
        }

        dispatch(getCategorias())
    }, [])


    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        categoria: '',
        stock_min: "",
        stock: ""
    });

    const [id, setId] = useState(null);
    const [editando, setEditando] = useState(false);
    const [alerta, setAlerta] = useState({ ok: null, msg: '' });
    const [img, setImg] = useState(null)
    const { categorias } = useSelector(state => state.categorias);

    const { product } = useSelector(state => state.products);

    useEffect(() => {
        if (Object.keys(product).length > 0) {
            setData({
                name: product.name,
                description: product.description,
                price: product.price,
                categoria: product.categoria,
                stock_min: product.stock_min,
                stock: product.stock
            })
            setImg(product.img)
            setId(product.uid)
            setEditando(true)
        }
    }, [product])

    const handleChange = (e) => {
        const { name, value } = e.target;

        return setData({ ...data, [name]: value })
    }

    const handleImg = (e) => {
        return setImg(e)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(data).includes("") || img.length === 0) {
            setAlerta({ ok: false, msg: "Todos los campos son necesarios" })
            setTimeout(() => {
                setAlerta({ ok: null, msg: "" })
            }, 5000)
            return
        }

        const { name, description, price, categoria, stock_min, stock } = data;

        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        for (let i = 0; i < img.length; i++) {
            formData.append("img", img[i])
        }
        formData.append("price", price)
        formData.append("categoria", categoria)
        formData.append("stock_min", stock_min)
        formData.append("stock", stock)


        try {
            if (!editando) {
                const { data } = await clienteAxio.post("/products/add", formData, {
                    headers: {
                        'x-token': localStorage.getItem('token-licorlab'),
                    }
                });

                dispatch(getProducts())

                setAlerta({ ok: data.ok, msg: data.msg })
            } else {
                const { data } = await clienteAxio.put(`/products/update/${id}`, formData, {
                    headers: {
                        'x-token': localStorage.getItem('token-licorlab'),
                    }
                });

                dispatch(setProduct({}));
                dispatch(getProducts())

                setAlerta({ ok: data.ok, msg: data.msg })
            }


            setData({
                name: '',
                description: '',
                price: '',
                categoria: '',
                stock_min: '',
                stock: ''
            })
            setImg(null)
            setId(null)
            setEditando(false);
            return;

        } catch (error) {
            console.log(error);

            if (error?.response?.data.ok === false) {
                setAlerta({ ok: error?.response?.data.ok, msg: error?.response?.data.msg })

                setTimeout(() => {
                    setAlerta({ ok: null, msg: '' })
                }, 5000)

                return
            }
        }

    }

    const handleClick = () => {
        navigate(-1)
    }

    const { name, description, price, categoria, stock_min, stock } = data;
    const { ok, msg } = alerta;

    return (
        <div>
            <div>
                <h1 className='text-2xl lg:text-4xl text-center capitalize'>{!editando ? 'Agregar un nuevo Producto a la tienda' : 'Edición de Producto'}</h1>

                <form onSubmit={handleSubmit} className='mt-10 p-3 lg:p-5 border border-gray-400 rounded-md'>

                    {msg.length > 0 && (<Alerta ok={ok} msg={msg} />)}


                    <div className="flex flex-col my-5">
                        <label htmlFor="name" className='font-bold'>Nombre</label>
                        <input type="text" name="name" id="name" value={name} onChange={handleChange} placeholder='Ingresa el Nombre del Producto' className='p-1 rounded border border-gray-500' />
                    </div>

                    <div className="flex flex-col my-5">
                        <label htmlFor="description" className='font-bold'>Descripción</label>
                        <textarea name="description" id="description" value={description} onChange={handleChange} placeholder='Ingresa la descripción del Producto' className='p-1 rounded border border-gray-500'></textarea>
                    </div>

                    <div className="flex flex-col my-5">
                        <label htmlFor="price" className='font-bold'>Precio</label>
                        <input type="text" name="price" id="price" value={price} onChange={handleChange} placeholder='Ingresa el Precio del Producto' className='p-1 rounded border border-gray-500' />
                    </div>

                    <div className="flex flex-col my-5">
                        <label htmlFor="stock_min" className='font-bold'>Inventario Minimo</label>
                        <input type="text" name="stock_min" id="stock_min" value={stock_min} onChange={handleChange} placeholder='Ingresa la cantidad mínima del Producto' className='p-1 rounded border border-gray-500' />
                    </div>

                    <div className="flex flex-col my-5">
                        <label htmlFor="stock" className='font-bold'>Cantidad</label>
                        <input type="text" name="stock" id="stock" value={stock} onChange={handleChange} placeholder='Ingresa el total del stock' className='p-1 rounded border border-gray-500' />
                    </div>

                    <div className='flex flex-col mt-5'>
                        <label htmlFor="img" className='font-bold uppercase'>Imagen Presentación</label>
                        <input
                            type="file"
                            name="img"
                            className='p-2 rounded border border-gray-500'
                            accept="image/*"
                            onChange={(e) => handleImg(e.target.files)}
                        />
                    </div>

                    <div className='flex flex-col mt-5'>
                        <label htmlFor="categoria" className='font-bold uppercase'>Categoria</label>
                        <select name="categoria" id="categoria" onChange={handleChange} value={categoria}>
                            <option value="" className='p-2 rounded border border-gray-500'>-- Seleccione --</option>
                            {categorias.map(c => (
                                <option key={c.uid} value={c.uid} className='p-2 rounded border border-gray-500'>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex justify-between items-center mt-5'>
                        <button
                            type='submit'
                            className='p-2 bg-indigo-500 text-white capitalize rounded hover:bg-indigo-600'
                        >{!editando ? 'Agregar Producto' : 'Modificar Producto'}
                        </button>

                        <button
                            className='text-gray-800 capitalize hover:underline'
                            onClick={handleClick}
                        >Volver
                        </button>
                    </div>
                </form>

            </div >
        </div >
    )
}

export default CrearProductoForm