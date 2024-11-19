import React, { useState } from 'react';
import axios from 'axios';
import { register } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CSRFToken from 'components/CSRFToken';

const RegisterForm = ({register}) => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    re_password: '',
    full_name: '',
    phone: '',
    role: 'Adoptante', // Valor predeterminado
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const { username, email, password, re_password, full_name, phone, role} = formData;

  const onchange = e => setFormData({...formData, [e.target.name]: e.target.value})


  const onSubmit = e => {
    e.preventDefault();
    if(password === re_password){
      register(username, email, password, re_password, full_name, phone, role);
      setAccountCreated(true);
    }
  }

  if (accountCreated){
    console.log("API URL_react:", process.env.REACT_APP_API_URL);
    return <Navigate to="/Login" />
  }
  


  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={e=> onSubmit(e)} className="max-w-md w-full p-6 bg-orange-400 rounded-lg shadow-lg">
        <CSRFToken/>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Cuenta</h2>

        {/* Campo Nombre de Usuario */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={e => onchange(e)}
            value={username}
            placeholder="Usuario"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={e => onchange(e)}
            value={email}
            
            placeholder="Correo Electrónico"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Contraseña */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={e=>onchange(e)}
            value={password}
            placeholder="Contraseña"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Confirmar Contraseña */}
        <div className="mb-4">
          <label htmlFor="re_password" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            id="re_password"
            name="re_password"
            onChange={e=>onchange(e)}
            value={re_password}
            placeholder="Confirmar Contraseña"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Nombre Completo */}
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            onChange={e => onchange(e)}
            value={full_name}
            
            placeholder="Nombre Completo"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Teléfono */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={e => onchange(e)}
            value={phone}
            
            placeholder="Teléfono"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
        >
          Crear Cuenta
        </button>
        <p className="text-center text-black mt-4">
          ¿Tienes una cuenta?{' '}
          <a href="/Login" className="text-blue-800 hover:underline">
            Iniciar Sesión
          </a>
        </p>

      </form>
    </div>
  );
};

export default connect(null,{ register })(RegisterForm);