import { useState, useEffect } from "react";
import api from "api/axiosConfig";
import bell from "../../assets/notifications/bell.png";
import notification from "../../assets/notifications/notification.png"; // Con notificaciones nuevas
import { useNavigate } from "react-router-dom";

const NotificationsDropdown = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("all"); // "all" o "unread"
    const [hasUnread, setHasUnread] = useState(false);
    const [userRole, setUserRole] = useState(""); // Almacena el rol del usuario

    // Alternar visibilidad del menú desplegable
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Obtener notificaciones desde el backend
    const fetchNotifications = async () => {
        try {
            // Obtener el rol del usuario
            const userResponse = await api.get("/api/users/me/");
            const role = userResponse.data.role;
            setUserRole(role);

            // Usar el endpoint según el rol
            const endpoint =
                role === "Cuidador"
                    ? "/api/notifications/user-notifications/"
                    : "/api/notifications/adoptante-notifications/";

            const response = await api.get(endpoint);
            setNotifications(response.data);

            // Verificar si hay notificaciones no leídas
            const unreadExists = response.data.some((notif) => !notif.is_read);
            setHasUnread(unreadExists);
        } catch (error) {
            console.error("Error al obtener notificaciones:", error);
        }
    };

    // Actualizar el estado local de las notificaciones
    const updateNotificationState = (notificationId) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === notificationId ? { ...notif, is_read: true } : notif
            )
        );
        setHasUnread(notifications.some((notif) => !notif.is_read));
    };

    // Función para marcar una notificación como leída
    const markAsRead = async (notificationId) => {
        try {
            await api.put(`/api/notifications/mark-as-read/${notificationId}/`);
            updateNotificationState(notificationId);
        } catch (error) {
            console.error("Error al marcar la notificación como leída:", error);
            alert("No se pudo marcar la notificación como leída. Inténtalo nuevamente.");
        }
    };

    // Función para redirigir a la página de detalles (solo cuidadores)
    const navigateToDetail = (notificationId) => {
        if (userRole === "Cuidador") {
            navigate(`/cuidador/notification-detail/${notificationId}`);
        }
    };

    // Manejar clic en una notificación
    const handleNotificationClick = async (notificationId) => {
        await markAsRead(notificationId);
        navigateToDetail(notificationId);
    };

    // Cargar notificaciones al montar el componente
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Filtrar notificaciones según el estado
    const filteredNotifications =
        filter === "unread"
            ? notifications.filter((notif) => !notif.is_read)
            : notifications;

    return (
        <div className="relative">
            {/* Icono de campana */}
            <img
                src={hasUnread ? notification : bell}
                alt="Notificaciones"
                className="w-8 h-8 cursor-pointer"
                onClick={toggleDropdown}
            />

            {/* Menú desplegable */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg">
                    <div className="p-4">
                        <div className="flex justify-between">
                            <button
                                className={`text-sm ${filter === "all" ? "font-bold" : ""}`}
                                onClick={() => setFilter("all")}
                            >
                                Todas
                            </button>
                            <button
                                className={`text-sm ${filter === "unread" ? "font-bold" : ""}`}
                                onClick={() => setFilter("unread")}
                            >
                                No leídas
                            </button>
                        </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {filteredNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-4 border-b ${
                                    notif.is_read ? "bg-gray-100" : "bg-white"
                                }`}
                            >
                                <div
                                    className="cursor-pointer"
                                    onClick={() => handleNotificationClick(notif.id)}
                                >
                                    <p className="font-bold">{notif.title}</p>
                                    <p>{notif.message}</p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(notif.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredNotifications.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            No tienes notificaciones.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationsDropdown;
