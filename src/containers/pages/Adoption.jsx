import React, { useEffect, useState } from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import AdoptionItem from "components/adoption/AdoptionItem";
import api from "api/axiosConfig"; // Importa la configuración de Axios

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
