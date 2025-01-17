import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/contextAuth';
import BackgroundImage from '../assets/BackgroundLogin.jpg'; 
import { FaHome } from 'react-icons/fa';
import Logo from '../../src/assets/Artesanías.png';

export const Register = () => {
    const navigate = useNavigate();
    const { register, notification } = useAuth();
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'administrador',
        phone: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validaciones
        if (!formData.username.trim()) {
            newErrors.username = 'El nombre de usuario es obligatorio';
        }
        if (!formData.email.includes('@')) {
            newErrors.email = 'El correo debe contener "@"';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        if (!/\d/.test(formData.password)) {
            newErrors.password = 'La contraseña debe contener al menos un número';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        if (formData.phone.length < 10) {
            newErrors.phone = 'El número de teléfono debe tener al menos 10 dígitos';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await register(
                    formData.role.toLowerCase(),
                    formData.username,
                    formData.password,
                    formData.email,
                    formData.phone
                );
                
                if (result.success) {
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000); // Muestra la notificación por 2 segundos antes de redirigir
                } else {
                    setNotification('Error al registrar, intenta de nuevo');
                }
            } catch (error) {
                console.error('Error al registrar:', error);
                setNotification('Error al registrar, intenta de nuevo');
            }
        }
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ 
                backgroundImage: `url(${BackgroundImage})`, 
            }}
        >
            <NavLink to="/" className="absolute top-4 left-4">
                <FaHome className="text-darkyellow text-4xl" />
            </NavLink>
            <div className="relative bg-white p-5 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-8 md:mx-16 lg:mx-32">
                <img src={Logo} alt="Logo" className="h-24 w-24 mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>
                {notification && (
                    <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4`} role="alert">
                        <span className="block sm:inline">{notification}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre de Usuario"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="phone">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="phone"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Número de Teléfono"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Confirmar Contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="role">
                            Rol
                        </label>
                        <select
                            id="role"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="administrador">Administrador</option>
                            <option value="comprador">Comprador</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-darkyellow hover:bg-lightyellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Registrarse
                    </button>
                    <p className="mt-4 text-center">
                        ¿Ya tienes una cuenta?{' '}
                        <NavLink to="/SignIn" className="text-darkyellow hover:underline">
                            Inicia sesión
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};
