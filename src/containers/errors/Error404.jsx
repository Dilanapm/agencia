import React from "react";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      color: "#333",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    },
    content: {
      maxWidth: "500px",
      padding: "20px",
    },
    title: {
      fontSize: "6rem",
      fontWeight: "700",
      color: "#ff5e57",
      animation: "pulse 1.5s infinite",
    },
    message: {
      fontSize: "1.2rem",
      margin: "10px 0 20px",
      color: "#555",
    },
    button: {
      backgroundColor: "#ff5e57",
      color: "#fff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "50px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#ff7b70",
    },
    illustration: {
      position: "relative",
      marginTop: "40px",
      animation: "float 3s ease-in-out infinite",
    },
    circle: {
      width: "120px",
      height: "120px",
      backgroundColor: "#ff5e57",
      borderRadius: "50%",
      opacity: "0.2",
      position: "absolute",
      top: "20px",
      left: "calc(50% - 60px)",
    },
    ghost: {
      width: "80px",
      height: "80px",
      background: "#fff",
      borderRadius: "50% 50% 0 0",
      position: "relative",
      margin: "0 auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    ghostEyes: {
      position: "absolute",
      top: "35%",
      left: "50%",
      display: "flex",
      gap: "10px",
      transform: "translate(-50%, -50%)",
    },
    eye: {
      width: "12px",
      height: "12px",
      background: "#333",
      borderRadius: "50%",
    },
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <style>
        {`
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}
      </style>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>
          ¡Vaya! La página que estabas buscando no existe.
        </p>
        <button
          style={styles.button}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.button.backgroundColor)
          }
          onClick={handleHomeClick}
        >
          Volver al Inicio ;c
        </button>
        <div style={styles.illustration}>
          <div style={styles.circle}></div>
          <div style={styles.ghost}>
            <div style={styles.ghostEyes}>
              <span style={styles.eye}></span>
              <span style={styles.eye}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;
