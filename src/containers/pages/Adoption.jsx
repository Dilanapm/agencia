import React, { useState, useEffect } from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import AdoptionItem from "components/adoption/AdoptionItem";
import api from "api/axiosConfig"; // Importa la configuración de Axios

function Adoption() {
  const [answers, setAnswers] = useState({
    vivienda: "",
    tiempo_cuidado: "",
    niños: "",
    actividad: "",
    experiencia: "",
    tamano: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Maneja los cambios en las respuestas del formulario
  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: question === "niños" ? value === "Sí" : value,
    }));
  };

  // Envía las respuestas al backend y obtiene las recomendaciones
  const handleSubmit = async () => {
    try {
      const response = await api.get("/api/mascotas/recomendar/", {
        params: {
          vivienda: answers.vivienda,
          tiempo_cuidado: answers.tiempo_cuidado,
          niños: answers.niños,
          actividad: answers.actividad,
          experiencia: answers.experiencia,
          tamano: answers.tamano,
        },
      });

      if (response.status === 200) {
        setRecommendations(response.data);
        setError(null);
      } else {
        setRecommendations([]);
        setError("No se encontraron resultados.");
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      setRecommendations([]);
      setError("Error al conectar con el servidor.");
    }
  };

  // Limpia las respuestas y los resultados
  const handleClear = () => {
    setAnswers({
      vivienda: "",
      tiempo_cuidado: "",
      niños: "",
      actividad: "",
      experiencia: "",
      tamano: "",
    });
    setRecommendations([]);
    setError(null);
  };

  // Obtiene la lista completa de mascotas desde el backend
  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await api.get("/api/mascotas/lista/");
        setMascotas(response.data.mascotas || []);
      } catch (err) {
        console.error("Error al cargar mascotas:", err);
        setError(
          "No se pudieron cargar las mascotas. Intenta nuevamente más tarde."
        );
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
        <div className="mb-16 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Cuestionario de Recomendación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold">
                ¿Qué tipo de vivienda tienes?
              </label>
              <select
                value={answers.vivienda}
                onChange={(e) => handleAnswerChange("vivienda", e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecciona</option>
                <option value="patio">Casa con patio</option>
                <option value="sinPatio">Casa sin patio</option>
                <option value="departamento">Departamento</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">
                ¿Cuánto tiempo tienes para cuidar a tu mascota?
              </label>
              <select
                value={answers.tiempo_cuidado}
                onChange={(e) =>
                  handleAnswerChange("tiempo_cuidado", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecciona</option>
                <option value="poco">Menos de 1 hora</option>
                <option value="medio">1-3 horas</option>
                <option value="mucho">Más de 3 horas</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">¿Tienes niños en casa?</label>
              <select
                value={answers.niños ? "Sí" : "No"}
                onChange={(e) => handleAnswerChange("niños", e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="No">No</option>
                <option value="Sí">Sí</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">
                ¿Prefieres una mascota activa o tranquila?
              </label>
              <select
                value={answers.actividad}
                onChange={(e) => handleAnswerChange("actividad", e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecciona</option>
                <option value="activa">Activa</option>
                <option value="tranquila">Tranquila</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">
                ¿Cuál es tu nivel de experiencia con mascotas?
              </label>
              <select
                value={answers.experiencia}
                onChange={(e) =>
                  handleAnswerChange("experiencia", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecciona</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="experto">Experto</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold">
                ¿Qué tamaño de mascota prefieres?
              </label>
              <select
                value={answers.tamano}
                onChange={(e) => handleAnswerChange("tamano", e.target.value)}
                className="w-full p-2 border rounded-lg"
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
        <div>
          {error && <p className="text-red-500">{error}</p>}
          {recommendations.length > 0 && (
                      <div className="mb-16">
                      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Mascotas Recomendadas
                      </h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {recommendations.map((mascota) => (
                <AdoptionItem
                  key={mascota.id}
                  image={mascota.foto || "/default-image.jpg"}
                  name={mascota.nombre}
                  description={mascota.descripcion}
                  disponible={mascota.disponible}
                />
              ))}
            </ul>
            </div>
          )}
        </div>
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
          Todas las Mascotas
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Cargando mascotas...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mascotas.map((mascota) => (
              <AdoptionItem
                key={mascota.id}
                image={mascota.foto || "/default-image.jpg"}
                name={mascota.nombre}
                description={mascota.descripcion}
                disponible={mascota.disponible}
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
