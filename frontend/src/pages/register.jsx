import { useState } from 'react';
import '../Styles/RegisterStyles.css';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // Puedes incluir surname si tu modelo lo soporta
        const { name, email, password } = form;
        try {
            const res = await fetch('http://localhost:5000/register_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            setMessage(data.message || data.error);
        } catch (err) {
            setMessage('Error al registrar');
        }
    };

    return (
        <div className="RegisterContainer">
            <h1>Registro</h1>
            <form className="RegisterForm" onSubmit={handleSubmit}>
                <div className="FormGroup">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" required onChange={handleChange} />
                </div>
                <div className="FormGroup">
                    <label htmlFor="surname">Apellido:</label>
                    <input type="text" id="surname" name="surname" required onChange={handleChange} />
                </div>
                <div className="FormGroup">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required onChange={handleChange} />
                </div>
                <div className="FormGroup">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required onChange={handleChange} />
                </div>
                <button type="submit">Registrarse</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
export default Register;