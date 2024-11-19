import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import { useState } from "react";
import tresPerrosImage from "assets/adoption/tresperros.jpg";
import qrImage from "assets/adoption/qr.png"; // Asegúrate de que la ruta sea correcta
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QMhK1BxZqvldvODisEvh7vH7OkJwudfS9PkVZGzxyK1EubsafmQM7ts9KjpNk3iiNVR745r1ciPyTZGP4KeLjsS00wdqu02uo"); // Cambia esto con tu clave pública

function Donation() {
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        message: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Estado del pago
    const stripe = useStripe(); // Inicializa Stripe
    const elements = useElements(); // Maneja elementos de la tarjeta

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        if (paymentMethod === "card") {
            if (!stripe || !elements) return;

            // Solicitar un PaymentIntent al backend
            const response = await fetch("http://localhost:3001/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: parseFloat(formData.amount) })
            });

            const { clientSecret } = await response.json();

            // Confirmar el pago con Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.error("Error:", result.error.message); // Manejar errores
                setIsPaymentSuccessful(false);
            } else if (result.paymentIntent.status === "succeeded") {
                console.log("¡Pago exitoso!"); // Confirmar éxito del pago
                setIsPaymentSuccessful(true);
                setIsModalOpen(true); // Abre el modal
            }
        } else {
            setIsModalOpen(true); // Para QR o efectivo
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

    return (
        <Layout>
            <Navbar />
            <div className="flex justify-center items-center py-12 container mx-auto px-4 min-h-screen">
                {/* Imagen de los tres perros al costado */}
                <div className="hidden lg:block w-1/4 text-center">
                    <img src={tresPerrosImage} alt="Tres perros" className="max-w-full h-auto" />
                </div>

                {/* Formulario de donación */}
                <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md max-w-lg w-full mx-4">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Donaciones</h1>
                    <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
                        Ayúdanos a continuar nuestro trabajo de rescate y cuidado de mascotas. Tu contribución marca la diferencia.
                    </p>
                    <form onSubmit={handlePaymentSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Nombre
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                placeholder="Tu nombre" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                                Monto de Donación
                            </label>
                            <input 
                                type="number" 
                                name="amount" 
                                value={formData.amount} 
                                onChange={handleChange} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                placeholder="Monto en Bs" 
                                required 
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Mensaje (opcional)
                            </label>
                            <textarea 
                                name="message" 
                                value={formData.message} 
                                onChange={handleChange} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                placeholder="Escribe un mensaje para nosotros" 
                            />
                        </div>
                        <div className="flex items-center justify-center mb-6">
                            <button 
                                type="button" 
                                onClick={() => setPaymentMethod("card")}
                                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2 ${paymentMethod === "card" ? "bg-blue-600" : ""}`}
                            >
                                <i className="fa fa-lock"></i> Pagar con Tarjeta
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setPaymentMethod("qr")}
                                className={`bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2 ${paymentMethod === "qr" ? "bg-green-600" : ""}`}
                            >
                                <i className="fa fa-lock"></i> Pagar con QR
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setPaymentMethod("cash")}
                                className={`bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2 ${paymentMethod === "cash" ? "bg-yellow-600" : ""}`}
                            >
                                <i className="fa fa-lock"></i> Pagar en Efectivo
                            </button>
                        </div>

                        {paymentMethod === "card" && (
                            <div className="mt-4 transition-opacity duration-500">
                                <h2 className="text-2xl font-bold text-center mb-4">Detalles de la Tarjeta</h2>
                                <CardElement className="border p-2 rounded mb-4" />
                                <div className="flex items-center justify-center">
                                    <button 
                                        type="submit" 
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Confirmar Pago
                                    </button>
                                </div>
                            </div>
                        )}

                        {paymentMethod === "qr" && (
                            <div className="mt-8 text-center transition-opacity duration-500">
                                <h2 className="text-2xl font-bold mb-4">Pagar con QR</h2>
                                <p>Escanea el código QR para realizar la donación</p>
                                <div className="flex justify-center mt-4">
                                    <img src={qrImage} alt="Código QR para donación" className="w-48 h-48" />
                                </div>
                            </div>
                        )}
                        {paymentMethod === "cash" && (
                            <div className="mt-8 text-center transition-opacity duration-500">
                                <h2 className="text-2xl font-bold mb-4">Pago en Efectivo</h2>
                                <p>Para realizar el pago en efectivo, visita nuestras oficinas o uno de nuestros puntos autorizados.</p>
                                <p className="mt-4">¡Muchas gracias por tu apoyo y generosidad!</p>
                                {/* Botón para redirigir a WhatsApp */}
                                <div className="mt-6">
                                    <a
                                        href="https://wa.me/76526162" // Reemplaza con tu número en formato internacional
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Contactanos
                                    </a>
                                </div>
                            </div>
                        )}

                    </form>
                </div>

                {/* Imagen de los tres perros al costado derecho */}
                <div className="hidden lg:block w-1/4 text-center">
                    <img src={tresPerrosImage} alt="Tres perros" className="max-w-full h-auto" />
                </div>
            </div>

            {/* Modal de confirmación de pago */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        {isPaymentSuccessful ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">¡Gracias por tu donación!</h2>
                                <p>Estás ayudando a cambiar la vida de muchas mascotas.</p>
                            </>
                        ) : (
                            <h2 className="text-2xl font-bold mb-4">Hubo un problema con el pago.</h2>
                        )}
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
            
            <Footer />
        </Layout>
    );
}

export default Donation;
