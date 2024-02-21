import React from 'react'

const HomePage = () => {
    return (
        <>

            <div className='bg-red-500 w-5/6 mx-auto mt-8'>
                <h2 className=''>¿Quienes Somos?</h2>
            </div>

            <div className='w-5/6 mx-auto mt-8'>
                <h2 className='p-3 bg-blue-950 text-white font-bold text-2xl'>Nuestros Servicios</h2>

                <div className='banner opt-1 rounded-md'>
                    <div className='flex items-center p-16 justify-between my-10 banner-cont text-white h-96 rounded-md'>
                        <h3 className='uppercase text-2xl font-bold'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </h3>

                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quisquam dolore. Repellat distinctio dignissimos, deserunt id, quo veniam voluptatem, natus odit quasi asperiores quisquam vero eos fugiat numquam illum nisi?</p>

                            <button className='bg-blue-500 hover:bg-blue-600 p-3 rounded-md font-bold'>Obtener Información</button>
                        </div>
                    </div>
                </div>

                <div className='banner opt-2 rounded-md'>
                    <div className='flex items-center p-16 justify-between my-10 banner-cont text-white h-96 rounded-md flex-row-reverse'>
                        <h3 className='uppercase text-2xl font-bold'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </h3>

                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quisquam dolore. Repellat distinctio dignissimos, deserunt id, quo veniam voluptatem, natus odit quasi asperiores quisquam vero eos fugiat numquam illum nisi?</p>

                            <button className='bg-blue-500 hover:bg-blue-600 p-3 rounded-md font-bold'>Obtener Información</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default HomePage