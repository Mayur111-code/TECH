import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Shield, 
  Users,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Briefcase
} from 'lucide-react';
import ContactHero from '../components/Contact/ContactHero';


import API from '../api/api'

const Contact = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        category: 'general'
    });
    const [success, setSuccess] = useState(false);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!user) {
    //         toast.error("Please login to send an inquiry!");
    //         navigate('/login');
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         const config = {
    //             headers: { Authorization: `Bearer ${user.token}` }
    //         };

    //         // const response = await axios.post('http://localhost:5000/api/inquiries', formData, config);

    //          const response = await API.post('/inquiries', formData, config);

    //         if (response.data.success) {
    //             toast.success("Inquiry sent successfully!");
    //             setFormData({ subject: '', message: '', category: 'general' });
    //             setSuccess(true);
    //             setTimeout(() => setSuccess(false), 5000);
    //         }
    //     } catch (error) {
    //         toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };






    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        toast.error("Please login to send an inquiry!");
        navigate('/login');
        return;
    }

    setLoading(true);
    try {
        const config = {
            headers: { 
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json' 
            }
        };

        
        const dataToSend = {
            subject: formData.subject, 
            message: formData.message,
            category: formData.category 
        };

        const response = await API.post('/inquiries', dataToSend, config);

        if (response.data.success) {
            toast.success("Inquiry sent successfully!");
            setFormData({ subject: '', message: '', category: 'general' });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        }
    } catch (error) {
        
        console.error("Inquiry Error Details:", error.response?.data);
        toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
        setLoading(false);
    }
};



    const categories = [
        { value: 'general', label: 'General Inquiry', icon: <MessageSquare className="w-4 h-4" /> },
        { value: 'project', label: 'Project Discussion', icon: <Briefcase className="w-4 h-4" /> },
        { value: 'support', label: 'Technical Support', icon: <Shield className="w-4 h-4" /> },
        { value: 'partnership', label: 'Partnership', icon: <Users className="w-4 h-4" /> },
    ];

    return (
        <div className="bg-gradient-to-b from-gray-950 to-black min-h-screen">
            {/* 🌟 1. Hero Section */}
            <ContactHero />

            {/* 📊 2. Main Contact Section */}
            <section className="relative py-32 px-6 max-w-7xl mx-auto">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* 📝 Left Info Panel */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5"
                    >
                        <div className="sticky top-32 space-y-12">
                            {/* Heading */}
                            <div>
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <Sparkles className="w-5 h-5 text-emerald-400" />
                                    <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">
                                        Connect With Us
                                    </span>
                                </div>
                                <h2 className="text-5xl font-black text-white mb-6 leading-tight">
                                    Let's Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Magic</span> Together
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Share your vision with our expert team and let's build something extraordinary that drives real impact.
                                </p>
                            </div>

                            {/* Contact Methods */}
                            <div className="space-y-8">
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-6 p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 transition-all group"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                        <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Visit Us</p>
                                        <p className="text-xl font-bold text-white">Pune, Maharashtra</p>
                                        <p className="text-sm text-gray-500">Headquarters</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-6 p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 transition-all group"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                        <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</p>
                                        <p className="text-xl font-bold text-white">contact@infinatech.com</p>
                                        <p className="text-sm text-gray-500">Response within 24h</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-6 p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 transition-all group"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                        <div className="relative w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <Globe className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Global Support</p>
                                        <p className="text-xl font-bold text-white">24/7 Available</p>
                                        <p className="text-sm text-gray-500">All time zones</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-800/50">
                                {[
                                    { value: '24h', label: 'Response Time', icon: <Clock className="w-4 h-4" /> },
                                    { value: '100%', label: 'Confidential', icon: <Shield className="w-4 h-4" /> }
                                ].map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-3xl font-black text-emerald-400 mb-2">{stat.value}</div>
                                        <div className="text-gray-400 text-sm flex items-center justify-center gap-2">
                                            {stat.icon}
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 📩 Right Form Panel */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-[3rem] border border-gray-800/50 shadow-2xl shadow-black/30 overflow-hidden">
                            {/* Form Header */}
                            <div className="p-8 border-b border-gray-800/50">
                                <h3 className="text-2xl font-bold text-white mb-2">Start Your Project</h3>
                                <p className="text-gray-400">Fill in the details and our team will reach out to you shortly.</p>
                            </div>

                            {/* Form Content */}
                            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                                {/* Category Selection */}
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        Inquiry Type
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.value}
                                                type="button"
                                                onClick={() => setFormData({...formData, category: cat.value})}
                                                className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 ${
                                                    formData.category === cat.value
                                                        ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10'
                                                        : 'bg-gray-900/30 border-gray-700/50 text-gray-400 hover:text-white hover:border-gray-600/50'
                                                }`}
                                            >
                                                <div className={`p-2.5 rounded-lg ${
                                                    formData.category === cat.value
                                                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                                                        : 'bg-gray-800'
                                                }`}>
                                                    {cat.icon}
                                                </div>
                                                <span className="text-xs font-medium">{cat.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-300">Subject</label>
                                    <input 
                                        type="text" 
                                        placeholder="What would you like to discuss?"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        className="w-full px-6 py-4 bg-gray-900/30 border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                        required
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-300">Your Message</label>
                                    <textarea 
                                        rows="6" 
                                        placeholder="Describe your project or inquiry in detail..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className="w-full px-6 py-4 bg-gray-900/30 border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-8">
                                    <AnimatePresence>
                                        {success ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="text-center p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/30"
                                            >
                                                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                                <h4 className="text-xl font-bold text-white mb-2">Inquiry Sent!</h4>
                                                <p className="text-gray-400">Our team will contact you within 24 hours.</p>
                                            </motion.div>
                                        ) : (
                                            <button 
                                                type="submit" 
                                                disabled={loading || !user}
                                                className={`relative w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden group ${
                                                    loading 
                                                        ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                                        : !user
                                                        ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-2xl hover:shadow-emerald-500/25 hover:scale-[1.02]'
                                                }`}
                                            >
                                                <div className="relative z-10 flex items-center justify-center gap-3">
                                                    {loading ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                            Sending...
                                                        </>
                                                    ) : !user ? (
                                                        <>
                                                            Login Required
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Inquiry
                                                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </button>
                                        )}
                                    </AnimatePresence>

                                    {!user && (
                                        <div className="mt-6 text-center">
                                            <p className="text-gray-400 text-sm mb-4">Need to login first?</p>
                                            <button
                                                type="button"
                                                onClick={() => navigate('/login')}
                                                className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                                            >
                                                Login to Continue
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>

            
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-20 px-6 border-t border-gray-800/50"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800 mb-8">
                        <Globe className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">
                            Global Presence
                        </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-6">
                        Serving Clients Worldwide
                    </h3>
                    
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
  {[
    { country: 'India', code: 'in' },
    { country: 'USA', code: 'us' },
    { country: 'UK', code: 'gb' },
    { country: 'Singapore', code: 'sg' },
  ].map(({ country, code }) => (
    <div
      key={country}
      className="p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 transition-all"
    >
      <img
        src={`https://flagcdn.com/w40/${code}.png`}
        alt={country}
        className="mb-2"
      />
      <div className="text-white font-bold">{country}</div>
      <div className="text-gray-400 text-sm">Remote Teams</div>
    </div>
  ))}
</div>


                </div>
            </motion.section>
        </div>
    );
};

export default Contact;