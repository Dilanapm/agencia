import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

function MascotaProfile() {
    const { id } = useParams(); // Obtener el ID de la mascota desde la URL
    const navigate = useNavigate();
    const initialFormState = {
        nombre: "",
        descripcion: "",
        contenido: "",
        disponible: true,
        foto: null,
        registro_veterinario: null,
    };
    const [formData, setFormData] = useState(initialFormState);
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMascotaData = async () => {
            try {
                const res = await api.get(`/api/mascotas/detalle/${id}/`);
                setFormData(res.data);
            } catch (err) {
                console.error("Error al obtener los detalles de la mascota:", err);
                navigate("/cuidador/dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchMascotaData();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFormData((prevData) => ({
                ...prevData,
                foto: file,
            }));
        } else {
            alert("Por favor, selecciona un archivo de imagen válido (JPG, PNG, etc.)");
        }
    };

    const handleVeterinaryFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            registro_veterinario: file,
        }));
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === "foto" || key === "registro_veterinario") {
                if (value instanceof File) {
                    formDataToSend.append(key, value);
                }
            } else {
                formDataToSend.append(key, value);
            }
        });

        try {
            const res = await api.put(`/api/mascotas/actualizar/${id}/`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccessMessage("Información actualizada con éxito");
            setFormData((prevData) => ({
                ...prevData,
                ...res.data,
            }));
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            } else {
                alert("Error al actualizar la información");
            }
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-600 p-6">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-4 text-orange-600">Detalles de la Mascota</h1>
                {successMessage && (
                    <p className="bg-green-100 text-green-800 p-2 rounded mb-4">{successMessage}</p>
                )}
                <form onSubmit={handleSaveChanges}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.nombre && <p className="text-red-600">{errors.nombre}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.descripcion && <p className="text-red-600">{errors.descripcion}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contenido</label>
                        <textarea
                            name="contenido"
                            value={formData.contenido}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Foto Actual</label>
                        {formData.foto && typeof formData.foto === "string" && (
                            <img
                                src={formData.foto}
                                alt="Foto actual"
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                        )}
                        <label className="block text-gray-700">Cambiar Foto</label>
                        <input
                            type="file"
                            name="foto"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Registro Veterinario</label>
                        <input
                            type="file"
                            name="registro_veterinario"
                            onChange={handleVeterinaryFileChange}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Disponible</label>
                        <input
                            type="checkbox"
                            name="disponible"
                            checked={formData.disponible}
                            onChange={(e) =>
                                setFormData({ ...formData, disponible: e.target.checked })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MascotaProfile;
