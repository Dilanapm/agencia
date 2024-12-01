import React, { useEffect, useState } from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import AdoptionItem from "components/adoption/AdoptionItem";
import api from "api/axiosConfig"; // Importa la configuración de Axios

// Componente para el cuestionario
function Questionnaire({ onCancel }) {
    const [answers, setAnswers] = useState({
        size: null,
        energy: null,
        personality: null,
    });

    const handleAnswer = (question, value) => {
        setAnswers((prev) => ({
            ...prev,
            [question]: value,
        }));
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-md max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-center mb-4">Sistema de Recomendación</h2>
            <div className="space-y-6">
                {/* Pregunta 1 */}
                <div>
                    <h3 className="font-semibold">Pregunta 1: ¿Qué tamaño de perro prefieres adoptar?</h3>
                    <div className="flex gap-4 mt-3">
                        <button
                            className={`px-4 py-2 rounded-md ${
                                answers.size === "small"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => handleAnswer("size", "small")}
                        >
                            Pequeño
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                answers.size === "medium"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => handleAnswer("size", "medium")}
                        >
                            Mediano
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                answers.size === "large"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => handleAnswer("size", "large")}
                        >
                            Grande
                        </button>
                    </div>
                </div>

                {/* Pregunta 2 */}
                <div>
                    <h3 className="font-semibold">Pregunta 2: ¿Qué nivel de energía buscas en un perro?</h3>
                    <div className="flex gap-4 mt-3">
                        <button
                            className={`px-4 py-2 rounded-md ${
                                answers.energy === "calm"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => handleAnswer("energy", "calm")}
                        >
                            Tranquilo
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                answers.energy === "active"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => handleAnswer("energy", "active")}
                        >
                            Activo
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                answers.energy === "energetic"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => handleAnswer("energy", "energetic")}
                        >
                            Muy energético
                        </button>
                    </div>
                </div>

                {/* Pregunta 3 */}
                <div>
                    <h3 className="font-semibold">Pregunta 3: ¿Qué personalidad prefieres en tu perro?</h3>
                    <div className="flex gap-4 mt-3">
                        <button
                            className={`px-4 py-2 rounded-md ${
                                answers.personality === "affectionate"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => handleAnswer("personality", "affectionate")}
                        >
                            Cariñoso
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                answers.personality === "independent"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => handleAnswer("personality", "independent")}
                        >
                            Independiente
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                answers.personality === "protective"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => handleAnswer("personality", "protective")}
                        >
                            Protector
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <button
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                    Cancelar
                </button>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}

function Adoption() {
    // Estados para mascotas, carga y error
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Llama a la API al montar el componente
    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await api.get("/api/mascotas/lista/");
                setMascotas(response.data.mascotas || []);
            } catch (err) {
                console.error("Error al cargar mascotas:", err);
                setError("No se pudieron cargar las mascotas. Intenta nuevamente más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchMascotas();
    }, []);

    return (
        <Layout>
            <Navbar />
            <div className="pt-36 container mx-auto px-4 mb-5">
                <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
                    Adopción de Mascotas
                </h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Ayúdanos a darles una segunda oportunidad a estos adorables amigos peludos.
                    ¡Haz clic en "Adoptar" para darle un hogar!
                </p>
                {/* Manejando el estado de carga, error y datos */}
                {loading ? (
                    <p className="text-center text-gray-500">Cargando mascotas...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : mascotas.length === 0 ? (
                    <p className="text-center text-gray-500">No hay mascotas disponibles para adopción.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {mascotas.map((mascota) => (
                            <AdoptionItem
                                key={mascota.id}
                                image={mascota.foto || "/default-image.jpg"}
                                name={mascota.nombre}
                                description={mascota.descripcion}
                                disponible={mascota.disponible} // Pasamos la disponibilidad
                            />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </Layout>
    );
}

export default Adoption;
