import React, { useEffect, useState } from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import AdoptionItem from "components/adoption/AdoptionItem";
import api from "api/axiosConfig"; // Importa la configuración de Axios

function Adoption() {
  const [recommendations, setRecommendations] = useState([]);
  const [answers, setAnswers] = useState({
    vivienda: "",
    tiempo: "",
    niños: "",
    actividad: "",
    experiencia: "",
    tamano: "",
    independiente: "",
    otrosAnimales: "",
  });
  const [showRecommendations, setShowRecommendations] = useState(false); // Estado para controlar la visualización

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = () => {
    const results = mascotas
      .map((mascota) => {
        // Calcula cuántas coincidencias tiene cada mascota
        const score = mascota.match.reduce((acc, attr) => {
          return acc + (Object.values(answers).includes(attr) ? 1 : 0);
        }, 0);
        return { ...mascota, score };
      })
      .filter((mascota) => mascota.score > 0) // Solo mascotas con al menos 1 coincidencia
      .sort((a, b) => b.score - a.score) // Ordena por cantidad de coincidencias
      .slice(0, 3); // Toma solo las 3 primeras

    setRecommendations(results);
    setShowRecommendations(true);
  };

  const handleClear = () => {
    setAnswers({
      vivienda: "",
      tiempo: "",
      niños: "",
      actividad: "",
      experiencia: "",
      tamano: "",
      independiente: "",
      otrosAnimales: "",
    });
    setRecommendations([]);
    setShowRecommendations(false);
  };
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
          Ayúdanos a darles una segunda oportunidad a estos adorables amigos
          peludos. ¡Haz clic en "Adoptar" para darle un hogar!
        </p>

            {/* Recomendador */}
        <div className="mb-16 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Encuentra a tu mascota ideal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold">¿Qué tipo de vivienda tienes?</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={answers.vivienda}
                onChange={(e) => handleAnswerChange("vivienda", e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="patio">Casa con patio</option>
                <option value="sinPatio">Casa sin patio</option>
                <option value="departamento">Departamento</option>
              </select>
                

            </div>
            <div>
              <label className="block mb-2 font-bold">¿Cuánto tiempo tienes para cuidar a tu mascota?</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={answers.tiempo}
                onChange={(e) => handleAnswerChange("tiempo", e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="mucho">Más de 3 horas</option>
                <option value="medio">1-3 horas</option>
                <option value="poco">Menos de 1 hora</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">¿Tienes niños en casa?</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={answers.niños}
                onChange={(e) => handleAnswerChange("niños", e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="niños">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">¿Prefieres una mascota activa o tranquila?</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={answers.actividad}
                onChange={(e) => handleAnswerChange("actividad", e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="activa">Activa</option>
                <option value="tranquila">Tranquila</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">Nivel de experiencia con mascotas</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={answers.experiencia}
                onChange={(e) => handleAnswerChange("experiencia", e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="experto">Experto</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">¿Tamaño de mascota?</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={answers.tamano}
                onChange={(e) => handleAnswerChange("tamano", e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Ver Mascotas Recomendadas
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Resultados del recomendador */}
        {showRecommendations && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Mascotas Recomendadas
            </h2>
            {recommendations.length === 0 ? (
              <p className="text-gray-600 text-center">
                No se encontraron mascotas que coincidan con tus respuestas.
              </p>
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
        )}
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
