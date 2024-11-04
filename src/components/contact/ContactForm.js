import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function ContactForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        asunto: '',
        mensaje: '',
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleWhatsAppClick = () => {
        const url = `https://wa.me/59167677146?text=Hola%2C%20mi%20nombre%20es%20${encodeURIComponent(formData.nombre)}.%20${encodeURIComponent(formData.mensaje)}`;
        window.open(url, "_blank");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Enviando...');
        emailjs.send(
            'service_pcl8o7u', // Reemplaza con tu service_id
            'template_kt7tloi', // Reemplaza con tu template_id
            {
                from_name: formData.nombre,
                subject: formData.asunto,
                message: formData.mensaje,
                to_email: 'normantintayalie@gmail.com', // Correo de destino
            },
            'qzh5TmTPPBotMi-rZ' // Reemplaza con tu user_id
        )
        .then((response) => {
            console.log('Correo enviado con éxito', response.status, response.text);
            setStatus('Correo enviado con éxito.');
        })
        .catch((err) => {
            console.error('Error al enviar el correo', err);
            setStatus('Error al enviar el correo. Inténtalo de nuevo.');
        });
    };

    return (
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-200" onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombre"
                placeholder="Tu Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring focus:ring-yellow-300"
                required
            />
            <input
                type="text"
                name="asunto"
                placeholder="Asunto del Mensaje"
                value={formData.asunto}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring focus:ring-yellow-300"
                required
            />
            <textarea
                name="mensaje"
                placeholder="Tu Mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring focus:ring-yellow-300"
                required
            />
            <div className="flex items-center justify-around mt-4">
                <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition font-bold shadow-lg"
                >
                    Contactar por WhatsApp
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition font-bold shadow-lg"
                >
                    Enviar por Correo
                </button>
            </div>
            {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
        </form>
    );
}

export default ContactForm;
