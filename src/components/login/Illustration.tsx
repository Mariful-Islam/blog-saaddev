const Illustration = () => {
    return (
        <div className="bg-blue-600 h-screen w-full md:w-1/2 flex flex-col justify-center items-center gap-6 text-white ">
            <h1 className="text-4xl lg:text-6xl">Transformation</h1>
            <h2 className="text-xl">Innovation</h2>

            <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square border-2 w-10 h-10 border-white">

                </div>
                <div className="aspect-square border-2 w-10 h-10 border-white"></div>
                <div className="aspect-square border-2 w-10 h-10 border-white"></div>
            </div>
        </div>
    )
}

export default Illustration