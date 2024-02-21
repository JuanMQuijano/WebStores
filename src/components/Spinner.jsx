const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative mb-16 flex flex-col items-center">
                <span className="loader"></span>
                <p>Cargando...</p>
            </div>
        </div>
    )
}

export default Spinner