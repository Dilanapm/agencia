import React from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import { Link } from "react-router-dom";
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

  const styles = {
    container: {
      paddingTop: "6rem",
      paddingBottom: "5rem",
      margin: "0 auto",
      maxWidth: "1000px",
      textAlign: "center",
      color: "#333",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "3rem",
      color: "#4A5568",
    },
    curiosityContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "4rem",
      gap: "1.5rem",
    },
    curiosityImage: {
      borderRadius: "1rem",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      width: "90%",
      maxWidth: "500px",
    },
    curiosityContent: {
      maxWidth: "500px",
      textAlign: "left",
    },
    curiosityTitle: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      marginBottom: "0.75rem",
    },
    curiosityDescription: {
      fontSize: "1.125rem",
      color: "#4A5568",
    },
    highlightSection: {
      textAlign: "center",
      marginTop: "4rem",
      padding: "1rem",
      borderRadius: "0.5rem",
      backgroundColor: "#FFE6E6",
    },
    highlightText: {
      color: "#D64545",
      fontWeight: "600",
      fontSize: "1.125rem",
      marginBottom: "1rem",
    },
    button: {
      backgroundColor: "#FF5E57",
      color: "#fff",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "50px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#FF7B70",
    },
  };

  return (
    <Layout>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Curiosidades</h1>
        {curiosities.map((curiosity, index) => (
          <motion.div
            key={index}
            style={{
              ...styles.curiosityContainer,
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={curiosity.image}
              alt={curiosity.title}
              style={styles.curiosityImage}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div style={styles.curiosityContent}>
              <h2 style={styles.curiosityTitle}>{curiosity.title}</h2>
              <p style={styles.curiosityDescription}>{curiosity.description}</p>
            </div>
          </motion.div>
        ))}
        <div style={styles.highlightSection}>
          <p style={styles.highlightText}>
            ¿Te convencieron estas curiosidades y tips? ¡Excelente! El siguiente
            paso es contactarnos.
          </p>
          <Link to="/contact">
            <motion.button
              style={styles.button}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.button.backgroundColor)
              }
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
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
