import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

function Header() {
  return (
    <section
      className="py-20 text-center"
      style={{
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4 70%)",
        backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")`, // Cambia esta URL por otro patrón si deseas
      }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-red-600">
        Adoptar un perrito es{" "}
        <Typewriter
          words={[
            "transformador",
            "gratificante",
            "salvar una vida",
            "llenar tu hogar de alegría",
          ]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={100}
          deleteSpeed={100}
          delaySpeed={1000}
        />
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mt-6">
        Rescatar, proteger y rehabilitar perritos en situación de abandono o
        vulnerabilidad.
      </p>
      <Link to="/adoptar">
        <button className="mt-8 mx-auto bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 flex items-center justify-center">
          <span>Comienza Hoy</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3"
            />
          </svg>
        </button>
      </Link>
    </section>
  );
}

export default Header;
