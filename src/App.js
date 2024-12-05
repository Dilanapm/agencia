import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js'; // Importa Elements
import { loadStripe } from '@stripe/stripe-js'; // Importa loadStripe
import Error404 from './containers/errors/Error404';
import Home from './containers/pages/Home';
import RegisterForm from 'containers/pages/RegisterForm';
import Adoption from 'containers/pages/Adoption';
import Donation from 'containers/pages/Donation';
import Curiosities from 'containers/pages/Curiosities';
import Contact from 'containers/pages/Contact';
import LoginForm from 'containers/pages/LoginForm';
import CuidadorDashboard from 'containers/pages/CuidadorDashboard';
import AdminDashboard from 'containers/pages/AdminDashboard';
import UserProfile from 'containers/pages/UserProfile';
import ResetPassword from 'containers/pages/ResetPassword';
import ResetPasswordConfirm from 'containers/pages/ResetPaswordConfirm';
import AgregarMascota from 'containers/pages/AgregarMascota';
// Carga la clave pública de Stripe
import CuidadorLayout from 'components/Cuidador/CuidadorLayout';
import MascotaProfile from 'containers/pages/MascotaProfile';

// Importa el Chatbot
import Chatbot from './components/chatbot/chatbot'; // Asegúrate de tener el Chatbot correctamente importado

// Carga la clave pública de Stripe
const stripePromise = loadStripe('tu-clave-pública-de-Stripe');

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* Rutas del sistema */}
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/adoptar" element={<Adoption />} />
            <Route
              path="/donacion"
              element={
                <Elements stripe={stripePromise}>
                  <Donation />
                </Elements>
              }
            />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/contactar" element={<Contact />} />
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/curiosities" element={<Curiosities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/adoption-form" element={<Adoption />} />
            <Route path="/pass-forget" element={<ResetPassword />} />
            <Route path="/reset-password" element={<ResetPasswordConfirm />} />

            {/* Rutas específicas para el cuidador */}
            <Route path="/cuidador" element={<CuidadorLayout />}>
              <Route index element={<CuidadorDashboard />} />
              <Route path="registrar-mascota" element={<AgregarMascota />} />
              <Route path="mascota/detalle/:id" element={<MascotaProfile />} />
            </Route>
          </Routes>

          {/* Botón flotante del Chatbot visible en todas las páginas */}
          <Chatbot />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
