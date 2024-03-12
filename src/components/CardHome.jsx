import { Link } from "react-router-dom";

const CardHome = ({ product, pos }) => {

    const { uid, name, description, img } = product;


    const path = `${import.meta.env.VITE_BACKEND_URL}/products/image/${img}`;

    return (
        <div className="rounded-md" style={{ backgroundImage: `url(${path})` }}>
            <div className={`flex flex-col p-16 my-10 banner-cont text-white h-96 rounded-md`}>
                <h3 className='uppercase text-2xl font-bold my-14'>
                    {name}
                </h3>

                <div className="flex flex-col gap-5">
                    <div>
                        <p>{description}</p>
                    </div>

                    <div>
                        <Link to={`/servicio/${uid}`} className='bg-blue-500 hover:bg-blue-600 p-3 rounded-md font-bold'>Obtener Información</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CardHome