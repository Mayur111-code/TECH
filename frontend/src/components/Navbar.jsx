import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, LogOut, Settings, ChevronDown, Menu, X, Home, Briefcase, 
  FolderKanban, MessageSquare, Mail, Sparkles, Zap, Star, Layers, Shield, 
  
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // 🔄 Sync User from LocalStorage (Supports all login types)
  const syncUser = () => {
    try {
      const data = localStorage.getItem('user') || localStorage.getItem('userInfo');
      if (data) {
        setUserInfo(JSON.parse(data));
      } else {
        setUserInfo(null);
      }
    } catch (error) {
      console.error('Auth Sync Error:', error);
      setUserInfo(null);
    }
  };

  useEffect(() => {
    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    setShowDropdown(false);
    navigate('/login');
  };

  const getDisplayName = () => {
    if (!userInfo) return null;
    const userObj = userInfo.user || userInfo;
    return userObj.name || userObj.displayName || userInfo.displayName || userInfo.email?.split('@')[0] || "User";
  };

  const displayName = getDisplayName();
  const isAdmin = userInfo?.role === 'admin' || userInfo?.user?.role === 'admin';

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" />, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Services', path: '/services', icon: <Briefcase className="w-4 h-4" />, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Projects', path: '/projects', icon: <FolderKanban className="w-4 h-4" />, gradient: 'from-emerald-500 to-teal-500' },
    { name: 'Blogs', path: '/blogs', icon: <MessageSquare className="w-4 h-4" />, gradient: 'from-amber-500 to-orange-500' },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" />, gradient: 'from-rose-500 to-red-500' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full z-50 top-0 bg-gray-900 border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
  <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden">
    <img 
      src="/logo.jpg" 
      alt="Infina Tech Logo" 
      className="w-full h-full object-cover"
    />
  </div>
  <div className="flex flex-col">
    <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent uppercase">
      INFINA TECH
    </span>
  </div>
</Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold text-sm transition-all ${location.pathname === link.path ? `bg-gradient-to-br ${link.gradient} text-white shadow-lg` : 'text-gray-300 hover:text-white hover:bg-gray-800/50'}`}>
                {link.icon} <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {displayName ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center space-x-3 group">
                  <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-gray-800 group-hover:border-cyan-500 transition-all">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-bold text-white leading-none">{displayName}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">{isAdmin ? 'Admin' : 'Member'}</p>
                  </div>
                  <ChevronDown className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} size={16} />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-3 w-64 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-5 border-b border-gray-800 bg-gray-800/20">
                        <p className="text-sm font-bold text-white truncate">{displayName}</p>
                        <p className="text-xs text-gray-500 truncate">{userInfo.email || userInfo.user?.email}</p>
                      </div>
                      <div className="p-2">
                        {isAdmin && (
                          <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 text-sm text-purple-400 hover:bg-purple-500/10 rounded-xl" onClick={() => setShowDropdown(false)}>
                            <Shield size={16} /> Admin Panel
                          </Link>
                        )}
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2">
                <Zap size={16} /> Login
              </Link>
            )}
            
            <button className="lg:hidden text-gray-300 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Section */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="lg:hidden bg-gray-900 border-t border-gray-800 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${location.pathname === link.path ? `bg-gradient-to-br ${link.gradient} text-white` : 'text-gray-300 hover:bg-gray-800'}`}>
                  {link.icon} <span className="font-semibold">{link.name}</span>
                </Link>
              ))}
              {userInfo && (
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                  <LogOut size={20} /> <span className="font-semibold">Logout</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;