import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Intenciones y respuestas como lo mencionaste
  const intents = [
    {
      tag: "saludo",
      patterns: [
        "Hola",
        "¡Hola!",
        "Buenos días",
        "Buenas tardes",
        "¿Qué tal?",
        "¿Cómo estás?",
        "¿Cómo te va?"
      ],
      responses: [
        "¡Hola! ¿Cómo puedo ayudarte hoy?",
        "¡Hola! ¿En qué te puedo asistir?",
        "¡Hola! ¿Qué tal todo?"
      ]
    },
    {
      tag: "adopcion",
      patterns: [
        "Cómo adopto una mascota",
        "Quiero adoptar una mascota",
        "Dónde puedo adoptar una mascota",
        "Qué debo hacer para adoptar una mascota",
        "Me gustaría adoptar una mascota"
      ],
      responses: [
        "Para adoptar una mascota, primero debes completar nuestro formulario de adopción en el sitio web.",
        "Para iniciar el proceso de adopción, por favor visita nuestra página de adopciones y sigue los pasos.",
        "Puedes adoptar una mascota visitando nuestra sección de adopción, donde podrás llenar una solicitud."
      ]
    },
    {
      tag: "informacion_mascotas",
      patterns: [
        "Qué mascotas están disponibles para adoptar",
        "Qué tipos de mascotas tengo para elegir",
        "Tienen perros disponibles para adopción",
        "Puedo ver las mascotas que están en adopción"
      ],
      responses: [
        "Tenemos varias mascotas disponibles, incluyendo perros, gatos y pequeños roedores. Puedes verlas en nuestra página de adopción.",
        "En nuestra página podrás ver las fotos y descripciones de las mascotas disponibles para adopción.",
        "Sí, tenemos perros, gatos y otras mascotas. Consulta la sección de adopciones para más información."
      ]
    },
    {
      tag: "cuidado_mascotas",
      patterns: [
        "Cómo debo cuidar a mi mascota",
        "Consejos para cuidar a un perro",
        "Cómo alimentar a mi gato",
        "Qué cuidados necesita una mascota",
        "Cuáles son los cuidados básicos para una mascota"
      ],
      responses: [
        "Es importante mantener a tu mascota bien alimentada, darle suficiente ejercicio y llevarla al veterinario regularmente.",
        "Cada tipo de mascota tiene sus necesidades específicas, pero en general, todas necesitan amor, cuidado y atención diaria.",
        "Si tienes un perro, asegúrate de proporcionarle paseos diarios, una alimentación adecuada y mucha atención."
      ]
    },
    {
      tag: "horarios",
      patterns: [
        "Cuáles son los horarios de adopción",
        "A qué hora puedo visitar el centro",
        "Qué horario tienen para adopciones",
        "En qué horario puedo ir a ver las mascotas"
      ],
      responses: [
        "Nuestro horario de adopción es de lunes a viernes de 10:00 AM a 6:00 PM.",
        "Puedes visitar el centro de adopciones entre las 10:00 AM y las 6:00 PM de lunes a viernes.",
        "Las adopciones se realizan en horario de oficina, de lunes a viernes de 10:00 AM a 6:00 PM."
      ]
    },
    {
      tag: "contacto",
      patterns: [
        "Cómo puedo ponerme en contacto",
        "Tienen un número de contacto",
        "Cómo llamo para obtener más información",
        "Dónde puedo enviarte un mensaje",
        "como me puedo contartar",
        "Como tengo mas informacion",
        "tienen un numero de contacto"
      ],
      responses: [
        "Puedes contactarnos por teléfono al +59167677146 o enviarnos un correo electrónico a adopcionLaika@gmail.com.",
        "Si necesitas más información, puedes llamarnos al +59167677146 o escribirnos a adopcionLaika@gmail.com.",
        "Puedes enviarnos un mensaje a través de nuestra página web o llamarnos directamente al número de contacto."
      ]
    }
  ];

  // Manejar el envío del mensaje
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      const lowerMessage = message.toLowerCase();
      let response = "Lo siento, no tengo una respuesta para esa pregunta.";

      // Buscar respuesta en las intenciones
      intents.forEach((intent) => {
        intent.patterns.forEach((pattern) => {
          if (lowerMessage.includes(pattern.toLowerCase())) {
            response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
          }
        });
      });

      // Agregar el mensaje y la respuesta al historial de la conversación
      setChatHistory([...chatHistory, { user: message, bot: response }]);
      setMessage(''); // Limpiar el campo de entrada
    }
  };

  // Cambiar el estado de visibilidad del chatbot
  const toggleChatbot = () => {
    if (isOpen) {
      setChatHistory([]); // Limpiar el historial cuando se cierra el chatbot
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <button className="chatbot-btn" onClick={toggleChatbot}>
        {/* Ruta de la imagen correctamente ajustada */}
        <img src="/static/media/logo_vital.d53fcf43889ec6d5695a.png" alt="Chatbot" />
      </button>
      {isOpen && (
        <div className="chatbox">
          <div className="chat-history">
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <p><strong>Tú:</strong> {chat.user}</p>
                <p><strong>Bot:</strong> {chat.bot}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Escribe una pregunta..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
