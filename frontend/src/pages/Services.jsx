import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import * as LucideIcons from 'lucide-react';
import ServiceHero from '../components/Services/ServiceHero';

import API from '../api/api'

const DynamicIcon = ({ name, size = 32, className }) => {
    if (!name) return <LucideIcons.Settings size={size} className={className} />;
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    const IconComponent = LucideIcons[formattedName] || LucideIcons[name]; 
    return IconComponent ? <IconComponent size={size} className={className} /> : <LucideIcons.Settings size={size} className={className} />;
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // const { data } = await axios.get('http://localhost:5000/api/services');

                const { data } = await API.get('/services');

                if (data.success) setServices(data.data);
            } catch (error) {
                toast.error("Failed to load services");
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const colorPalettes = [
        'from-cyan-500 to-blue-600',
        'from-purple-500 to-pink-600',
        'from-emerald-500 to-teal-600',
        'from-amber-500 to-orange-600',
        'from-violet-500 to-indigo-600',
        'from-rose-500 to-fuchsia-600',
        'from-blue-500 to-cyan-600',
        'from-orange-500 to-red-600',
        'from-green-500 to-emerald-600',
        'from-pink-500 to-rose-600'
    ];

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-800 border-t-cyan-500 rounded-full animate-spin mb-8 mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <LucideIcons.Sparkles className="w-8 h-8 text-cyan-400" />
                        </div>
                    </div>
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                    >
                        Discovering Excellence...
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-950 min-h-screen overflow-hidden">
            {/* 🌟 1. Premium 3D Service Hero Section */}
            <ServiceHero />

            {/* ✨ 2. Services Grid Section */}
            <section className="relative py-32 px-6 max-w-7xl mx-auto">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 rounded-full blur-3xl"></div>
                </div>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mb-24 text-center"
                >
                    <div className="inline-flex items-center gap-4 mb-8">
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        <span className="text-cyan-400 font-semibold tracking-widest text-sm uppercase">
                            Our Expertise
                        </span>
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black mb-6">
                        <span className="text-white">Premium</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                            Services
                        </span>
                    </h2>
                    
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Tailored digital solutions designed to transform your business and drive growth
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                    {services.map((service, index) => {
                        const colorClass = colorPalettes[index % colorPalettes.length];
                        
                        return (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                    y: -20,
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                                onHoverStart={() => setHoveredCard(service._id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="relative group"
                            >
                                {/* Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                                
                                {/* Card Container */}
                                <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-xl p-8 rounded-3xl border border-gray-800/50 shadow-2xl shadow-black/30 hover:border-gray-700/50 transition-all duration-300">
                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-500/30 rounded-tl-2xl"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-purple-500/30 rounded-tr-2xl"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-emerald-500/30 rounded-bl-2xl"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-pink-500/30 rounded-br-2xl"></div>
                                    
                                    {/* Icon Container */}
                                    <motion.div
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${colorClass} mb-8 shadow-lg`}
                                    >
                                        <DynamicIcon 
                                            name={service.icon} 
                                            className="text-white w-8 h-8" 
                                        />
                                    </motion.div>
                                    
                                    {/* Service Title */}
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors">
                                        {service.title}
                                    </h3>
                                    
                                    {/* Service Description */}
                                    <p className="text-gray-400 leading-relaxed mb-8">
                                        {service.description}
                                    </p>
                                    
                                    {/* Learn More Button */}
                                    <AnimatePresence>
                                        {hoveredCard === service._id && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="flex items-center gap-3"
                                            >
                                                <span className={`text-sm font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                                                    Explore Service
                                                </span>
                                                <motion.div
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center`}
                                                >
                                                    <LucideIcons.ArrowRight className="w-4 h-4 text-white" />
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    
                                    {/* Hover Indicator */}
                                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${colorClass} rounded-full group-hover:w-3/4 transition-all duration-500`}></div>
                                </div>
                                
                                {/* Floating Number Badge */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center shadow-xl">
                                    <span className="text-cyan-400 font-bold text-lg">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center"
                >
                    <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-[3rem] p-16 border border-gray-800/50 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `radial-gradient(circle at 25% 25%, #06b6d4 2px, transparent 2px)`,
                                backgroundSize: '50px 50px'
                            }}></div>
                        </div>
                        
                        <LucideIcons.Sparkles className="w-16 h-16 text-cyan-400 mx-auto mb-8" />
                        
                        <h3 className="text-4xl font-bold text-white mb-6">
                            Ready to Transform Your Business?
                        </h3>
                        
                        <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
                            Let's discuss how our expertise can drive your digital success
                        </p>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                        >
                            Schedule a Consultation
                        </motion.button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Services;