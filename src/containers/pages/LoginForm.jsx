import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/auth'; // Importa la acción de login

const LoginForm = ({ login, isAuthenticated, role }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { username, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors(''); // Limpia errores previos
        try {
            await login(username, password); // Llama a la acción de login
        } catch (err) {
            setErrors(err || 'Credenciales incorrectas');
        }
    };

    // Redirección basada en el rol y autenticación
    if (isAuthenticated) {
        if (role === 'Administrador') navigate('/admin-dashboard');
        else if (role === 'Cuidador') navigate('/cuidador');
        else if (role === 'Adoptante') navigate('/');
        else navigate('*');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={onSubmit} className="max-w-md w-full p-6 bg-orange-400 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
                {errors && <p className="text-red-600 text-center font-semibold mb-4">{errors}</p>}
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
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        onChange={onChange}
                        value={password}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p
                        onClick={togglePasswordVisibility}
                        className="text-blue-600 text-sm mt-2 cursor-pointer hover:underline"
                    >
                        {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    </p>
                </div>
                <div className="flex justify-between mt-4">
                <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        Volver
                    </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Iniciar Sesión
                </button>
                </div>
                <p className="text-center text-black mt-4">
                <a href="/pass-forget" className="text-blue-800 hover:underline">
                ¿Se te olvido la contraseña?
                </a>
        </p>
            </form>
        </div>
    );
};

// Mapea el estado de Redux a los props del componente
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
});

// Conecta el componente al store de Redux y exporta
export default connect(mapStateToProps, { login })(LoginForm);
