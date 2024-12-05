import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "api/axiosConfig";

const NotificationDetail = () => {
    const { notificationId } = useParams();
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("El token no está disponible en localStorage.");
            navigate("/login"); // Redirigir al inicio de sesión si no hay token
        }
    }, [navigate]);



    useEffect(() => {
        const fetchNotificationDetails = async () => {
            try {
                const userResponse = await api.get("/api/users/me/");
                const role = userResponse.data.role;
    
                if (role !== "Cuidador") {
                    navigate("/"); // Redirige al inicio si no es cuidador
                } else {
                    setUserRole(role);
                    const notificationResponse = await api.get(`/api/notifications/detalle/${notificationId}/`);
                    setNotification(notificationResponse.data);
                }
            } catch (err) {
                console.error("Error al cargar detalles de la notificación:", err);
                setError("No se pudo cargar la información. Intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchNotificationDetails();
    }, [notificationId, navigate]);
    const handleDecision = async (decision) => {
        try {
            const response = await api.post(
                `/api/notifications/respond-adoption-request/${notificationId}/`,
                { decision }
            );
            alert(`Decisión registrada: ${decision === "aceptar" ? "Aprobado" : "Rechazado"}`);
            navigate(-1); // Redirige a la página anterior
        } catch (err) {
            console.error("Error al enviar la decisión:", err);
            alert("Hubo un problema al procesar tu decisión. Intenta nuevamente.");
        }
    };
    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         navigate("/login");
    //     }
    // }, [navigate]);
    
    const baseUrl = process.env.REACT_APP_API_URL; // Base URL de la API
    const comprobanteUrl = notification.form_data.comprobante_domicilio 
    ? `${baseUrl}/media/comprobantes/${notification.form_data.comprobante_domicilio}` 
    : null;

const identificacionUrl = notification.form_data.identificacion_oficial 
    ? `${baseUrl}/media/identificaciones/${notification.form_data.identificacion_oficial}` 
    : null;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Detalles de la Notificación</h1>
            {notification && (
                <div className="mb-6">
                    <h2 className="font-semibold">Notificación:</h2>
                    <p><strong>Título:</strong> {notification.title}</p>
                    <p><strong>Mensaje:</strong> {notification.message}</p>
                    <p><strong>Fecha:</strong> {new Date(notification.created_at).toLocaleString()}</p>
                </div>
            )}
            {userRole === "Cuidador" && notification && (
                <div>
                    <h2 className="font-semibold">Información del Adoptante:</h2>
                    <p><strong>Nombre Completo:</strong> {notification.form_data.nombre_completo}</p>
                    <p><strong>Email:</strong> {notification.form_data.correo_electronico}</p>
                    <p><strong>Teléfono:</strong> {notification.form_data.numero_telefono}</p>
                    <p><strong>Motivo de Adopción:</strong> {notification.form_data.motivo_adopcion}</p>
                    <h3 className="font-semibold mt-4">Documentos:</h3>
                    <ul className="list-disc ml-6">
    {comprobanteUrl && (
        <li>
            <a
                href={comprobanteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
            >
                Comprobante de Domicilio
            </a>
        </li>
    )}
    {identificacionUrl && (
        <li>
            <a
                href={identificacionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
            >
                Identificación Oficial
            </a>
        </li>
    )}
</ul>
<div className="mt-6">
                        <button
                            onClick={() => handleDecision("aceptar")}
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                        >
                            Aprobar
                        </button>
                        <button
                            onClick={() => handleDecision("rechazar")}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Rechazar
                        </button>
                    </div>
                </div>
            )}
            <button
                onClick={() => navigate(-1)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Volver
            </button>
        </div>
    );
};

export default NotificationDetail;
