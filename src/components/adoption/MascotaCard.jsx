import React from "react";

function MascotaCard({ mascota, onAdoptClick, showAdoptButton = false }) {
    return (
        <div className="bg-white p-4 sm:p-2 rounded-lg shadow hover:shadow-lg transition-colors duration-300 w-full sm:max-w-xs mx-auto">
            <img
                src={mascota.foto || "/default-image.jpg"}
                alt={mascota.nombre}
                className="w-full h-40 sm:h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg sm:text-base font-bold text-gray-800">{mascota.nombre}</h3>
            <p className="text-sm sm:text-xs text-gray-600">{mascota.descripcion}</p>
            <p className="text-sm sm:text-xs text-gray-500 mt-2">Color: {mascota.color}</p>
            <p className="text-sm sm:text-xs text-gray-500">
                Estado: {mascota.disponible ? "En adopción" : "Ya fue adoptado"}
            </p>
            {showAdoptButton && (
                <button
                    onClick={onAdoptClick}
                    className="bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-2 sm:px-4 sm:py-1 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 mt-4"
                >
                    Adoptar
                </button>
            )}
        </div>
    );
}

export default MascotaCard;
