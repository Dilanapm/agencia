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
            const response = await api.get(`/api/curiosities/curiosities-comments/${curiosityId}/comments/`);
            setComments(response.data);
        } catch (err) {
            console.error("Error al obtener los comentarios:", err);
        }
    };

    const handleCommentSubmit = async () => {
        setError(""); // Limpiar errores previos
        if (!isTokenValid()) {
            navigate("/register", {
                state: {
                    message: "Por favor, inicia sesión o regístrate para dejar un comentario.",
                },
            });
            return;
        }

        try {
            const response = await api.post(`/api/curiosities/curiosities-comments/${curiosityId}/comments/`, {
                content: comment,
            });
            setComments([...comments, response.data]); // Actualiza la lista de comentarios
            setComment(""); // Limpia el campo de texto
        } catch (err) {
            console.error("Error al publicar el comentario:", err);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error); // Muestra el mensaje de error del servidor
            } else {
                setError("Hubo un problema al publicar tu comentario. Inténtalo nuevamente.");
            }
        }
    };

    useEffect(() => {
        fetchComments();
    }, [curiosityId]);

    return (
        <div className="comments-section bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Comentarios</h2>
            <div className="mb-4">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe tu comentario..."
                    className="w-full border rounded p-2 mb-2"
                    rows="4"
                ></textarea>
                <button
                    onClick={handleCommentSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Publicar Comentario
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div>
                {comments.map((c) => (
                    <div key={c.id} className="p-4 mb-2 bg-white rounded shadow-md">
                        <p>
                            <strong className="text-blue-600">{c.user}</strong>: {c.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentsSection;
