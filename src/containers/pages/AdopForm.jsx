import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SuccessMessage from "components/SuccessMessage";
const AdopForm = () => {
    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] = useState(false);
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        nombre_completo: "",
        correo_electronico: "",
        numero_telefono: "",
        direccion: "",
        experiencia_mascotas: false,
        espacio_suficiente: false,
        motivo_adopcion: "",
        tipo_mascota: "Perro",
        identificacion_oficial: null,
        comprobante_domicilio: null,
        acepto_terminos: true,
        confirmo_veracidad: true,
    });
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    const [loading, setLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const location = useLocation(); // Usar useLocation para obtener los datos pasados con navigate
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/users/me/", {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const { full_name, email, phone } = response.data;
                setFormData((prevData) => ({
                    ...prevData,
                    nombre_completo: full_name || "",
                    correo_electronico: email || "",
                    numero_telefono: phone || "",
                }));
            } catch (error) {
                console.error("Error al obtener datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    useEffect(() => {
        if (shouldRedirect && navigate) {
            navigate("/home");
        }
    }, [shouldRedirect, navigate]);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };
    
    const handleSuccessClose = () => {
        setShowSuccess(false);
        setShouldRedirect(true); // Activa la redirección
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre_completo || !formData.numero_telefono || !formData.motivo_adopcion) {
            alert("Por favor, completa todos los campos obligatorios antes de enviar.");
            return;
        }
        
        setIsSubmitting(true); // Muestra el indicador de carga
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            
            const response = await axios.post("http://127.0.0.1:8000/api/notifications/adopcion/crear/", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${token}`, // Incluye el token en los encabezados
                },
            });
            setShowSuccess(true);
        } catch (error) {
            if (error.response) {
                console.error("Error de respuesta del servidor:", error.response.data);
                alert(error.response.data.error || "Ocurrió un error al enviar el formulario.");
            } else if (error.request) {
                console.error("Error de solicitud al servidor:", error.request);
                alert("No se pudo conectar con el servidor. Intenta nuevamente más tarde.");
            } else {
                console.error("Error desconocido:", error.message);
                alert("Ocurrió un error desconocido. Por favor, inténtalo de nuevo.");
            }
        }
        finally {
            setIsSubmitting(false); // Asegura que siempre se desactiva el estado de carga
        }
    };

    const handleCancel = () => {
        navigate(-1); // Redirige a la página anterior
    };
    if (loading) {
        return <p>Cargando...</p>;
    }


    return (
        <div>
            
            <form onSubmit={handleSubmit} className="bg-pink-100 p-6 rounded-lg shadow-md">
            {showSuccess && <SuccessMessage message="Formulario enviado con éxito, se te enviara una notificacion cuando el cuidador acepte o rechace " onClose={handleSuccessClose} />}
            <h1 className="text-xl font-bold mb-4">Formulario de Adopción</h1>
            
            <div className="mb-4">
                <label className="block font-semibold">Nombre Completo:</label>
                <input
                    type="text"
                    name="nombre_completo"
                    value={formData.nombre_completo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Correo Electrónico:</label>
                <input
                    type="email"
                    name="correo_electronico"
                    value={formData.correo_electronico}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Teléfono:</label>
                <input
                    type="text"
                    name="numero_telefono"
                    value={formData.numero_telefono}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            
            <div className="mb-4">
                <label className="block font-semibold">¿Tienes experiencia con mascotas?</label>
                <input
                    type="checkbox"
                    name="experiencia_mascotas"
                    checked={formData.experiencia_mascotas}
                    onChange={handleChange}
                />
            </div>
            
            <div className="mb-4">
                <label className="block font-semibold">¿Tienes espacio suficiente para la mascota?</label>
                <input
                    type="checkbox"
                    name="espacio_suficiente"
                    checked={formData.espacio_suficiente}
                    onChange={handleChange}
                />
            </div>
            
            <div className="mb-4">
                <label className="block font-semibold">Motivo de adopción:</label>
                <textarea
                    name="motivo_adopcion"
                    value={formData.motivo_adopcion}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            
            <div className="mb-4">
                <label className="block font-semibold">Identificación Oficial:</label>
                <input
                    type="file"
                    name="identificacion_oficial"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            
            <div className="mb-4">
                <label className="block font-semibold">Comprobante de Domicilio:</label>
                <input
                    type="file"
                    name="comprobante_domicilio"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            
            <div className="flex justify-between">
            <button
                type="submit"
                className={`bg-pink-500 text-white px-4 py-2 rounded mt-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 text-black px-4 py-2 rounded mt-4"
                >
                    Cancelar
                </button>
            </div>
        </form>

        </div>
        
    );
};

export default AdopForm;
