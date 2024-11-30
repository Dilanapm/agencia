import React, { useState } from 'react';

function AdoptionForm() {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        correoElectronico: '',
        telefono: '',
        direccion: '',
        experienciaConMascotas: false,
        espacioSuficiente: false,
        motivoAdopcion: '',
        tipoMascota: 'Perro',
        identificacionOficial: null,
        comprobanteDomicilio: null,
        aceptoTerminos: false,
        confirmacion: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }

        fetch('/api/adopcion/formulario/', {
            method: 'POST',
            body: formDataObj,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Formulario enviado:', data);
                alert('Formulario enviado con éxito');
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label>Nombre completo:</label>
                <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />
            </div>
            <div>
                <label>Correo electrónico:</label>
                <input type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} required />
            </div>
            <div>
                <label>Teléfono:</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </div>
            <div>
                <label>Dirección:</label>
                <textarea name="direccion" value={formData.direccion} onChange={handleChange} required></textarea>
            </div>
            <div>
                <label>¿Tienes experiencia previa con mascotas?</label>
                <input type="checkbox" name="experienciaConMascotas" checked={formData.experienciaConMascotas} onChange={handleChange} />
            </div>
            <div>
                <label>¿Tienes espacio suficiente para la mascota?</label>
                <input type="checkbox" name="espacioSuficiente" checked={formData.espacioSuficiente} onChange={handleChange} />
            </div>
            <div>
                <label>Motivo por el cual deseas adoptar:</label>
                <textarea name="motivoAdopcion" value={formData.motivoAdopcion} onChange={handleChange} required></textarea>
            </div>
            <div>
                <label>Tipo de mascota:</label>
                <select name="tipoMascota" value={formData.tipoMascota} onChange={handleChange}>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                </select>
            </div>
            <div>
                <label>Identificación oficial:</label>
                <input type="file" name="identificacionOficial" onChange={handleChange} accept=".pdf,.jpg,.png" required />
            </div>
            <div>
                <label>Comprobante de domicilio:</label>
                <input type="file" name="comprobanteDomicilio" onChange={handleChange} accept=".pdf,.jpg,.png" required />
            </div>
            <div>
                <label>
                    <input type="checkbox" name="aceptoTerminos" checked={formData.aceptoTerminos} onChange={handleChange} required />
                    Acepto los términos y condiciones
                </label>
            </div>
            <div>
                <label>
                    <input type="checkbox" name="confirmacion" checked={formData.confirmacion} onChange={handleChange} required />
                    Confirmo que la información proporcionada es verdadera
                </label>
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
}

export default AdoptionForm;
