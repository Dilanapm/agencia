import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
    const stripe = useStripe(); // Inicializa Stripe
    const elements = useElements(); // Accede a los elementos de la tarjeta
    const [amount, setAmount] = useState(''); // Estado para el monto a pagar
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Estado para el éxito del pago

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Solicitar un PaymentIntent al backend
        const response = await fetch("http://localhost:3001/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: parseFloat(formData.amount) }),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.json();
            })
            .catch((error) => {
              console.error("Fetch error:", error.message);
              alert("Error al conectar con el servidor. Verifica la conexión.");
            });
          

        const { clientSecret } = await response.json(); // Recibir el clientSecret del backend

        // Confirmar el pago con Stripe
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        if (result.error) {
            console.error('Error:', result.error.message); // Manejar errores
        } else if (result.paymentIntent.status === 'succeeded') {
            console.log('¡Pago exitoso!'); // Confirmar éxito del pago
            setIsPaymentSuccessful(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-xl font-bold mb-4">Realizar una donación</h1>
            <label htmlFor="amount" className="block text-sm mb-2">Monto (en USD):</label>
            <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border px-2 py-1 mb-4 w-full"
                required
            />
            <CardElement className="mb-4 p-2 border" /> {/* Campo de tarjeta */}
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={!stripe}
            >
                Donar
            </button>
            {isPaymentSuccessful && (
                <p className="text-green-500 mt-4">¡Gracias por tu donación!</p>
            )}
        </form>
    );
};

export default CheckoutForm;
