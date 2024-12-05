import React from "react";
import { useNavigate } from "react-router-dom";

function AdoptionItem({ image, name, description, disponible }) {
    const navigate = useNavigate();

    const isTokenValid = () => {
        const token = localStorage.getItem("token"); // Obtiene el token del localStorage
        return !!token; // Verifica si el token existe
    };

    const handleAdoptClick = () => {
        if (isTokenValid()) {
            window.location.href = "https://forms.gle/AcpRe77cbHsrz5EF8";
        } else {
            navigate("/register", {
                state: {
                    message: "Por favor, crea una cuenta para poder adoptar una mascota. O si ya tienes una cuenta, inicia sesión.",
                },
            });
        }
    };

    return (
        <div className="bg-red-100 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl p-6 sm:p-4">
            <div className="relative h-64 sm:h-48">
                <img
                    src={image}
                    alt={`Imagen de ${name}`}
                    className="w-full h-full object-cover rounded-t-3xl"
                />
            </div>
            <div className="p-6 sm:p-4 text-center">
                <h2 className="text-2xl sm:text-xl font-semibold text-gray-800 mb-2">{name}</h2>
                <p className="text-gray-600 text-sm sm:text-xs mb-4">{description}</p>
                <p
                    className={`font-semibold mb-4 ${
                        disponible ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {disponible ? "Disponible para adopción" : "Ya fue adoptado"}
                </p>
                <button
                    onClick={handleAdoptClick}
                    disabled={!disponible}
                    className={`px-6 py-2 text-sm sm:text-xs rounded-full shadow-md ${
                        disponible
                            ? "bg-gradient-to-r from-pink-500 to-red-400 text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                >
                    Adoptar
                </button>
            </div>
        </div>
    );
}

export default AdoptionItem;
