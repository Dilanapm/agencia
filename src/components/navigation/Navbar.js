import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logo_huella from 'assets/img/logo_vital.png';
import { useState } from "react";
import { DotLoader } from "react-spinners";
import menu_desp from "assets/img/menu.png";

function Navbar() {
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                        <NavLink to='/curiosidades' className="hover:text-gray-200 text-lg text-gray-900 mx-4">Curiosidades/Tips</NavLink>
                        <NavLink to='/contactar' className="hover:text-gray-200 text-lg text-gray-900 mx-4">Contactanos</NavLink>
                    </ul>
                </div>

                {/* Sign in button and menu icon */}
                <div className="flex items-center gap-6">
                    <button className="bg-orange-button text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                        Iniciar Sesión
                        
                    </button>
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

const mapStateToProp = (state) => ({});

export default connect(mapStateToProp, {})(Navbar);