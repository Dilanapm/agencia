import React, { useState } from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import curiosityImage1 from "assets/curiosities/curiosity1.jpg";
import curiosityImage2 from "assets/curiosities/curiosity2.jpg";
import curiosityImage3 from "assets/curiosities/curiosity3.jpg";
import curiosityImage4 from "assets/curiosities/curiosity4.jpg";
import curiosityImage5 from "assets/curiosities/curiosity5.jpg";

// Datos simulados con contenido de artículo
const curiositiesData = [
  {
    id: 1,
    title: "Los perros pueden oler enfermedades",
    description: `
      Los perros tienen un sentido del olfato hasta 100,000 veces más sensible que el de los humanos. Esto les permite detectar ciertos olores asociados con enfermedades como el cáncer y la diabetes. 
      Recientes investigaciones han demostrado que algunos perros pueden ser entrenados para identificar el aliento o el sudor de personas enfermas con una precisión impresionante.
      
      Esta habilidad no solo demuestra la sorprendente capacidad sensorial de los perros, sino también su potencial para ayudar en el diagnóstico temprano de enfermedades. Tener un perro en casa podría significar mucho más que compañía; ¡podría ser tu mejor aliado para la salud!`,
    image: curiosityImage1,
  },
  {
    id: 2,
    title: "Adoptar salva vidas",
    description: `
      Cada año, millones de perros y gatos en refugios esperan una familia que les dé una segunda oportunidad. Adoptar no solo le proporciona un hogar a un animal, sino que también contribuye a reducir la sobrepoblación en los refugios y, en última instancia, salva vidas.
      
      Muchos perros en los refugios han pasado por situaciones difíciles y anhelan una vida estable y amorosa. Adoptar uno de estos animales no solo les cambia la vida a ellos, sino también a ti, ya que recibirás un amor y lealtad incondicionales.
      
      La adopción es una manera de apoyar a las organizaciones que trabajan por el bienestar animal y contribuyen a la reducción del abandono y el maltrato animal.`,
    image: curiosityImage2,
  },
  {
    id: 3,
    title: "Los perros sueñan con sus dueños",
    description: `
      ¿Sabías que los perros también sueñan? Al igual que los humanos, los perros pasan por ciclos de sueño profundo, en los cuales su cerebro procesa experiencias diarias. Estudios han mostrado que los perros suelen soñar con actividades cotidianas como jugar, correr, o incluso con sus dueños.
      
      Observar a un perro mientras sueña puede ser muy divertido; algunos mueven sus patas como si estuvieran corriendo o hacen pequeños sonidos. Esto es una señal de que están teniendo sueños activos. Los científicos creen que los perros recuerdan sus experiencias y emociones al igual que nosotros, lo que hace que sus sueños sean una extensión de su vida real.`,
    image: curiosityImage3,
  },
  {
    id: 4,
    title: "La lealtad de un perro adoptado",
    description: `
      Los perros que han sido adoptados tienden a mostrar una lealtad excepcional hacia sus nuevos dueños. Quizás sea porque saben que les han dado una segunda oportunidad, o porque aprecian la estabilidad y el cariño que antes no tuvieron. 
      
      Los perros rescatados a menudo demuestran un vínculo fuerte con quienes los adoptan, brindando compañía y afecto constante. Esta lealtad es una recompensa invaluable para quienes eligen adoptar en lugar de comprar, y es algo que muchos dueños de perros adoptados experimentan a diario.`,
    image: curiosityImage4,
  },
  {
    id: 5,
    title: "La importancia del ejercicio",
    description: `
      Adoptar un perro puede ser una excelente motivación para mantenerte activo. Los perros necesitan caminatas y ejercicio diario para mantenerse saludables, lo cual también es beneficioso para sus dueños. Los estudios muestran que los dueños de perros son más propensos a cumplir con sus metas de actividad física.
      
      Tener un perro significa compromiso con su salud y bienestar, y el ejercicio es una parte fundamental. Las caminatas no solo son buenas para el cuerpo, sino también para la mente, tanto del perro como del dueño.`,
    image: curiosityImage5,
  },
];

const tipsData = [
  {
    id: 1,
    title: "Ejercicio regular",
    content: `
      Los perros necesitan ejercicio diario para mantenerse saludables y felices. Las caminatas, el juego activo y el entrenamiento de agilidad son excelentes maneras de mantener a tu perro en forma. Recuerda que el ejercicio ayuda a prevenir problemas de comportamiento, ya que los perros liberan energía de manera positiva y se mantienen mentalmente estimulados.
      
      Asegúrate de adaptar la cantidad y el tipo de ejercicio a la raza, edad y estado de salud de tu perro.`,
  },
  {
    id: 2,
    title: "Alimentación adecuada",
    content: `
      Proporciónales una dieta equilibrada adecuada para su edad y tamaño. Los perros requieren una nutrición que incluya proteínas, grasas saludables, y carbohidratos en proporciones adecuadas. La calidad del alimento afecta directamente su salud, energía y pelaje.
      
      Consulta con tu veterinario para elegir el tipo de alimentación más adecuado para tu mascota, y evita darle alimentos procesados o sobras de la mesa.`,
  },
  {
    id: 3,
    title: "Visitas al veterinario",
    content: `
      Realiza chequeos veterinarios regulares para prevenir enfermedades. Las vacunas, el control de parásitos y los exámenes de salud generales son esenciales para la prevención de enfermedades. No olvides realizar exámenes de rutina para asegurar una vida larga y saludable para tu amigo peludo.
      
      Además, el veterinario puede detectar problemas tempranos y ofrecerte recomendaciones específicas para el cuidado de tu mascota.`,
  },
  {
    id: 4,
    title: "Higiene constante",
    content: `
      Mantén una rutina de limpieza para el pelaje y los dientes de tu mascota. Cepillar su pelaje regularmente ayuda a reducir el pelo suelto y a mantener la piel en buen estado. La higiene bucal es igual de importante; cepilla los dientes de tu perro o proporciona juguetes dentales para evitar la acumulación de sarro.
      
      También es importante limpiar sus oídos y revisar sus patas regularmente para evitar infecciones.`,
  },
];

function Curiosities() {
  const [selectedCuriosity, setSelectedCuriosity] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [viewTips, setViewTips] = useState(false);

  const handleCuriosityClick = (curiosity) => {
    setSelectedCuriosity(curiosity);
    setViewTips(false);
    setComments([]);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className="container mx-auto pt-36 pb-20 text-center">
        <h1 className="text-5xl font-bold mb-12">Curiosidades Caninas</h1>

        <div className="mb-8">
          <button
            onClick={() => {
              setSelectedCuriosity(null);
              setViewTips(false);
            }}
            className={`mx-2 px-4 py-2 rounded-lg ${
              !selectedCuriosity && !viewTips
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Curiosidades
          </button>
          <button
            onClick={() => setViewTips(true)}
            className={`mx-2 px-4 py-2 rounded-lg ${
              viewTips ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Tips de Cuidadores
          </button>
        </div>

        {!selectedCuriosity && !viewTips ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curiositiesData.map((curiosity) => (
              <motion.div
                key={curiosity.id}
                onClick={() => handleCuriosityClick(curiosity)}
                className="cursor-pointer rounded-lg shadow-lg p-4 bg-white"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={curiosity.image}
                  alt={curiosity.title}
                  className="rounded-lg mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">
                  {curiosity.title}
                </h2>
                <p>{curiosity.description.substring(0, 100)}...</p>
              </motion.div>
            ))}
          </div>
        ) : selectedCuriosity ? (
          <div>
            <button
              onClick={() => setSelectedCuriosity(null)}
              className="text-blue-500 underline mb-4"
            >
              ← Volver a Curiosidades
            </button>
            <h2 className="text-3xl font-bold mt-4">
              {selectedCuriosity.title}
            </h2>
            <img
              src={selectedCuriosity.image}
              alt={selectedCuriosity.title}
              className="rounded-lg shadow-lg my-4"
            />
            <p className="text-lg mb-4">{selectedCuriosity.description}</p>

            <div className="comments-section mt-8">
              <h3 className="text-2xl font-semibold mb-4">Comentarios</h3>
              {comments.map((comment, index) => (
                <p key={index} className="bg-gray-100 p-2 rounded mb-2">
                  {comment}
                </p>
              ))}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                rows="3"
                className="w-full border p-2 rounded mb-4"
              ></textarea>
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Publicar Comentario
              </button>
            </div>
          </div>
        ) : viewTips ? (
          <div className="tips-section grid grid-cols-1 md:grid-cols-2 gap-8">
            {tipsData.map((tip) => (
              <motion.div
                key={tip.id}
                className="tip-item bg-gray-100 p-4 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                <p>{tip.content}</p>
              </motion.div>
            ))}
          </div>
        ) : null}

        <div className="text-center mt-16 mb-8 bg-red-100 p-4 rounded-lg">
          <p className="text-red-600 font-semibold text-lg mb-4">
            ¿Te convencieron estas curiosidades y tips? ¡Excelente! El siguiente
            paso es contactarnos.
          </p>
          <Link to="/contact">
            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              Contactarnos
            </motion.button>
          </Link>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Curiosities;
