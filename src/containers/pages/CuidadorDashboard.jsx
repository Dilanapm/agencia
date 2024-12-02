import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth'; // Acción de logout desde Redux
import api from '../../api/axiosConfig'; // Configuración de Axios para llamadas a la API
import MascotaCard from 'components/adoption/MascotaCard';
function CuidadorDashboard({ logout }) {
    const navigate = useNavigate();
    const [mascotas, setMascotas] = useState([]); // Estado para almacenar las mascotas
    const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando
    const [error, setError] = useState(null); // Estado para manejar errores
    const [userName, setUserName] = useState("");
    useEffect(() => {
        // Validar el rol del usuario
        const role = localStorage.getItem('role');
        console.log('Rol en localStorage:', role);
        if (role !== 'Cuidador') {
            console.log('No es Cuidador, redirigiendo...');
            navigate('/');
        } else {
            fetchMascotas(); // Llamada a la API para obtener las mascotas
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
            const response = await api.get('/api/mascotas/lista/'); // Endpoint para obtener las mascotas
            setMascotas(response.data.mascotas || []); // Actualizar el estado con las mascotas
        } catch (error) {
            console.error('Error al obtener las mascotas:', error);
            setError('Error al cargar las mascotas. Intenta nuevamente.');
        } finally {
            setLoading(false); // Finalizar la carga
        }
    };

    const handleLogoutClick = () => {
        logout(); // Llama a la acción para hacer logout
        navigate('/'); // Redirige al usuario
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Bienvenido, {userName}!
                    </h1>
                    <button
                        onClick={handleLogoutClick}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                    >
                        Cerrar Sesión
                    </button>
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
                                <MascotaCard key={mascota.id} mascota={mascota}
                                showAdoptButton={false}/>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

// Conectando el componente a Redux
export default connect(null, { logout })(CuidadorDashboard);
