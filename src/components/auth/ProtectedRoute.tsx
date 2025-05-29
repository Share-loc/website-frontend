import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user || !user.roles || !user.roles.includes(requiredRole)) {
        return <Navigate to="/login" state={{ from: location}} replace />;
    }

    return <>{children}</>;
};