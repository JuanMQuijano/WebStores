import React from 'react'

const Alerta = ({ ok, msg }) => {
    return (
        <div className={`${ok ? 'bg-indigo-500' : 'bg-red-500'} text-white p-3 rounded-md text-center capitalize`}>{msg}</div>
    )
}

export default Alerta