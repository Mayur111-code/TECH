import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import * as LucideIcons from 'lucide-react';

// 1. Ha Helper Component loop chya baher asu de
const DynamicIcon = ({ name, size = 32, className }) => {
    // 1. Jar name nasel tar default Settings dakhva
    if (!name) return <LucideIcons.Settings size={size} className={className} />;

    // 2. String la PascalCase madhe convert kara (e.g. "smartphone" -> "Smartphone")
    // Pan Lucide icons madhe kahi naav khup vegle astat, mhanun exact naav takne best aahe.
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    const IconComponent = LucideIcons[formattedName] || LucideIcons[name]; 

    if (!IconComponent) {
        return <LucideIcons.Settings size={size} className={className} />;
    }
    return <IconComponent size={size} className={className} />;
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/services');
                if (data.success) {
                    setServices(data.data);
                }
            } catch (error) {
                toast.error("Failed to load services");
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse">Loading Services...</div>;

    return (
        <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">Our Services</h1>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    We offer a wide range of specialized services to help your business scale in the digital world.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                        {/* 🚀 IMAGE TAG KADHUN ITHE ICON VAPARLA AAHE */}
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                            <DynamicIcon 
                                name={service.icon} 
                                className="text-blue-600 group-hover:text-white transition-colors" 
                            />
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;