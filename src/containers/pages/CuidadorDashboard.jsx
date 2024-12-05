import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from 'redux/actions/auth'; // Acción de logout desde Redux
import api from 'api/axiosConfig'; // Configuración de Axios para llamadas a la API
import MascotaCard from 'components/adoption/MascotaCard';
import NotificationsDropdown from 'components/notification/NotificationsDropdown'; // Importa las notificaciones

function CuidadorDashboard({ logout }) {
    const navigate = useNavigate();
    const [mascotas, setMascotas] = useState([]); // Estado para almacenar las mascotas
    const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando
    const [error, setError] = useState(null); // Estado para manejar errores
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'Cuidador') {
            navigate('/');
        } else {
            fetchMascotas();
            fetchUserName();
        }
    }, [navigate]);

    const fetchUserName = async () => {
        try {
            const response = await api.get("/api/users/me/");
            setUserName(response.data.username || "Usuario");
        } catch (error) {
            console.error("Error al obtener el nombre del usuario:", error);
            setUserName("Usuario");
        }
    };

    const fetchMascotas = async () => {
        try {
            const response = await api.get('/api/mascotas/lista/');
            setMascotas(response.data.mascotas || []);
        } catch (error) {
            console.error('Error al obtener las mascotas:', error);
            setError('Error al cargar las mascotas. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Bienvenido, {userName}!
                    </h1>
                    <div className="flex items-center space-x-4">
                        {/* Componente de Notificaciones */}
                        <NotificationsDropdown />
                        <button
                            onClick={handleLogoutClick}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </header>
                <main className="flex-1 p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Mascotas Registradas</h2>
                    {loading ? (
                        <p className="text-center text-gray-600">Cargando mascotas...</p>
                    ) : error ? (
                        <p className="text-center text-red-600">{error}</p>
                    ) : mascotas.length === 0 ? (
                        <p className="text-center text-gray-600">No hay mascotas registradas.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mascotas.map((mascota) => (
                                <MascotaCard key={mascota.id} mascota={mascota} showAdoptButton={false} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default connect(null, { logout })(CuidadorDashboard);
