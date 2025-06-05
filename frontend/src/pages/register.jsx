import '../Styles/RegisterStyles.css';

const Register = () => {
    return (
        <div className="RegisterContainer">
            <h1>Registro</h1>
            <form className="RegisterForm">
                <div className="FormGroup">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="FormGroup">
                    <label htmlFor="surname">Apellido:</label>
                    <input type="text" id="surname" name="surname" required />
                </div>
                <div className="FormGroup">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="FormGroup">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}
export default Register;