import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import adoptIcon from "assets/curiosities/curiosity1.jpg";
import donateIcon from "assets/curiosities/curiosity1.jpg";
import curiositiesIcon from "assets/curiosities/curiosity1.jpg";
import contactIcon from "assets/curiosities/curiosity1.jpg";
import dogImage from 'assets/dog_dueno.jpg';
function Home() {
  const features = [
    {
      title: "Adóptame",
      description: "Encuentra un amigo que necesita un hogar lleno de amor.",
      link: "/adoptar",
      buttonText: "Ir a Adopciones",
      icon: adoptIcon,
    },
    {
      title: "Donar",
      description:
        "Contribuye con donaciones para el cuidado de nuestros animales.",
      link: "/donacion",
      buttonText: "Ir a Donaciones",
      icon: donateIcon,
    },
    {
      title: "Curiosidades/Tips",
      description:
        "Aprende datos interesantes y consejos para cuidar a tus mascotas.",
      link: "/curiosidades",
      buttonText: "Ver Curiosidades",
      icon: curiositiesIcon,
    },
    {
      title: "Contáctanos",
      description: "¿Tienes dudas o necesitas ayuda? Contáctanos.",
      link: "/contactar",
      buttonText: "Ir a Contacto",
      icon: contactIcon,
    },
  ];

  return (
    <div className="container mx-auto py-16">
      {/* Hero Section */}
      <section className="bg-red-100 text-center py-20">
        <h1 className="text-5xl font-bold text-red-600">
          ¡Bienvenido a VitalDoggy!
        </h1>
        <p className="text-xl text-gray-700 mt-4">
          Ayudamos a perritos a encontrar un hogar lleno de amor y felicidad.
        </p>
        
<motion.img
  src={dogImage}
  alt="VitalDoggy"
  className="w-full max-w-lg mx-auto mt-8 rounded-lg shadow-lg"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
/>
      </section>
      {/* Misión y Visión Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Nuestra Misión y Visión
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Misión */}
            <motion.div
              className="p-6 bg-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-4">Misión</h3>
              <p className="text-gray-700">
                Rescatar, proteger y rehabilitar a animales en situación de
                vulnerabilidad, brindándoles un hogar y atención integral.
              </p>
            </motion.div>
            {/* Visión */}
            <motion.div
              className="p-6 bg-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-4">Visión</h3>
              <p className="text-gray-700">
                Crear un mundo donde cada animal tenga un hogar seguro, lleno de
                amor y felicidad.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          ¿Cómo podemos ayudarte?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Link to={feature.link}>
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                  {feature.buttonText}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      

      {/* Testimonios Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Testimonios
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="p-6 bg-white rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-600 italic">
              “Adopté a Luna hace 6 meses y ha cambiado mi vida para mejor. ¡El
              equipo de VitalDoggy es increíble!”
            </p>
            <h4 className="text-red-500 font-bold mt-4">- María G.</h4>
          </motion.div>
          <motion.div
            className="p-6 bg-white rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-600 italic">
              “Gracias a VitalDoggy, Rex encontró un hogar lleno de amor. ¡El
              proceso fue sencillo y emocionante!”
            </p>
            <h4 className="text-red-500 font-bold mt-4">- Carlos L.</h4>
          </motion.div>
          <motion.div
            className="p-6 bg-white rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-600 italic">
              “Donar a VitalDoggy me llena de satisfacción. Saber que estoy
              ayudando a estos animales es maravilloso.”
            </p>
            <h4 className="text-red-500 font-bold mt-4">- Sofía R.</h4>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
