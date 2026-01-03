import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/api';
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Shield,
    Sparkles,
    CheckCircle,
    AlertCircle,
    Zap
} from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await API.post('user/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (data.success) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                setUser(data);
                toast.success('🎉 Welcome to INFINATECH! Your account has been created.');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            toast.error(`❌ ${errorMessage}`);

            // Set specific field errors if available
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = formData.password ?
        Math.min(100, formData.password.length * 10) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center p-4">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

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
                                <div className="relative w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/logo.jpg"
                                        alt="Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="text-left">
                                <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    Join INFINATECH
                                </h2>
                                <p className="text-gray-400 text-sm">Start your digital journey</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-6">
                            {[
                                { icon: <Shield className="w-5 h-5" />, text: 'Secure' },
                                { icon: <Zap className="w-5 h-5" />, text: 'Fast' },
                                { icon: <Sparkles className="w-5 h-5" />, text: 'Premium' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="text-indigo-400">{item.icon}</div>
                                    <span className="text-gray-300 text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Name Field */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                <User className="w-4 h-4" />
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3.5 bg-gray-800/30 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all ${errors.name
                                            ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20'
                                            : 'border-gray-700/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20'
                                        }`}
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, name: e.target.value });
                                        if (errors.name) setErrors({ ...errors, name: '' });
                                    }}
                                />
                                <AnimatePresence>
                                    {errors.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.name}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

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
                                    className={`w-full px-4 py-3.5 bg-gray-800/30 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all ${errors.email
                                            ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20'
                                            : 'border-gray-700/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20'
                                        }`}
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        if (errors.email) setErrors({ ...errors, email: '' });
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
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    className={`w-full px-4 py-3.5 bg-gray-800/30 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all pr-12 ${errors.password
                                            ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20'
                                            : 'border-gray-700/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20'
                                        }`}
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        if (errors.password) setErrors({ ...errors, password: '' });
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>

                                {/* Password Strength */}
                                {formData.password && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-3 space-y-2"
                                    >
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400">Password strength</span>
                                            <span className={`font-bold ${passwordStrength < 50 ? 'text-red-400' :
                                                    passwordStrength < 80 ? 'text-amber-400' : 'text-emerald-400'
                                                }`}>
                                                {passwordStrength < 50 ? 'Weak' :
                                                    passwordStrength < 80 ? 'Good' : 'Strong'}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${passwordStrength}%` }}
                                                transition={{ duration: 0.5 }}
                                                className={`h-full ${passwordStrength < 50 ? 'bg-red-500' :
                                                        passwordStrength < 80 ? 'bg-amber-500' : 'bg-emerald-500'
                                                    }`}
                                            />
                                        </div>
                                    </motion.div>
                                )}

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

                        {/* Confirm Password Field */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                <Lock className="w-4 h-4" />
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Re-enter your password"
                                    className={`w-full px-4 py-3.5 bg-gray-800/30 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all pr-12 ${errors.confirmPassword
                                            ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20'
                                            : 'border-gray-700/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20'
                                        }`}
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                        setFormData({ ...formData, confirmPassword: e.target.value });
                                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                <AnimatePresence>
                                    {errors.confirmPassword && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.confirmPassword}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Terms Agreement */}
                        <div className="flex items-start gap-3 p-4 bg-gray-800/20 rounded-xl">
                            <div className="mt-1">
                                <CheckCircle className="w-5 h-5 text-indigo-400" />
                            </div>
                            <p className="text-gray-400 text-sm">
                                By registering, you agree to our
                                <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium ml-1">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">Privacy Policy</a>.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-3 ${isLoading
                                    ? 'bg-gray-800 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl hover:shadow-indigo-500/25'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Premium Account
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <div className="p-8 border-t border-gray-800/50 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-indigo-400 hover:text-indigo-300 font-bold inline-flex items-center gap-1 group"
                            >
                                Sign In
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
                            Your data is encrypted and secure
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;