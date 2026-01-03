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

        
            localStorage.setItem('userInfo', JSON.stringify(userData));
            
            
            setUser(userData);
            
            toast.success(`Welcome ${name}!`);

           
            window.location.href = "/"; 
        } else {
            toast.error('Google Login Failed');
            navigate('/login');
        }
    }, [searchParams, navigate, setUser]);

    return (
        <div className="h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid mx-auto mb-4"></div>
                <p className="text-slate-600 font-bold animate-pulse">Syncing your profile...</p>
            </div>
        </div>
    );
};

export default LoginSuccess;