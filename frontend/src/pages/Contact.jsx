import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Contact = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🛡️ Login Check
        if (!user) {
            toast.error("Please login to send an inquiry!");
            return navigate('/login');
        }

        setLoading(true);
        try {
            // Backend la Inquiry pathvane
            // Auth token headers madhe asne garjeche aahe
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };

           const response = await axios.post('http://localhost:5000/api/inquiries', formData, config);

            if (response.data.success) {
                toast.success("Inquiry sent successfully! Admin will contact you soon.");
                setFormData({ subject: '', message: '' });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* 📝 Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Let's Talk!</h1>
                    <p className="text-gray-500 mb-8">
                        Have a project idea or just want to say hi? Fill out the form and our team will get back to you within 24 hours.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-slate-700">
                            <span className="p-3 bg-blue-50 text-blue-600 rounded-full">📍</span>
                            <span>Pune, Maharashtra, India</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-700">
                            <span className="p-3 bg-blue-50 text-blue-600 rounded-full">📧</span>
                            <span>support@infinatech.com</span>
                        </div>
                    </div>
                </motion.div>

                {/* 📩 Form Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input 
                            label="Subject" 
                            placeholder="What is this about?" 
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            required
                        />
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Message</label>
                            <textarea 
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px]"
                                placeholder="Your message here..."
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                required
                            ></textarea>
                        </div>

                        <Button 
                            type="submit" 
                            className={`w-full py-4 text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {loading ? 'Sending...' : 'Send Inquiry'}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;