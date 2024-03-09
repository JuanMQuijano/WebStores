import Card from './Card';

const Products = ({ products }) => {

    return (
        <div className='w-9/12 mx-auto mt-10'>

            <div className='grid grid-cols-3 lg:grid-cols-5 gap-7'>
                {products.map((p, i) => (<Card key={i} product={p} />))}
            </div>

        </div>
    )
}

export default Products