import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../store/thunks/products';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import CardHome from '../components/CardHome';

const HomePage = () => {

    const { loading, products } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <>
            {loading ? (<Spinner />) : (
                <>
                    <div className='w-5/6 mx-auto mt-8' id="somos">
                        <h2 className='p-3 bg-blue-950 text-white font-bold text-2xl'>¿Quienes Somos?</h2>

                        <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, tempora quos aspernatur, deleniti iure maiores ipsam voluptatibus, accusamus libero et impedit asperiores tempore expedita iusto id nobis minus eligendi. Molestiae.
                            Dolores sint accusantium adipisci provident, minus quod facere quo veritatis blanditiis necessitatibus optio itaque labore porro, qui eaque modi dignissimos! Atque repudiandae obcaecati suscipit, numquam laudantium sunt. Facere, in modi.
                            Dolor totam officiis accusantium perferendis, pariatur veniam! Facere ab, sint quam quas expedita minima inventore repudiandae dolores tempora iure atque accusamus autem dolore delectus neque debitis, ipsam sequi ratione soluta.</p>
                    </div>

                    <div className='w-5/6 mx-auto mt-8'>
                        <h2 className='p-3 bg-blue-950 text-white font-bold text-2xl'>Nuestros Servicios</h2>

                        {products.map((p, i) => <CardHome key={p.uid} product={p} pos={i} />)}
                    </div>
                </>)}


        </>
    )
}

export default HomePage