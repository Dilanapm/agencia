import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const LoginForm = ({ login, isAuthenticated, role }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    // Redirección declarativa basada en el rol
    if (isAuthenticated) {
        console.log('Rol:', role); // Confirmar el rol en la consola
    if (role === 'Administrador') {
        navigate('/admin-dashboard'); // Redirige al dashboard de administrador
    } else if (role === 'Cuidador') {
        navigate('/cuidador/dashboard'); // Redirige al dashboard de cuidador
    } else if (role === 'Adoptante') {
        navigate('/home'); // Redirige a la página principal
    }
        else {
            return navigate('*');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={onSubmit} className="max-w-md w-full p-6 bg-orange-400 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={onChange}
                        value={username}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={onChange}
                        value={password}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-700 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
});

export default connect(mapStateToProps, { login })(LoginForm);
