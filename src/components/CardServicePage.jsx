const CardServicePage = ({ product }) => {

    const { uid, name, description, img } = product;

    const path = `${import.meta.env.VITE_BACKEND_URL}/products/image/${img}`;

    return (
        <div className="rounded-md" style={{ backgroundImage: `url(${path})` }}>
            <div className={`flex items-center p-16 justify-between banner-cont text-white h-96 rounded-md`}>
                <h3 className='uppercase text-2xl font-bold'>
                    {name}
                </h3>

                <div className="flex flex-col">
                    <p className="">{description}</p>
                </div>
            </div>
        </div >
    )
}

export default CardServicePage