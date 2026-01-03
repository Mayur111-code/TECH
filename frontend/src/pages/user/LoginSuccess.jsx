import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const LoginSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const name = searchParams.get('name');
        const email = searchParams.get('email');
        const id = searchParams.get('id');

        if (token) {
            const userData = {
                success: true,
                token,
                user: { id, name, email }
            };

            // 💾 Storage madhe taka
            localStorage.setItem('userInfo', JSON.stringify(userData));
            
            // 🔑 Context update kara
            setUser(userData);
            
            toast.success(`Welcome ${name}!`);
            navigate('/'); // Home la pathva
        } else {
            toast.error('Google Login Failed');
            navigate('/login');
        }
    }, [searchParams, navigate, setUser]);

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
};

export default LoginSuccess;