import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/user/register', formData);
            if (data.success) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                setUser(data);
                toast.success('Registration Successful! Welcome to Infina Tech.');
                
                // ✅ Redirecting to Home Page instead of Dashboard
                navigate('/'); 
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-100"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-black text-slate-900">Create Account</h2>
                    <p className="text-gray-500 text-sm mt-2">Join Infina Tech today</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            required 
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@company.com" 
                            className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            required 
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                            required 
                        />
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 transition-all mt-2">
                        Register Now
                    </button>
                </form>

                <div className="text-center pt-4 border-t border-gray-50">
                    <p className="text-gray-600 text-sm">
                        Already have an account? 
                        <Link to="/login" className="text-blue-600 font-bold hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;