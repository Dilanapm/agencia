import React, { useState } from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import AdoptionItem from "components/adoption/AdoptionItem";

// Importa las imágenes
import Mascota1Image from "assets/adoption/mascota1.jpg";
import Mascota2Image from "assets/adoption/mascota2.jpg";
import Mascota3Image from "assets/adoption/mascota3.jpg";
import Mascota4Image from "assets/adoption/mascota4.jpg";
import Mascota5Image from "assets/adoption/mascota5.jpg";
import Mascota6Image from "assets/adoption/mascota6.jpg";
import Mascota7Image from "assets/adoption/mascota7.jpg";
import Mascota8Image from "assets/adoption/mascota8.jpg";
import Mascota9Image from "assets/adoption/mascota9.jpg";
import Mascota10Image from "assets/adoption/mascota10.jpg";

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

  const mascotas = [
    {
      id: 1,
      image: Mascota1Image,
      name: "Canelo",
      description: "Un perrito cariñoso y fiel, perfecto para cualquier familia.",
      match: ["familia", "patio", "tranquila", "mediano", "experto"],
    },
    {
      id: 2,
      image: Mascota2Image,
      name: "Luna",
      description: "Es juguetona y le encanta correr al aire libre.",
      match: ["activa", "patio", "grande", "intermedio"],
    },
    {
      id: 3,
      image: Mascota3Image,
      name: "Rocky",
      description: "Un guardián fiel y amigable que ama la compañía.",
      match: ["activa", "niños", "grande", "experto", "otrosAnimales"],
    },
    {
      id: 4,
      image: Mascota4Image,
      name: "Max",
      description: "Un cachorro energético que adora jugar y correr al aire libre. Es perfecto para personas activas que buscan un compañero de aventuras.",
      match: ["activa", "patio", "mucho", "grande", "independiente"],
    },
    {
      id: 5,
      image: Mascota5Image,
      name: "Bella",
      description: "Una cachorra tranquila y cariñosa que disfruta de un ambiente relajado. Ideal para departamentos y personas que buscan una compañía tranquila.",
      match: ["tranquila", "departamento", "pequeño", "principiante"],
    },
    {
      id: 6,
      image: Mascota6Image,
      name: "Charlie",
      description: "Un perro amigable que se lleva bien con niños y le encanta socializar con las personas. Perfecto para familias grandes.",
      match: ["niños", "familia", "patio", "intermedio", "mediano"],
    },
    {
      id: 7,
      image: Mascota7Image,
      name: "Lola",
      description: "Una perrita pequeña y juguetona que se adapta bien a casas pequeñas o departamentos. Le encanta estar acompañada.",
      match: ["departamento", "activa", "sinPatio", "pequeño", "independiente"],
    },
    {
      id: 8,
      image: Mascota8Image,
      name: "Romi",
      description: "Un guardián leal y protector que también es muy cariñoso con su familia. Requiere espacio para moverse y mucha interacción.",
      match:  ["activa", "patio", "mucho", "grande", "experto"],
    },
    {
      id: 9,
      image: Mascota9Image,
      name: "Mimi",
      description: "Una gatita juguetona que adora los espacios pequeños y disfruta de la compañía humana. Perfecta para alguien con poco tiempo disponible.",
      match:  ["tranquila", "departamento", "pequeño", "principiante", "independiente"],
    },
    {
      id: 10,
      image: Mascota10Image,
      name: "Buddy",
      description: "Carácter noble y paciente. Ideal para familias con niños o personas que tienen tiempo para cuidarlo.",
      match: ["niños", "familia", "activa", "mediano", "intermedio"],
    },
  ];

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
  return (
    <Layout>
      <Navbar />
      <div className="pt-36 container mx-auto px-4">
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
                {recommendations.map((mascota) => (
                  <AdoptionItem
                    key={mascota.id}
                    image={mascota.image}
                    name={mascota.name}
                    description={mascota.description}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lista de todas las mascotas */}
        <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6 text-center">
          Todas las Mascotas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AdoptionItem
            image={Mascota1Image}
            name="Canelo"
            description="Un perrito cariñoso y fiel, perfecto para cualquier familia."
          />
          <AdoptionItem
            image={Mascota2Image}
            name="Luna"
            description="Es juguetona y le encanta correr al aire libre."
          />
          <AdoptionItem
            image={Mascota3Image}
            name="Rocky"
            description="Un guardián fiel y amigable que ama la compañía."
          />
            <AdoptionItem
            image={Mascota4Image}
            name="Max"
            description="Un cachorro energético que adora jugar y correr al aire libre. Es perfecto para personas activas que buscan un compañero de aventuras."
          />
            <AdoptionItem
            image={Mascota5Image}
            name="Bella"
            description="Una cachorra tranquila y cariñosa que disfruta de un ambiente relajado. Ideal para departamentos y personas que buscan una compañía tranquila."
          />
            <AdoptionItem
            image={Mascota6Image}
            name="Charlie"
            description="Un perro amigable que se lleva bien con niños y le encanta socializar con las personas. Perfecto para familias grandes."
          />
            <AdoptionItem
            image={Mascota7Image}
            name="Lola"
            description="Una perrita pequeña y juguetona que se adapta bien a casas pequeñas o departamentos. Le encanta estar acompañada."
          />
            <AdoptionItem
            image={Mascota8Image}
            name="Romi"
            description="Un guardián leal y protector que también es muy cariñoso con su familia. Requiere espacio para moverse y mucha interacción."
          />
            <AdoptionItem
            image={Mascota9Image}
            name="Mimi"
            description="Una gatita juguetona que adora los espacios pequeños y disfruta de la compañía humana. Perfecta para alguien con poco tiempo disponible."
          />
            <AdoptionItem
            image={Mascota10Image}
            name="Buddy"
            description="Carácter noble y paciente. Ideal para familias con niños o personas que tienen tiempo para cuidarlo."
          />
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Adoption;
