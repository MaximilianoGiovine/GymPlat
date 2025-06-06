const DashBoard = () => {
    const userName = localStorage.getItem('user_name') || 'Usuario';

    return (
        <div>
            <h1>Bienvenido, {userName}!</h1>
            <p>¡Acceso solo para usuarios logueados!</p>
        </div>
    );
};

export default DashBoard;