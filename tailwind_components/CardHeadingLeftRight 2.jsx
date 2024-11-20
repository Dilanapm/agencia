<nav className="w-full  py-6 shadow-md fixed bg-orange-400">
        <div className="px-4 sm:px-6">
            <div className="ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap md:px-4 px-2">
                <Link to="/" className="ml-4 mt-2">
                    <img 
                    src={logo_huella}
                    width={80}
                    height={70}
                    className=""></img>
                </Link>
                <div className="ml-4 mt-2 flex-shrink-0">
                        <NavLink to='/home' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">inicio</NavLink>
                        <NavLink to='/adoptar' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">Adoptame</NavLink>
                        <NavLink to='/donacion' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">Donar</NavLink>
                        <NavLink to='/curiosidades' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">Curiosidades/Tips</NavLink>
                        <NavLink to='/contactar' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">Contactanos</NavLink>
                        <button
                        type="button"
                        className="ml-12 relative inline-flex items-center rounded-md border border-transparent pl-3 pr-2 py-3 bg-orange-button text-white transition duration-300 hover:ease-in-out hover:bg-orange-700"
                        >
                            inciar sesion
                        <DotLoader loading={loading} size={25} color="#f2f2f2"></DotLoader>
                        </button>
                    </div>
                
            </div>
            
        </div>
    </nav>