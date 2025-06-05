import '../Styles/LogInStyles.css';

const logIn = () => {
    return (
        <div className="LogInContainer">
        <h1>Iniciar Sesión</h1>
        <form className="LogInForm">
            <div className="FormGroup">
            <label htmlFor="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required />
            </div>
            <div className="FormGroup">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
        </div>
    );
}
export default logIn;