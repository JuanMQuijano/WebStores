import Card from './Card';

const Products = ({ products }) => {

    return (
        <div className='w-9/12 mx-auto'>

            <div className='grid grid-cols-5 gap-5'>
                {products.map((p, i) => (<Card key={i} product={p} />))}
            </div>

        </div>
    )
}

export default Products