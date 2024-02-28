import Card from './Card';

const Products = ({ products }) => {

    return (
        <div className='w-5/6 mx-auto mt-8'>
            {products.map((p, i) => (<Card key={i} product={p} />))}
        </div>
    )
}

export default Products