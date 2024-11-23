import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

function CuidadorDashboard({ logout }) {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        console.log('Rol en localStorage:', role);
        if (role !== 'Cuidador') {
            console.log('No es Cuidador, redirigiendo...');
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        logout(); // Llama a la acción de logout
        navigate('/login'); // Redirige al usuario al inicio de sesión
    };

    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Vista de Cuidador</h1>
                <p className="mt-4 text-lg text-gray-600">Bienvenido a tu panel de cuidador</p>
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default connect(null, { logout })(CuidadorDashboard);
