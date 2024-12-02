import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "api/axiosConfig";
import { useNavigate } from 'react-router-dom';
function ResetPasswordConfirm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({}); // Manejar errores específicos
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Reiniciar el mensaje
        setErrors({}); // Reiniciar los errores

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await api.post("/api/users/password-reset/confirm/", {
                token,
                email,
                new_password: password,
                re_password: confirmPassword,
            });
            setMessage(response.data.message || "¡Contraseña restablecida con éxito!");
            // Redirección automática después de 3 segundos
            if (response.data.message) {
                setTimeout(() => navigate("/login"), 3000);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                // Captura errores del backend
                setErrors(err.response.data);
            } else {
                setMessage("Error al restablecer la contraseña. Intenta nuevamente.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-orange-400 rounded-lg shadow-lg">
                <h1 className="text-xl font-bold text-center mb-4">Restablecer Contraseña</h1>
                {message && <p className="text-center text-blue-600">{message}</p>}
                {errors.error && (
                    <p className="text-center text-red-600">{errors.error}</p>
                )}
                <form onSubmit={handleSubmit} className="bg-orange-400 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nueva Contraseña
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 border-4 ${
                                errors.new_password ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.new_password && (
                            <p className="text-sm text-red-500">{errors.new_password}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirmar Contraseña
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-2 border-4 ${
                                errors.re_password ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        <p
                        onClick={togglePasswordVisibility}
                        className="text-blue-600 text-sm mt-2 cursor-pointer hover:underline"
                        >
                        {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        </p>
                        {errors.re_password && (
                            <p className="text-sm text-red-500">{errors.re_password}</p>
                        )}

                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Restablecer
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordConfirm;
