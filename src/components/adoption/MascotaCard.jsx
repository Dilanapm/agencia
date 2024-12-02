import React from "react";
import { useNavigate } from "react-router-dom";

function MascotaCard({ mascota, onAdoptClick, showAdoptButton = false }) {
    const navigate = useNavigate();

    const handleModifyClick = () => {
        navigate(`/cuidador/mascota/detalle/${mascota.id}`);
    };

    // Verificar si el usuario tiene el rol Cuidador
    const isCuidador = localStorage.getItem("role") === "Cuidador";

    return (
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-colors duration-300">
            <img
                src={mascota.foto || "/default-image.jpg"}
                alt={mascota.nombre}
                className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800">{mascota.nombre}</h3>
            <p className="text-sm text-gray-600">{mascota.descripcion}</p>
            <p className="text-sm text-gray-500 mt-2">Color: {mascota.color}</p>
            <p className="text-sm text-gray-500">
                Estado: {mascota.disponible ? "En adopción" : "Ya fue adoptado"}
            </p>
            {showAdoptButton && (
                <button
                    onClick={onAdoptClick}
                    className="bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 mt-4"
                >
                    Adoptar
                </button>
            )}
            {isCuidador && (
                <button
                    onClick={handleModifyClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 mt-4"
                >
                    Modificar Mascota
                </button>
            )}
        </div>
    );
}

export default MascotaCard;
