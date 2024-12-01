import React, { useState, useEffect } from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Curiosities() {
  const [curiosities, setCuriosities] = useState([]);
  const [tips, setTips] = useState([]);
  const [selectedCuriosity, setSelectedCuriosity] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [viewTips, setViewTips] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const curiositiesResponse = await axios.get(
          "http://127.0.0.1:8000/api/curiosities-list/"
        );
        const tipsResponse = await axios.get(
          "http://127.0.0.1:8000/api/tips/"
        );
        setCuriosities(curiositiesResponse.data);
        setTips(tipsResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos. Por favor, intenta de nuevo.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCuriosityClick = (curiosity) => {
    setSelectedCuriosity(curiosity);
    setViewTips(false);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/curiosities-comments/${selectedCuriosity.id}/comments/`,
          { content: newComment },
          { headers: { Authorization: `Bearer YOUR_AUTH_TOKEN` } }
        );
        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error("Error al enviar el comentario:", error);
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

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
            {curiosities.map((curiosity) => (
              <motion.div
                key={curiosity.id}
                onClick={() => handleCuriosityClick(curiosity)}
                className="cursor-pointer rounded-lg shadow-lg p-4 bg-white"
                whileHover={{ scale: 1.05 }}
              >
                {curiosity.imagen && (
                  <img
                    src={curiosity.imagen}
                    alt={curiosity.title}
                    className="rounded-lg mb-4"
                  />
                )}
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
            {selectedCuriosity.imagen && (
              <img
                src={selectedCuriosity.imagen}
                alt={selectedCuriosity.title}
                className="rounded-lg shadow-lg my-4"
              />
            )}
            <p className="text-lg mb-4">{selectedCuriosity.description}</p>

            <div className="comments-section mt-8">
              <h3 className="text-2xl font-semibold mb-4">Comentarios</h3>
              {comments.map((comment, index) => (
                <p key={index} className="bg-gray-100 p-2 rounded mb-2">
                  {comment.content}
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
            {tips.map((tip) => (
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
      </div>
      <Footer />
    </Layout>
  );
}

export default Curiosities;
