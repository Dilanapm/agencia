import { NavLink, Link } from "react-router-dom";
import logo_huella from 'assets/img/logo_vital.png';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import menu_desp from "assets/img/menu.png";
import { connect } from "react-redux";
import { logout } from "redux/actions/auth"; // Importa la acción de logout

function Navbar({ isAuthenticated, logout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogoutClick = async () => {
        try {
            await logout(); // Llama a la acción de Redux para cerrar sesión
            navigate('/'); // Redirige al usuario a la página principal
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Redirige a la página de registro
    };

    return (
        <header className="bg-red-400 ">
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
        isMenuOpen ? "top-[10%]" : "top-[-100%]"
    } md:w-auto w-full flex flex-col items-center justify-center px-5 transition-all ease-in-out`}
>
    <ul className="flex flex-col md:flex-row md:items-center md:gap-[2vw] gap-6 text-center">
        <NavLink
            to="/home"
            className="hover:bg-red-500 px-4 py-2 rounded text-lg text-white transition"
        >
            Inicio
        </NavLink>
        <NavLink
            to="/adoptar"
            className="hover:bg-red-500 px-4 py-2 rounded text-lg text-white transition"
        >
            Adoptame
        </NavLink>
        <NavLink
            to="/donacion"
            className="hover:bg-red-500 px-4 py-2 rounded text-lg text-white transition"
        >
            Donar
        </NavLink>
        <NavLink
            to="/curiosities"
            className="hover:bg-red-500 px-4 py-2 rounded text-lg text-white transition"
        >
            Curiosidades/Tips
        </NavLink>
        <NavLink
            to="/contact"
            className="hover:bg-red-500 px-4 py-2 rounded text-lg text-white transition"
        >
            Contactanos
        </NavLink>
    </ul>
</div>


                {/* Sign in button and menu icon */}
                <div className="flex items-center gap-6">
                    {isAuthenticated ? (
                        <>
                            {/* Icono de usuario */}
                            <img
                                src={require('assets/usuario.png')}
                                alt="Usuario"
                                className="w-8 h-8 cursor-pointer rounded-full"
                                onClick={() => navigate('/user-profile')}
                            />
                            <button
                                onClick={handleLogoutClick}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleRegisterClick}
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
    isAuthenticated: state.auth.isAuthenticated || !!localStorage.getItem('token'),
});

export default connect(mapStateToProps, { logout })(Navbar);
