// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import axios from 'axios';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { setUser } = useAuth();
//     const navigate = useNavigate();

//     const handleManualLogin = async (e) => {
//     e.preventDefault();
//     try {
//         const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password });
//         localStorage.setItem('userInfo', JSON.stringify(data));
//         setUser(data);
//         toast.success('Welcome Back!');
        
//         // 🔄 BADAL: Dashboard jagi Home Page
//         navigate('/'); 
//     } catch (err) {
//         toast.error('Invalid Credentials');
//     }
// };
//     const handleGoogleLogin = () => {
//         // Direct backend redirect
//         window.location.href = 'http://localhost:5000/api/user/google';
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-6">
//                 <h2 className="text-2xl font-bold text-center">User Login</h2>
                
//                 <form onSubmit={handleManualLogin} className="space-y-4">
//                     <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
//                     <input type="password" placeholder="Password" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
//                     <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
//                 </form>

//                 <div className="relative flex py-2 items-center">
//                     <div className="flex-grow border-t border-gray-300"></div>
//                     <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
//                     <div className="flex-grow border-t border-gray-300"></div>
//                 </div>

//                 <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 border p-2 rounded hover:bg-gray-50 transition">
//                     <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="google" />
//                     Continue with Google
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Login;


import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // 👈 Link import kara
import { toast } from 'sonner';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleManualLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            toast.success('Welcome Back!');
            navigate('/'); 
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid Credentials');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/api/user/google';
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-slate-900">Login</h2>
                    <p className="text-gray-500 text-sm mt-2">Welcome back to Infina Tech</p>
                </div>
                
                <form onSubmit={handleManualLogin} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                        <input type="email" placeholder="name@company.com" className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
                        <input type="password" placeholder="••••••••" className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all">
                        Sign In
                    </button>
                </form>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">OR</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                </div>

                <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="google" />
                    Continue with Google
                </button>

                {/* 📝 Register Link Path */}
                <div className="text-center pt-4">
                    <p className="text-gray-600 text-sm">
                        Don't have an account? 
                        <Link to="/register" className="text-indigo-600 font-bold hover:underline ml-1">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;