import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'api/axiosConfig';

function UserProfile() {
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        re_password: ''
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({}); // Cambiado a un objeto para manejar múltiples errores
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get('/api/users/me/'); // La configuración de token ya está en axiosConfig
                console.log('Datos del usuario obtenidos:', res.data); // Log de los datos obtenidos
                setUserData(res.data);
            } catch (err) {
                console.error('Error al obtener los datos del usuario:', err);
                navigate('/'); // Redirigir si hay error o el usuario no está autenticado
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [navigate]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            // Permitir solo números, espacios, guiones, paréntesis y "+"
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
            console.log('Datos enviados:', userData); // Verifica los datos enviados
            await api.put(`/api/users/me/`, userData);
            alert('Información actualizada con éxito');
        } catch (err) {
             // Procesa los errores del backend
             if (err.response && err.response.data) {
                setErrors(err.response.data); // Guarda los errores del backend
            } else {
                setErrors({ general: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.' });
            }
          }
    };

    const handleCancel = () => {
        const role = localStorage.getItem('role'); // Obtener el rol del usuario desde localStorage
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
        <body class="bg-orange-600 min-h-screen flex items-center justify-center p-4">
    <div class="font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl">
       
        <div class="flex flex-col">
            <div class="flex flex-col md:flex-row justify-between mb-5 items-start">
                <h2 class="mb-5 text-4xl font-bold text-orange-600">Perfil de Usuario</h2>
                <div class="text-center">
                    <div>
                        <img src="https://i.pravatar.cc/300" alt="Profile Picture" class="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"/>
                        <input type="file" name="profile" id="upload_profile" hidden required/>

                        <label for="upload_profile" class="inline-flex items-center">
                            <svg data-slot="icon" class="w-5 h-5 text-orange-600" fill="none" stroke-width="1.5"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                </path>
                            </svg>
                        </label>
                    </div>
                    <button class="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300">
                        Change Profile Picture
                    </button>
                </div>
            </div>
            
            
            <form onSubmit={handleSaveChanges}
                className="space-y-4"
            >
                {/* Mensaje de error general */}
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
                        className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}   
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
                <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Repeat Password</label>
                        <input
                        type="password"
                        id="re_password"
                        name="re_password"
                        value={userData.re_password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-600"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>

    </div>
</body>
    );
}

export default UserProfile;