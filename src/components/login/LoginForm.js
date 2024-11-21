import React, { useState } from 'react';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Iniciando sesión...');

        // Simulación de autenticación
        setTimeout(() => {
            if (formData.email === 'usuario@example.com' && formData.password === 'password123') {
                setStatus('Inicio de sesión exitoso');
            } else {
                setStatus('Credenciales incorrectas. Intenta nuevamente.');
            }
        }, 1500);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-500 hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Iniciar Sesión</h2>
                
                <label htmlFor="email" className="block text-gray-600 mb-2">Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                
                <label htmlFor="password" className="block text-gray-600 mb-2">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Iniciar Sesión
                </button>

                {status && <p className="mt-4 text-center text-sm text-gray-600">{status}</p>}

                <p className="text-center text-sm text-gray-500 mt-6">
                    ¿No tienes una cuenta? <a href="/registro" className="text-blue-500 hover:underline">Regístrate aquí</a>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
