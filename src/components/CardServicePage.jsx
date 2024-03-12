const CardServicePage = ({ product }) => {

    const { uid, name, description, img } = product;

    const path = `${import.meta.env.VITE_BACKEND_URL}/products/image/${img}`;

    return (
        <div className="rounded-md" style={{ backgroundImage: `url(${path})` }}>
            <div className={`flex flex-col p-16 banner-cont text-white h-96 rounded-md`}>
                <h3 className='uppercase text-2xl font-bold my-14'>
                    {name}
                </h3>

                <div >
                    <p>{description}</p>
                </div>
            </div>
        </div >
    )
}

export default CardServicePage