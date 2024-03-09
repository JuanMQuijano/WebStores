import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-black w-full'>
            <div className='w-full lg:w-8/12 grid grid-cols-3 p-7 mt-24 text-white mx-auto '>

                <div className='mx-auto border-white border-r p-5 pr-24 lg:pr-52'>
                    <h3 className='text-xl lg:text-2xl uppercase mb-5'>Puntos de Venta</h3>

                    <p>Popayán - Dirección 1</p>
                    <p>Popayán - Dirección 2</p>
                    <p>Popayán - Dirección 3</p>

                </div>

                <div className='mx-auto border-white border-r p-5 pr-24 lg:pr-52'>
                    <h3 className='text-xl lg:text-2xl uppercase mb-5'>Contacto</h3>

                    <p>Popayán - <a href="https://api.whatsapp.com/send?phone=573123228521">+57 3123228521</a></p>
                    <p>Popayán - <a href="https://api.whatsapp.com/send?phone=573224754279">+57 3224754279</a></p>
                    <p>Popayán - <a href="https://api.whatsapp.com/send?phone=573058356813">+57 3058356813</a></p>

                </div>

                <div className='mx-aut p-5 pr-24 lg:pr-52'>
                    <Link className='text-xl lg:text-2xl uppercase'>Preguntas Frecuentes</Link>
                </div>
            </div>


        </footer>
    )
}

export default Footer