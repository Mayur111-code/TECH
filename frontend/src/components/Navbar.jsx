import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, admin, logout } = useAuth();
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'Blogs', path: '/blogs' },
        { name : 'Contact', path : '/contact'}
    ];

    return (
        <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    
                    {/* 🚀 Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-black tracking-tighter text-slate-900">
                            INFINA<span className="text-blue-600">.</span>
                        </span>
                    </Link>

                    {/* 💻 Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Condition-based Buttons */}
                        {admin ? (
                            <div className="flex items-center gap-4">
                                <Link to="/admin/dashboard" className="text-sm font-bold text-blue-600">Admin Panel</Link>
                                <Button onClick={() => logout('admin')} className="bg-red-50 text-red-600 px-4 py-2 text-xs">Logout</Button>
                            </div>
                        ) : user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/dashboard" className="text-sm font-bold text-slate-900">Dashboard</Link>
                                <Button onClick={() => logout('user')} className="bg-gray-100 text-gray-700 px-4 py-2 text-xs">Logout</Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button className="bg-slate-900 text-white px-5 py-2 text-sm">Login</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* 📱 Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* 📱 Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="my-2" />
                            {!user && !admin && (
                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full bg-blue-600 text-white py-3">Login / Register</Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;