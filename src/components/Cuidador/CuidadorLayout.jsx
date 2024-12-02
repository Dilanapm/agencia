import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function CuidadorLayout() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-orange-600 text-white flex flex-col">
                <div className="p-6 text-center text-2xl font-bold border-b border-gray-700">
                    Panel de Cuidador
                </div>
                <nav className="flex-1 p-4">
                    <ul>
                        <li className="mb-4">
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-orange-700"
                                onClick={() => navigate('/user-profile')}
                            >
                                Perfil
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-orange-700"
                                onClick={() => navigate('/cuidador')}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/cuidador/registrar-mascota")}
                                className="w-full text-left px-4 py-2 rounded hover:bg-orange-700"
                            >
                                Registrar Nueva Mascota
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content area */}
            <div className="flex-1 p-6">
                <Outlet /> {/* Aquí se renderizan las vistas dinámicas */}
            </div>
        </div>
    );
}

export default CuidadorLayout;
