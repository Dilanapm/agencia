import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig'; // Asegúrate de tener configurado tu axios con interceptores

function AdminDashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Validar el rol del usuario
        const role = localStorage.getItem('role'); 
        console.log('Rol en localStorage:', role); 

        if (role !== 'Administrador') {
            console.log('No es administrador, redirigiendo...');
            navigate('/');
        } else {
            // Si es administrador, cargar la lista de usuarios
            const fetchUsers = async () => {
                try {
                    const response = await api.get('/api/users/list/');
                    setUsers(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error al obtener la lista de usuarios:", error);
                    setLoading(false);
                }
            };
            fetchUsers();
        }
    }, [navigate]);

    const handleDeactivate = async (userId) => {
        try {
            await api.put(`/api/users/up-del-user/${userId}/`, { is_active: false });
            setUsers(users.map(user => 
                user.id === userId ? { ...user, is_active: false } : user
            ));
        } catch (error) {
            console.error("Error al desactivar el usuario:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-5xl w-full p-6 bg-orange-400 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Bienvenido, Administrador</h2>
                {loading ? (
                    <p className="text-center text-gray-700">Cargando usuarios...</p>
                ) : (
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Nombre</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">Rol</th>
                                <th className="py-2">Estado</th>
                                <th className="py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="py-2">{user.username}</td>
                                    <td className="py-2">{user.email}</td>
                                    <td className="py-2">{user.role}</td>
                                    <td className="py-2">{user.is_active ? "Activo" : "Inactivo"}</td>
                                    <td className="py-2">
                                        {user.is_active && (
                                            <button 
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                                onClick={() => handleDeactivate(user.id)}
                                            >
                                                Desactivar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
