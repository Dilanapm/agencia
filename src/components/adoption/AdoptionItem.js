import React from "react";
import { useNavigate } from "react-router-dom";

function AdoptionItem({ image, name, description }) {
    const navigate = useNavigate();

    const isTokenValid = () => {
        const token = localStorage.getItem('token'); // Obtiene el token del localStorage
        return !!token; // Verifica si el token existe
    };

    const handleAdoptClick = () => {
        if (isTokenValid()) {
            // Si el token existe, redirige al formulario de adopción con los datos de la mascota
            navigate('/adoption-form', { state: { selectedPet: { name, type: "Perro" } } });
        } else {
            // Si no hay token, redirige al usuario a la página de registro con un mensaje
            navigate('/register', {
                state: {
                    message: 'Por favor, crea una cuenta para poder adoptar una mascota. O si ya tienes una cuenta, inicia sesión.'
                }
            });
        }
    };

    return (
        <div className="bg-red-100 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl p-6">
            <div className="relative h-64">
                <img
                    src={image}
                    alt={`Imagen de ${name}`}
                    className="w-full h-full object-cover rounded-t-3xl"
                />
            </div>
            <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <button
                    onClick={handleAdoptClick}
                    className="bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                    Adoptar
                </button>
            </div>
        </div>
    );
}

export default AdoptionItem;
