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
            
            
            toast.success(`Welcome back, ${name}!`);

            
            setTimeout(() => {
                navigate('/'); 
            }, 1500); 
            toast.error('Authentication Failed. Please try again.');
            navigate('/login');
        }
    }, [searchParams, navigate, setUser]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
            <div className="relative">
                
                <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
                <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-r-4 border-l-4 border-indigo-500 animate-ping opacity-20"></div>
            </div>
            
            <div className="mt-8 text-center space-y-2">
                <h2 className="text-xl font-black tracking-tight italic">
                    INFINA<span className="text-blue-500">.</span>TECH
                </h2>
                <p className="text-slate-400 text-sm font-medium animate-pulse">
                    Securing your session & syncing profile...
                </p>
            </div>
        </div>
    );
};

export default LoginSuccess;