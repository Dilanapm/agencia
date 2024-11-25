import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig'; // Configuración de Axios
import { connect } from "react-redux";
import { logout } from '../../redux/actions/auth'; // Acción de logout

function AdminDashboard({ isAuthenticated, logout }) {
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

    const handleLogoutClick = async () => {
        try {
            // Llama a la acción de logout para realizar el POST al servidor
            await logout();
            navigate('/'); // Redirige al usuario a la página principal
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleDeactivate = async (userId) => {
        try {
            await api.put(`/api/users/up-del-user/${userId}/`, { is_active: false });
            setUsers(users.map(user =>
                user.id === userId ? { ...user, is_active: false } : user
            ));
            console.log("Usuario desactivado con éxito");
        } catch (error) {
            console.error("Error al desactivar el usuario:", error);
        }
    };

    const handleActivate = async (userId) => {
        try {
            await api.put(`/api/users/up-del-user/${userId}/`, { is_active: true });
            setUsers(users.map(user =>
                user.id === userId ? { ...user, is_active: true } : user
            ));
            console.log("Usuario activado con éxito");
        } catch (error) {
            console.error("Error al activar el usuario:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-orange-600 text-white flex flex-col">
                <div className="p-6 text-center text-2xl font-bold border-b border-gray-700">
                    Panel de Administrador
                </div>
                <nav className="flex-1 p-4">
                    <ul>
                        <li className="mb-4">
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-orange-700"
                                onClick={() => navigate('/admin-dashboard')}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                className="w-full text-left px-4 py-2 rounded hover:bg-orange-700"
                            >
                                Informes y Reportes
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                    <button
                        onClick={handleLogoutClick}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Cerrar Sesión
                    </button>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
                        {loading ? (
                            <p className="text-center text-gray-700">Cargando usuarios...</p>
                        ) : (
                            <table className="w-full table-auto border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-200 px-4 py-2 text-left">Nombre</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Rol</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-200 px-4 py-2">{user.username}</td>
                                            <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                                            <td className="border border-gray-200 px-4 py-2">{user.role}</td>
                                            <td className="border border-gray-200 px-4 py-2">
                                                {user.is_active ? (
                                                    <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                                    onClick={() => handleDeactivate(user.id)}
                                                >
                                                    Desactivar
                                                </button>
                                                ) : (
                                                    <button
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                                                onClick={() => handleActivate(user.id)}
                                            >
                                                Activar
                                            </button>

                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(AdminDashboard);
