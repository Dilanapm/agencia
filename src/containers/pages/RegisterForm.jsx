import React, { useState } from 'react';
import axios from 'axios';
// import { register } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CSRFToken from 'components/CSRFToken';
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  const location = useLocation();
  const message = location.state?.message;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    re_password: '',
    full_name: '',
    phone: '',
    role: 'Adoptante', // Valor predeterminado
  });

  const [errors, setErrors] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { username, email, password, re_password, full_name, phone, role} = formData;

  const onchange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async(e) => {
    e.preventDefault();
    setErrors({}); // Limpia los errores previos
    const csrftoken = Cookies.get('csrftoken'); // Obtén el CSRF Token de las cookies

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken, // Incluye el CSRF Token en la solicitud
            },
        };

        const body = {
            username,
            email,
            password,
            re_password,
            full_name,
            phone,
            role,
        };
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register/`, body, config);


      if (res.status === 201) {
        setAccountCreated(true); // Cambia el estado para redirigir
    }
  } catch (err) {
      // Maneja los errores del backend y actualiza el estado `errors`
      if (err.response && err.response.data) {
        const backendErrors = err.response.data;
         // Verifica si es un error genérico o un campo específico
         if (backendErrors.error) {
          setErrors({ general: backendErrors.error }); // Error genérico del backend
          } else {
          setErrors(backendErrors); // Si es un error por campo
          }
      } else {
          setErrors({ general: 'Ocurrió un error al procesar tu solicitud. Intenta nuevamente.' });
      }
  }
  }

  if (accountCreated){
    console.log("API URL_react:", process.env.REACT_APP_API_URL);
    return <Navigate to="/Login" />
  }
  


  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="max-w-md w-full p-6 bg-orange-400 rounded-lg shadow-lg">
        <CSRFToken/>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Cuenta</h2>

        {/* Muestra errores generales */}
        {errors.general && <p className="text-red-600 text-center font-semibold">{errors.general}</p>}

        {message && <p className="text-red-600 text-center font-semibold">{message}</p>}
        {/* Campo Nombre de Usuario */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de Usuario
          </label>
          <input
              type="text"
              id="username"
              name="username"
              onChange={onchange}
              value={username}
              placeholder="Usuario"
              required
              className={`w-full px-4 py-2 border-4 ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.username && <p className="text-red-600 font-semibold text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Campo Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onchange}
            value={email}
            placeholder="Correo Electrónico"
            required
            className={`w-full px-4 py-2 border-4
              ${
                errors.email ? 'border-red-500' : 'border-gray-300'
            }
              rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && <p className="text-red-600 font-semibold text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Campo Contraseña */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            onChange={onchange}
            value={password}
            placeholder="Contraseña"
            required
            className={`w-full px-4 py-2 border-4 ${
              errors.password ? 'border-red-500':'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && <p className="text-red-600 font-semibold text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Campo Confirmar Contraseña */}
        <div className="mb-4">
          <label htmlFor="re_password" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="re_password"
            name="re_password"
            onChange={onchange}
            value={re_password}
            placeholder="Confirmar Contraseña"
            required
            className={`w-full px-4 py-2 border-4 ${
              errors.re_password ? 'border-red-500':'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.re_password && <p className="text-red-600 font-semibold text-sm mt-1">{errors.re_password}</p>}
                    <p
                        onClick={togglePasswordVisibility}
                        className="text-blue-600 text-sm mt-2 cursor-pointer hover:underline"
                    >
                        {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    </p>
        </div>

        {/* Campo Nombre Completo */}
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            onChange={onchange}
            value={full_name}
            
            placeholder="Nombre Completo"
            required
            className="w-full px-4 py-2 border-4 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Teléfono */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={onchange}
            value={phone}  
            placeholder="Teléfono"
            className={`w-full px-4 py-2 border-4
              ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
            }
              rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.phone && <p className="text-red-600 font-semibold text-sm mt-1">{errors.phone}</p>}
        </div >
        <div className="flex justify-between mt-4">
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2  bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" >
            Volver
        </button>
        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="px-4 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Crear Cuenta
        </button>
        
        </div>
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

// export default connect(null,{ register })(RegisterForm);
export default RegisterForm;