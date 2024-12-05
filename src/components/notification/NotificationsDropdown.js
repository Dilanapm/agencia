import { useState, useEffect } from "react";
import axios from "axios";
import bell from "../../assets/notifications/bell.png"
import notification from "../../assets/notifications/notification.png"; // Con notificaciones nuevas

const NotificationsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("all"); // "all" o "unread"
    const [hasUnread, setHasUnread] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Fetch notifications from the backend
    const fetchNotifications = async () => {
        try {
            const response = await axios.get("/api/notifications/adoptante-notifications/", {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            });
            setNotifications(response.data);

            // Verificar si hay notificaciones no leídas
            const unreadExists = response.data.some((notif) => !notif.is_read);
            setHasUnread(unreadExists);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    // Mark a notification as read
    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`/api/notifications/mark-as-read/${notificationId}/`, null, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            });
            // Actualiza el estado local
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif.id === notificationId ? { ...notif, is_read: true } : notif
                )
            );
            setHasUnread(notifications.some((notif) => !notif.is_read));
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    // Load notifications on component mount
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Filter notifications based on "all" or "unread"
    const filteredNotifications =
        filter === "unread"
            ? notifications.filter((notif) => !notif.is_read)
            : notifications;

    return (
        <div className="relative">
            {/* Notification Bell */}
            <img
                src={hasUnread ? notification : bell}
                alt="Notificaciones"
                className="w-8 h-8 cursor-pointer"
                onClick={toggleDropdown}
            />

            {/* Dropdown */}
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
                                    onClick={() => markAsRead(notif.id)}
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
