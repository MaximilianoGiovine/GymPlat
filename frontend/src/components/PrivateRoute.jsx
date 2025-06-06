// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuth = !!localStorage.getItem('user_id');
    return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;