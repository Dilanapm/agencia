import { NavLink, Link } from "react-router-dom";
import logo_huella from 'assets/img/logo_vital.png';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import menu_desp from "assets/img/menu.png";
import { connect } from "react-redux";
import { logout } from "redux/actions/auth"; // Importa la acción de logout
import NotificationsDropdown from "components/notification/NotificationsDropdown";
// cambios
import axios from "axios";
function Navbar({ isAuthenticated, logout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [hasNotifications, setHasNotifications] = useState(false);
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
    console.log("isAuthenticated en Navbar:", isAuthenticated);
    // Verificar notificaciones desde el backend
    const checkNotifications = async () => {
        try {
            const response = await axios.get('/api/notifications/check-notifications/', {
               headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`
             }
         });
            setHasNotifications(response.data.has_notifications); // Actualiza el estado
        } catch (error) {
            console.error('Error al verificar notificaciones:', error);
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            checkNotifications(); // Verificar notificaciones al montar el componente si está autenticado
        }
    }, [isAuthenticated]);
    return (
        
        <header className="bg-red-400">
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
                        <>
                         {/* Icono de notificaciones */}
                         {/* <img
                            src={hasNotifications ? notification : bell}
                            alt="Notificaciones"
                            className="w-8 h-8 cursor-pointer"
                            onClick={() => navigate('/notifications')}
                        /> */}
                        <NotificationsDropdown />
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