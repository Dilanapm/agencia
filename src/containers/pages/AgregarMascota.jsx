import React, { useEffect, useState } from 'react';
import api from "../../api/axiosConfig";
import SuccessMessage from 'components/SuccessMessage';
function AgregarMascota() {
    const initialFormState = {
        nombre: "",
        foto: null,
        descripcion: "",
        contenido: "",
        colores: [],
        registro_veterinario: null,
        disponible: true,
        categoria: "",
    };
    const [formData, setFormData] = useState(initialFormState);
    const [successMessage, setSuccessMessage] = useState("");
    const [categorias, setCategorias] = useState([]);
    const handleVeterinaryFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            registro_veterinario: file,
        });
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFormData({
                ...formData,
                foto: file,
            });
        } else {
            alert("Por favor, selecciona un archivo de imagen válido (JPG, PNG, etc.)");
        }
    };

    const handleColorChange = (e) => {
        const options = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({
            ...formData,
            colores: options,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Generar slug automáticamente a partir del nombre
        const slug = formData.nombre.trim().toLowerCase().replace(/\s+/g, "-");
    
        const formDataToSend = new FormData();
        formDataToSend.append("nombre", formData.nombre);
        formDataToSend.append("slug", slug);
    
        if (formData.foto) {
            formDataToSend.append("foto", formData.foto);
        }
    
        formDataToSend.append("descripcion", formData.descripcion);
        formDataToSend.append("contenido", formData.contenido);
    
        if (formData.registro_veterinario) {
            formDataToSend.append("registro_veterinario", formData.registro_veterinario);
        }
    
        formDataToSend.append("categoria", formData.categoria);
        formDataToSend.append("color", formData.colores.join(", "));
        formDataToSend.append("disponible", formData.disponible);
    
        try {
            console.log("Datos enviados:", Array.from(formDataToSend.entries()));
            const response = await api.post("/api/mascotas/crear/", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccessMessage("¡Mascota registrada con éxito!");
            setFormData(initialFormState);
        } catch (error) {
            if (error.response) {
                console.error("Error de respuesta:", error.response.data);
                alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error("Error desconocido:", error);
                alert("Error desconocido al registrar la mascota.");
            }
        }
    };
    
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                
                const response = await api.get("/api/mascotas/categorias/");
                setCategorias(response.data.categorias);
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };
        fetchCategorias();
    }, []);

    return (
        <div>
            {successMessage && (
                <SuccessMessage
                    message={successMessage}
                    onClose={() => setSuccessMessage("")}
                />
            )}
            <h1 className="text-2xl font-bold mb-4">Registrar Nueva Mascota</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Foto</label>
                    <input
                        type="file"
                        name="foto"
                        onChange={handleFileChange}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Contenido</label>
                    <textarea
                        name="contenido"
                        value={formData.contenido}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
    <label className="block text-sm font-medium mb-2">Colores</label>
    <div className="grid grid-cols-2 gap-2">
        {[
            { label: "Café", value: "Cafe" },
            { label: "Naranja", value: "Naranja" },
            { label: "Blanco", value: "Blanco" },
            { label: "Plomo", value: "Plomo" },
            { label: "Negro", value: "Negro" },
            { label: "Dorado", value: "Dorado" },
            { label: "Gris", value: "Gris" },
            { label: "Otros", value: "Otros" },
        ].map((color) => (
            <div key={color.value} className="flex items-center">
                <input
                    type="checkbox"
                    name="colores"
                    value={color.value}
                    checked={formData.colores.includes(color.value)}
                    onChange={(e) => {
                        const { value } = e.target;
                        setFormData((prevState) => ({
                            ...prevState,
                            colores: prevState.colores.includes(value)
                                ? prevState.colores.filter((col) => col !== value)
                                : [...prevState.colores, value],
                        }));
                    }}
                    className="mr-2"
                />
                <label>{color.label}</label>
            </div>
        ))}
    </div>
</div>
                <div>
                    <label className="block text-sm font-medium">Registro veterinario si es que tiene</label>
                    <input
                     type="file"
                    name="registro_veterinario"
                    onChange={handleVeterinaryFileChange}
                    className="w-full"
                        />
                </div>
                <div>
    <label className="block text-sm font-medium">Personalidad</label>
    <select
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
    >
        <option value="">Selecciona una categoría</option>
        {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
                {categoria.name}
            </option>
        ))}
    </select>
</div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Registrar Mascota
                </button>
            </form>
        </div>
    );
}

export default AgregarMascota;
