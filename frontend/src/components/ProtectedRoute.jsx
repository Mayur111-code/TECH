import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminRoute = ({ children }) => {
    const { admin, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    return admin ? children : <Navigate to="/admin/login" />;
};

export const UserRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    return user ? children : <Navigate to="/login" />;
};