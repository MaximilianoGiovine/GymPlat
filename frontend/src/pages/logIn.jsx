import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LogInStyles.css';

const LogIn = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/login_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);      // Guarda el token aquí
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('user_name', data.name);
                navigate('/dashboard');
            } else {
                setMessage(data.error || 'Credenciales incorrectas');
            }
        } catch (err) {
            setMessage('Error al iniciar sesión');
        }
    };

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/dashboard_data', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Manejar la respuesta de fetch aquí
    };

    return (
        <div className="LogInContainer">
            <h1>Iniciar Sesión</h1>
            <form className="LogInForm" onSubmit={handleSubmit}>
                <div className="FormGroup">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="FormGroup">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LogIn;