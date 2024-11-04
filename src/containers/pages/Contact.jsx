import ContactForm from "components/contact/ContactForm"; // Asegúrate de que la ruta coincida con la ubicación exacta
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";

function Contact() {
    return (
        <Layout>
            <Navbar />
            <div className="pt-36 pb-20 container mx-auto px-4 flex flex-col items-center">
                {/* Fondo suave y centrado */}
                <div className="w-full max-w-3xl bg-yellow-100 p-8 rounded-xl shadow-lg relative overflow-hidden">
                    {/* Texto de Introducción */}
                    <h1 className="text-4xl font-bold text-center text-yellow-800 mb-6">¡Contacta con Nosotros!</h1>
                    <p className="text-gray-700 text-center mb-4">
                        Estamos aquí para ayudarte a encontrar un nuevo amigo peludo. Nos puedes contactar a través de WhatsApp o por correo electrónico.
                    </p>
                    <p className="text-gray-700 text-center mb-4">
                        Cuéntanos cómo podemos ayudarte y déjanos tus datos de contacto. ¡Nos encantaría escuchar tu historia!
                    </p>
                    <p className="text-gray-700 text-center mb-8">
                        También puedes escribirnos sobre casos de adopción, abandono o maltrato a nuestro correo: <a href="mailto:normantintayalie@gmail.com" className="text-blue-500 underline">normantintayalie@gmail.com</a>
                    </p>
                    
                    {/* Formulario de Contacto */}
                    <ContactForm />
                </div>
            </div>
            <Footer />
        </Layout>
    );
}

export default Contact;
