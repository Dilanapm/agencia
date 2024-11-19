const express = require('express');
const stripe = require('stripe')('sk_test_51QMhK1BxZqvldvODzZEHKveeFiDrE5G89o11eqEIOaBqK16Rjo4mYedVZZKVG71RJsrYL39cnPtOyboInpdUWykY00Xk1dPgz1'); // Cambia esto por tu clave secreta de Stripe
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Permitir solicitudes desde cualquier origen (útil en desarrollo)

// Ruta para crear un PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body; // Recibir el monto enviado por el cliente
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convertir el monto a centavos (Stripe trabaja en centavos)
            currency: 'usd', // Cambia esto a la moneda que prefieras, como 'bob' para bolivianos
            payment_method_types: ['card'], // Métodos de pago aceptados
        });

        // Enviar el clientSecret al cliente para completar el pago
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

// Inicia el servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
