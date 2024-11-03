import React from "react";

function AdoptionItem({ image, name, description }) {
    const handleAdoptClick = () => {
        window.location.href = "https://forms.gle/AcpRe77cbHsrz5EF8"; // Redirige al formulario de adopción
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
            <img
                src={image}
                alt={`Imagen de ${name}`}
                className="w-full h-64 object-cover"
            />
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{name}</h2>
                <p className="text-gray-700 mb-4">{description}</p>
                <button
                    onClick={handleAdoptClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Adoptar
                </button>
            </div>
        </div>
    );
}

export default AdoptionItem;
