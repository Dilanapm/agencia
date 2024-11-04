import React from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import { Link } from "react-router-dom"; // Asegúrate de que estás usando React Router
import curiosityImage1 from "assets/curiosities/curiosity1.jpg";
import curiosityImage2 from "assets/curiosities/curiosity2.jpg";
import curiosityImage3 from "assets/curiosities/curiosity3.jpg";
import curiosityImage4 from "assets/curiosities/curiosity4.jpg";
import curiosityImage5 from "assets/curiosities/curiosity5.jpg";

import { motion } from "framer-motion";
function Curiosities() {
  const curiosities = [
    {
      title: "Los perros pueden oler enfermedades",
      description:
        "Los perros tienen un sentido del olfato hasta 100,000 veces más sensible que el de los humanos. Pueden detectar enfermedades como el cáncer y la diabetes.",
      image: curiosityImage1,
    },
    {
      title: "Adoptar salva vidas",
      description:
        "Cada año, millones de perros y gatos en refugios esperan una familia. Adoptar un animal no solo le das un hogar, sino que también salvas una vida.",
      image: curiosityImage2,
    },
    {
      title: "Los perros sueñan con sus dueños",
      description:
        "Las investigaciones muestran que los perros sueñan sobre sus actividades diarias, y a menudo sus dueños están presentes en sus sueños.",
      image: curiosityImage3,
    },
    {
      title: "La lealtad de un perro adoptado",
      description:
        "Los perros adoptados suelen mostrar una gratitud y lealtad excepcional hacia sus nuevos dueños por haberles dado una segunda oportunidad.",
      image: curiosityImage4,
    },
    {
      title: "La importancia del ejercicio",
      description:
        "Adoptar un perro te motivará a mantenerte activo. Los perros necesitan caminatas regulares, lo que beneficia tanto a la mascota como al dueño.",
      image: curiosityImage5,
    },
  ];

  return (
    <Layout>
      <Navbar />
      <div className="pt-36 pb-20 container mx-auto px-4">
        {curiosities.map((curiosity, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            } mb-16`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-1/2 flex justify-center">
              <img
                src={curiosity.image}
                alt={curiosity.title}
                className="rounded-xl shadow-lg w-full md:w-4/5"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center mt-6 md:mt-0 md:pl-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {curiosity.title}
              </h2>
              <p className="text-gray-700 text-lg">{curiosity.description}</p>
            </div>
          </motion.div>
        ))}
        {/* Texto de cierre y botón de contacto */}
        <div className="text-center mt-16 mb-8 bg-red-100 p-4 rounded-lg">
          <p className="text-red-600 font-semibold text-lg mb-4">
            ¿Te convencieron estas curiosidades y tips? ¡Excelente! El siguiente
            paso es contactarnos.
          </p>
          <Link to="/contact">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
              Contactarnos
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Curiosities;
