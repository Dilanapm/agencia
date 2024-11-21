import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role'); // Recupera el rol desde localStorage
        console.log('Rol en localStorage:', role); // Verifica qué rol se está recuperando
        if (role !== 'Administrador') {
            console.log('No es administrador, redirigiendo...');
            navigate('/');
        }
    }, [navigate]);

    const handleGoToAdminPanel = () => {
        window.location.href = '/admin/'; // Redirige al panel de Django
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-orange-400 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Bienvenido, Administrador</h2>
                <p className="mb-4 text-center">
                    Desde aquí puedes gestionar el sistema utilizando el panel de administración de Django.
                </p>
                <button
                    onClick={handleGoToAdminPanel}
                    className="w-full bg-gray-700 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Ir al Panel de Administración
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;
