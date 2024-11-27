import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'src/api/axiosConfig';

function UserProfile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        full_name: '',
        phone: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            try {
                const res = await api.get('/users/profile/'); // Define un endpoint en tu backend para obtener el perfil del usuario
                setUserData(res.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                navigate('/'); // Redirige si el usuario no está autenticado
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/users/profile/', userData); // Define un endpoint en tu backend para actualizar el perfil
            alert('Información actualizada con éxito');
        } catch (err) {
            console.error('Error updating user data:', err);
            alert('Hubo un error al actualizar tu información');
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Mi Perfil</h2>

                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Nombre de Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="full_name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={userData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Teléfono
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Actualizar Información
                </button>
            </form>
        </div>
    );
}

export default UserProfile;
