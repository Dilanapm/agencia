import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdoptionForm = ({ selectedPet }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre_completo: "",
        correo_electronico: "",
        numero_telefono: "",
        direccion: "",
        experiencia_mascotas: false,
        espacio_suficiente: false,
        motivo_adopcion: "",
        tipo_mascota: selectedPet?.type || "Perro",
        identificacion_oficial: null,
        comprobante_domicilio: null,
        acepto_terminos: false,
        confirmo_veracidad: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/adopcion/crear/", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Formulario enviado exitosamente.");
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert("Error al enviar el formulario.");
        }
    };

    const handleCancel = () => {
        navigate(-1); // Redirige a la página anterior
    };

    return (
        <form onSubmit={handleSubmit} className="bg-pink-100 p-6 rounded-lg shadow-md">
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
                <label className="block font-semibold">Dirección:</label>
                <textarea
                    name="direccion"
                    value={formData.direccion}
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
                <label className="block font-semibold">Tipo de mascota:</label>
                <select
                    name="tipo_mascota"
                    value={formData.tipo_mascota}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                </select>
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
            
            <div className="mb-4">
                <label className="block font-semibold">¿Acepto los términos y condiciones?</label>
                <input
                    type="checkbox"
                    name="acepto_terminos"
                    checked={formData.acepto_terminos}
                    onChange={handleChange}
                />
            </div>
            
            <div className="mb-4">
                <label className="block font-semibold">Confirmo que la información es verdadera:</label>
                <input
                    type="checkbox"
                    name="confirmo_veracidad"
                    checked={formData.confirmo_veracidad}
                    onChange={handleChange}
                />
            </div>
            
            <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-pink-500 text-white px-4 py-2 rounded mt-4"
                >
                    Enviar
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
    );
};

export default AdoptionForm;
