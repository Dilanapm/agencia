import React, { useState } from "react";
import api from "api/axiosConfig";

function ResetPassword() {
    const [email, setEmail] = useState(""); // Estado para el correo ingresado
    const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
    const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
    const [isLoading, setIsLoading] = useState(false); // Botón de carga

    const handleInputChange = (e) => {
        setEmail(e.target.value.trim()); // Elimina espacios innecesarios
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir comportamiento por defecto
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        // Validación de email en frontend
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Por favor, ingresa un correo válido.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post("/api/users/password-reset/", { email });
            setSuccessMessage(
                "el correo existe, recibirás un enlace para restablecer tu contraseña en tu buzon, revisa por si acaso el spam"
            );
            console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(
                    error.response.data.error ||
                    "Hubo un error al procesar tu solicitud. Intenta nuevamente."
                );
            } else {
                setErrorMessage("Hubo un error inesperado. Intenta nuevamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Restablecer Contraseña
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input de Correo */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="Ingresa tu correo"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Mensaje de Error */}
                    {errorMessage && (
                        <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
                    )}

                    {/* Mensaje de Éxito */}
                    {successMessage && (
                        <p className="text-green-600 text-sm mt-2">{successMessage}</p>
                    )}

                    {/* Botón de Envío */}
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
                            isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-700"
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Enviando..." : "Enviar enlace"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
