import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'api/axiosConfig';

function UserProfile() {
    const navigate = useNavigate();
    const [showPasswordFields, setShowPasswordFields] = useState(false); // Estado para mostrar/ocultar campos de contraseña
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar caracteres de la contraseña
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        re_password: ''
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({}); // Para manejar errores

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get('/api/users/me/');
                console.log('Datos del usuario obtenidos:', res.data);
                setUserData(res.data);
            } catch (err) {
                console.error('Error al obtener los datos del usuario:', err);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const sanitizedValue = value.replace(/[^0-9\s\-()+]/g, '');
            setUserData({ ...userData, [name]: sanitizedValue });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setErrors({}); 
    
        try {
            // Filtrar campos no permitidos
            const { role, is_active, is_staff, is_superuser, id, ...allowedFields } = userData;
    
            // Si la contraseña está vacía, no la envíes
            if (!allowedFields.password) delete allowedFields.password;
            if (!allowedFields.re_password) delete allowedFields.re_password;
    
            console.log('Datos enviados:', allowedFields); // Verificar datos antes de enviarlos
    
            // Enviar solo los datos permitidos
            await api.put(`/api/users/me/`, allowedFields);
            alert('Información actualizada con éxito');
        } catch (err) {
            // Manejar errores del backend
            if (err.response && err.response.data) {
                setErrors(err.response.data); // Guarda los errores devueltos por el backend
            } else {
                setErrors({ general: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.' });
            }
        }
    };
    const handleDeleteAccount = async () => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            await api.delete('/api/users/me/');
            alert('Cuenta eliminada con éxito');
            navigate('/'); // Redirige a la página principal después de eliminar la cuenta
        } catch (err) {
            console.error('Error al eliminar la cuenta:', err);
            alert('Ocurrió un error al intentar eliminar la cuenta.');
        }
    };

    const handleCancel = () => {
        const role = localStorage.getItem('role');
        if (role === 'Administrador') {
            navigate('/admin-dashboard');
        } else {
            navigate('/home');
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <body className="bg-orange-600 min-h-screen flex items-center justify-center p-4">
            <div className="font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl">
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
                        <h2 className="mb-5 text-4xl font-bold text-orange-600">Perfil de Usuario</h2>
                        <div className="text-center">
                            <img
                                src="https://i.pravatar.cc/300"
                                alt="Profile Picture"
                                className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
                            />
                        </div>
                    </div>
                    <form onSubmit={handleSaveChanges} className="space-y-4">
                        {errors.general && <p className="text-red-600 text-center font-semibold mb-4">{errors.general}</p>}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre de Usuario
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                onChange={handleInputChange}
                                value={userData.username}
                                className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={userData.phone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        
                        <button
                            type="button"
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300"
                            onClick={() => setShowPasswordFields(!showPasswordFields)}
                        >
                            {showPasswordFields ? 'Ocultar Contraseñas' : 'Cambiar Contraseña'}
                        </button>
                        {showPasswordFields && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Nueva Contraseña
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                    />
                                    <p
                                        onClick={togglePasswordVisibility}
                                        className="text-blue-600 text-sm mt-2 cursor-pointer hover:underline"
                                    >
                                        {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                    </p>
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="re_password" className="block text-sm font-medium text-gray-700">
                                        Confirmar Contraseña
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="re_password"
                                        name="re_password"
                                        value={userData.re_password}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border ${errors.re_password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                    />
                                    {errors.re_password && <p className="text-red-500 text-sm">{errors.re_password}</p>}
                                </div>
                            </>
                        )}
                        
                        <div className="flex justify-end space-x-4">
                        
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                                onClick={handleCancel}
                            >
                                Volver
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300"
                            >
                                Guardar Cambios
                            </button>
                            {userData.role !== 'Administrador' && (
                                <button
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                                    onClick={handleDeleteAccount}
                                >
                                    Eliminar Cuenta
                                </button>
                        )}
                        </div>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default UserProfile;
