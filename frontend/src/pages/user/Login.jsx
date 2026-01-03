// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom'; // 👈 Link import kara
// import { toast } from 'sonner';
// import axios from 'axios';

// import API from '../../api/api';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { setUser } = useAuth();
//     const navigate = useNavigate();

//     const handleManualLogin = async (e) => {
//         e.preventDefault();
//         try {
//             // const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password });

//             const { data } = await API.post('user/login', {email, password});

//             localStorage.setItem('userInfo', JSON.stringify(data));
//             setUser(data);
//             toast.success('Welcome Back!');
//             navigate('/'); 
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Invalid Credentials');
//         }
//     };

//     const handleGoogleLogin = () => {
//         window.location.href = 'http://localhost:5000/api/user/google';
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
//             <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-100">
//                 <div className="text-center">
//                     <h2 className="text-3xl font-black text-slate-900">Login</h2>
//                     <p className="text-gray-500 text-sm mt-2">Welcome back to Infina Tech</p>
//                 </div>
                
//                 <form onSubmit={handleManualLogin} className="space-y-4">
//                     <div>
//                         <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
//                         <input type="email" placeholder="name@company.com" className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div>
//                         <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
//                         <input type="password" placeholder="••••••••" className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all">
//                         Sign In
//                     </button>
//                 </form>

//                 <div className="relative flex py-2 items-center">
//                     <div className="flex-grow border-t border-gray-100"></div>
//                     <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">OR</span>
//                     <div className="flex-grow border-t border-gray-100"></div>
//                 </div>

//                 <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700">
//                     <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="google" />
//                     Continue with Google
//                 </button>

//                 {/* 📝 Register Link Path */}
//                 <div className="text-center pt-4">
//                     <p className="text-gray-600 text-sm">
//                         Don't have an account? 
//                         <Link to="/register" className="text-indigo-600 font-bold hover:underline ml-1">
//                             Register here
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;



import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield,
  Sparkles,
  LogIn,
  AlertCircle,
  CheckCircle,
  Globe,
  User
} from 'lucide-react';
import API from '../../api/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format';
        }
        
        if (!password) {
            newErrors.password = 'Password is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleManualLogin = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await API.post('user/login', { email, password });

            if (data.success) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                setUser(data);
                
                toast.success('🎉 Welcome back to INFINATECH!');
                
                // Add success animation before navigation
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid credentials';
            toast.error(`❌ ${errorMessage}`);
            
            // Set specific field errors if available
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/api/user/google';
    };

    const handleForgotPassword = () => {
        // Implement forgot password logic here
        toast.info('Password reset feature coming soon!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center p-4">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
                
                {/* Floating Particles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] h-[1px] bg-indigo-400 rounded-full"
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 100 - 50, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.1
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative w-full max-w-md z-10"
            >
                {/* Premium Card */}
                <div className="bg-gradient-to-b from-gray-900/60 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl shadow-black/50 overflow-hidden">
                    {/* Header */}
                    <div className="p-8 text-center border-b border-gray-800/50">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-md"></div>
                                <div className="relative w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="text-left">
                                <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    Welcome Back
                                </h2>
                                <p className="text-gray-400 text-sm">Access your digital workspace</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-6">
                            {[
                                { icon: <Shield className="w-5 h-5" />, text: 'Secure' },
                                { icon: <Globe className="w-5 h-5" />, text: 'Global' },
                                { icon: <User className="w-5 h-5" />, text: 'Personal' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="text-indigo-400">{item.icon}</div>
                                    <span className="text-gray-300 text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleManualLogin} className="p-8 space-y-6">
                        {/* Email Field */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`w-full px-4 py-3.5 bg-gray-800/30 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all ${
                                        errors.email 
                                            ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20' 
                                            : 'border-gray-700/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20'
                                    }`}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({...errors, email: ''});
                                    }}
                                />
                                <AnimatePresence>
                                    {errors.email && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.email}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                    <Lock className="w-4 h-4" />
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-colors"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-3.5 bg-gray-800/30 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all pr-12 ${
                                        errors.password 
                                            ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20' 
                                            : 'border-gray-700/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20'
                                    }`}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({...errors, password: ''});
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                <AnimatePresence>
                                    {errors.password && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.password}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-indigo-500/50"
                            />
                            <label htmlFor="remember" className="text-gray-300 text-sm font-medium">
                                Remember this device
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-3 ${
                                isLoading 
                                    ? 'bg-gray-800 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl hover:shadow-indigo-500/25'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Access Dashboard
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="px-8">
                        <div className="relative flex items-center">
                            <div className="flex-grow border-t border-gray-800/50"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-xs font-bold uppercase tracking-widest">OR</span>
                            <div className="flex-grow border-t border-gray-800/50"></div>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="p-8 pt-6 space-y-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-all group"
                        >
                            <div className="w-6 h-6 flex items-center justify-center">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                            </div>
                            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                                Continue with Google
                            </span>
                        </motion.button>
                    </div>

                    {/* Footer */}
                    <div className="p-8 border-t border-gray-800/50 text-center">
                        <p className="text-gray-400 text-sm">
                            New to INFINATECH?{' '}
                            <Link 
                                to="/register" 
                                className="text-indigo-400 hover:text-indigo-300 font-bold inline-flex items-center gap-1 group"
                            >
                                Create an account
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 backdrop-blur-sm rounded-full">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-400 text-xs font-medium">
                            Secure encrypted connection
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;