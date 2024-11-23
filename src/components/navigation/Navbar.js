import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logo_huella from 'assets/img/logo_vital.png';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import menu_desp from "assets/img/menu.png";

function Navbar({isAuthenticated, logout}) {
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        // Elimina el token de localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role'); // Opcional si guardas el rol
        logout(); // Si usas Redux para manejar el estado global
        navigate('/'); // Redirige al usuario a la página principal
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleRetgister = () => {
        navigate('/register'); // Redirige a la página de registro
    };
    return (
        <header className= "bg-red-400 ">
            <nav className="flex justify-between items-center w-[92%] mx-auto py-4">
                {/* Logo */}
                <div>
                    <Link to="/" className="w-16">
                        <img src={logo_huella} alt="Logo" className="w-16 cursor-pointer" />
                    </Link>
                </div>

                {/* Nav Links */}
                <div
                    className={`nav-links duration-500 md:static absolute bg-red-400 md:min-h-fit min-h-[40vh] left-0 ${
                        isMenuOpen ? "top-[9%]" : "top-[-100%]"
                    } md:w-auto w-full flex items-center px-5 transition-all ease-in-out`}
                >
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                        <NavLink to='/home' className="hover:text-gray-200 text-lg text-gray-900 mx-4">Inicio</NavLink>
                        <NavLink to='/adoptar' className="hover:text-gray-200 text-lg text-gray-900 mx-4">Adoptame</NavLink>
                        <NavLink to='/donacion' className="hover:text-gray-200 text-lg text-gray-900 mx-4">Donar</NavLink>
                        <NavLink to='/curiosities' className="hover:text-gray-200 text-lg text-gray-900 mx-4">Curiosidades/Tips</NavLink>
                        <NavLink to='/contactar' className="hover:text-gray-200 text-lg text-gray-900 mx-4">Contactanos</NavLink>
                    </ul>
                </div>
                {/* Sign in button and menu icon */}
                <div className="flex items-center gap-6">
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Cerrar Sesión
                    </button>
                ) : (
                    <button
                        onClick={handleRetgister}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Acceder
                    </button>
                )}
                    {/* Menu icon for small screens */}
                    <img
                        src={menu_desp}
                        alt="Menu"
                        onClick={toggleMenu}
                        className="w-6 cursor-pointer md:hidden"
                    />
                </div>
            </nav>
        </header>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch({ type: 'LOGOUT' }), // Acción para manejar logout
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);