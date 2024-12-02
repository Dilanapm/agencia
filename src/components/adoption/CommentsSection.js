import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

function CommentsSection({ curiosityId }) {
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");

    const isTokenValid = () => {
        const token = localStorage.getItem("token"); // Verifica si hay token en localStorage
        return !!token; // Retorna true si el token existe
    };

    const fetchComments = async () => {
        try {
            const response = await api.get(
                `/api/curiosities/curiosities-comments/${curiosityId}/comments/`
            );
            setComments(response.data);
        } catch (err) {
            console.error("Error al obtener los comentarios:", err);
        }
    };

    const handleCommentSubmit = async () => {
        if (!isTokenValid()) {
            // Redirige al formulario de registro si el usuario no está autenticado
            navigate("/register", {
                state: {
                    message: "Por favor, inicia sesión o regístrate para dejar un comentario.",
                },
            });
            return;
        }

        try {
            const response = await api.post(
                `/api/curiosities/curiosities-comments/${curiosityId}/comments/`,
                {
                    content: comment,
                }
            );
            setComments([...comments, response.data]); // Actualiza la lista de comentarios
            setComment(""); // Limpia el campo de texto
        } catch (err) {
            console.error("Error al publicar el comentario:", err);
            setError(
                "Hubo un problema al publicar tu comentario. Inténtalo nuevamente."
            );
        }
    };

    useEffect(() => {
        fetchComments();
    }, [curiosityId]);

    return (
        <div className="comments-section bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Comentarios</h2>
            <div className="mb-6">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe tu comentario..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                ></textarea>
                <button
                    onClick={handleCommentSubmit}
                    className="mt-3 px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-200"
                >
                    Publicar Comentario
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="space-y-4">
                {comments.map((c, index) => (
                    <div
                        key={c.id}
                        className={`p-4 rounded-xl shadow-md ${
                            index % 2 === 0
                                ? "bg-blue-100 text-blue-900"
                                : "bg-green-100 text-green-900"
                        }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-700">
                                {c.user.charAt(0).toUpperCase()}
                            </div>
                            <p className="font-semibold">{c.user}</p>
                        </div>
                        <p className="mt-2">{c.content}</p>
                        <span className="text-sm text-gray-500">
                            Publicado recientemente
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentsSection;
