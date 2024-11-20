import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

function Header() {
  return (
    <section className="bg-red-100 py-20 text-center">
      <h1 className="text-5xl font-bold text-red-600">
        Adoptar un perrito es{" "}
        <Typewriter
          words={[
            "transformador",
            "gratificante",
            "salvar una vida",
            "llenar tu hogar de alegría",
          ]}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={100}
          deleteSpeed={100}
          delaySpeed={1000}
        />
      </h1>
      <p className="text-lg text-gray-700 mt-4">
        Rescatar, proteger y rehabilitar perritos en situación de abandono o
        vulnerabilidad.
      </p>
      <Link to="/adoptar">
        <button className="mt-8 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600">
          Comienza Hoy
        </button>
      </Link>
    </section>
  );
}

export default Header;
