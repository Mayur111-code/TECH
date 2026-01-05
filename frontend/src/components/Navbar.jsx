// import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { 
//   User, 
//   LogOut, 
//   Settings, 
//   ChevronDown, 
//   Menu, 
//   X, 
//   Home, 
//   Briefcase, 
//   FolderKanban, 
//   MessageSquare, 
//   Mail,
//   Sparkles,
//   Search,
//   Globe,
//   Shield,
//   Zap,
//   Star,
//   Layers
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userInfo, setUserInfo] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeHover, setActiveHover] = useState(null);
//   const dropdownRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   // Initialize user info safely
//   useEffect(() => {
//     try {
//       const storedUserInfo = localStorage.getItem('userInfo');
//       if (storedUserInfo) {
//         const parsedInfo = JSON.parse(storedUserInfo);
//         setUserInfo(parsedInfo);
//       }
//     } catch (error) {
//       console.error('Error parsing user info:', error);
//       localStorage.removeItem('userInfo');
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     setUserInfo(null);
//     setShowDropdown(false);
//     navigate('/login');
//   };

//   // Safely get display name
//   const getDisplayName = () => {
//     if (!userInfo) return "Guest";
//     const user = userInfo.user || userInfo;
//     if (typeof user === 'string') return user;
//     if (typeof user === 'object' && user !== null) {
//       return user.name || user.username || user.email?.split('@')[0] || "User";
//     }
//     return "User";
//   };

//   const displayName = getDisplayName();
//   const isAdmin = userInfo?.role === 'admin' || userInfo?.user?.role === 'admin';

//   // Menu Items with enhanced data
//   const navLinks = [
//     { 
//       name: 'Home', 
//       path: '/', 
//       icon: <Home className="w-4 h-4" />,
//       gradient: 'from-blue-500 to-cyan-500'
//     },
//     { 
//       name: 'Services', 
//       path: '/services', 
//       icon: <Briefcase className="w-4 h-4" />,
//       gradient: 'from-purple-500 to-pink-500'
//     },
//     { 
//       name: 'Projects', 
//       path: '/projects', 
//       icon: <FolderKanban className="w-4 h-4" />,
//       gradient: 'from-emerald-500 to-teal-500'
//     },
//     { 
//       name: 'Blogs', 
//       path: '/blogs', 
//       icon: <MessageSquare className="w-4 h-4" />,
//       gradient: 'from-amber-500 to-orange-500'
//     },
//     { 
//       name: 'Contact', 
//       path: '/contact', 
//       icon: <Mail className="w-4 h-4" />,
//       gradient: 'from-rose-500 to-red-500'
//     },
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Toggle menu"]')) {
//         setIsMobileMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setShowDropdown(false);
//     setActiveHover(null);
//   }, [location.pathname]);

//   return (
//     <nav className="fixed w-full z-50 top-0 bg-gray-900 border-b border-gray-800/50 shadow-2xl shadow-black/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
          
//           {/* Premium Logo */}
//           <Link to="/" className="flex items-center space-x-3 group">
//             <motion.div
//               whileHover={{ rotate: 10, scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative"
//             >
//               <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/20">
//                 <Sparkles className="w-6 h-6 text-white" />
//               </div>
//               <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
//             </motion.div>
//             <div className="flex flex-col">
//               <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 INFINATECH
//               </span>
//               <span className="text-xs font-medium text-gray-400 tracking-wider">
//                 DIGITAL EXCELLENCE
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-2 relative">
//             {navLinks.map((link) => {
//               const isActive = location.pathname === link.path;
//               return (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className="relative"
//                   onMouseEnter={() => setActiveHover(link.name)}
//                   onMouseLeave={() => setActiveHover(null)}
//                 >
//                   <div className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 group ${
//                     isActive 
//                       ? `bg-gradient-to-br ${link.gradient} text-white shadow-lg`
//                       : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
//                   }`}>
//                     <div className={`p-2 rounded-lg ${
//                       isActive 
//                         ? 'bg-white/20' 
//                         : 'bg-gray-800/50 group-hover:bg-gradient-to-br group-hover:from-white/10'
//                     }`}>
//                       {link.icon}
//                     </div>
//                     <span className="font-semibold text-sm tracking-wide">{link.name}</span>
//                     {isActive && (
//                       <motion.div
//                         layoutId="active-nav"
//                         className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"
//                       />
//                     )}
//                   </div>
                  
//                   {/* Hover Effect */}
//                   <AnimatePresence>
//                     {activeHover === link.name && !isActive && (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         className={`absolute inset-0 bg-gradient-to-br ${link.gradient} rounded-xl blur-lg opacity-20 -z-10`}
//                       />
//                     )}
//                   </AnimatePresence>
//                 </Link>
//               );
//             })}

            
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-4" ref={mobileMenuRef}>
//             {/* Premium CTA Button */}
//             {!userInfo && (
//               <Link
//                 to="/login"
//                 className="hidden lg:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 group"
//               >
//                 <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//                 Get Started
//                 <Star className="w-4 h-4 ml-1 opacity-60" />
//               </Link>
//             )}

//             {userInfo ? (
//               <div className="relative" ref={dropdownRef}>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className="flex items-center space-x-3 group"
//                 >
//                   <div className="relative">
//                     <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-cyan-500/20">
//                       {displayName.charAt(0).toUpperCase()}
//                     </div>
//                     {isAdmin && (
//                       <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full border-2 border-gray-900 flex items-center justify-center">
//                         <Shield className="w-3 h-3 text-white" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="hidden xl:flex flex-col items-start">
//                     <span className="text-sm font-bold text-white">{displayName}</span>
//                     <span className="text-xs text-gray-400">
//                       {isAdmin ? 'Administrator' : 'Premium Member'}
//                     </span>
//                   </div>
//                   <ChevronDown 
//                     size={18} 
//                     className={`text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
//                   />
//                 </motion.button>

//                 <AnimatePresence>
//                   {showDropdown && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 border border-gray-800/50 overflow-hidden"
//                     >
//                       {/* User Info */}
//                       <div className="p-5 border-b border-gray-800/50">
//                         <div className="font-bold text-white text-lg">{displayName}</div>
//                         <div className="text-sm text-gray-400 truncate">
//                           {userInfo?.email || userInfo?.user?.email || 'Premium Member'}
//                         </div>
//                         {isAdmin && (
//                           <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full">
//                             <Shield className="w-3 h-3 text-purple-400" />
//                             <span className="text-xs font-bold text-purple-300">ADMIN</span>
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Menu Items */}
//                       <div className="p-2">
//                         <Link 
//                           to="/profile" 
//                           className="flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-xl text-sm text-gray-200 transition-all group/item"
//                           onClick={() => setShowDropdown(false)}
//                         >
//                           <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg group-hover/item:from-cyan-500/30 group-hover/item:to-blue-500/30">
//                             <User className="w-4 h-4 text-cyan-400" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="font-medium">My Profile</div>
//                             <div className="text-xs text-gray-500">Personal settings</div>
//                           </div>
//                           <ChevronDown className="w-4 h-4 text-gray-600 transform -rotate-90" />
//                         </Link>
                        
//                         <Link 
//                           to="/dashboard" 
//                           className="flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-xl text-sm text-gray-200 transition-all group/item"
//                           onClick={() => setShowDropdown(false)}
//                         >
//                           <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg">
//                             <Layers className="w-4 h-4 text-emerald-400" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="font-medium">Dashboard</div>
//                             <div className="text-xs text-gray-500">Projects & analytics</div>
//                           </div>
//                         </Link>

//                         <Link 
//                           to="/settings" 
//                           className="flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-xl text-sm text-gray-200 transition-all group/item"
//                           onClick={() => setShowDropdown(false)}
//                         >
//                           <div className="p-2 bg-gray-800/50 rounded-lg group-hover/item:bg-gray-700/50">
//                             <Settings className="w-4 h-4 text-gray-400" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="font-medium">Settings</div>
//                             <div className="text-xs text-gray-500">Preferences & privacy</div>
//                           </div>
//                         </Link>
//                       </div>
                      
//                       {/* Logout Button */}
//                       <div className="border-t border-gray-800/50 p-2">
//                         <button 
//                           onClick={handleLogout}
//                           className="flex items-center space-x-3 p-3 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 rounded-xl text-sm text-red-400 transition-all w-full group/item"
//                         >
//                           <div className="p-2 bg-red-500/10 rounded-lg group-hover/item:bg-red-500/20">
//                             <LogOut className="w-4 h-4" />
//                           </div>
//                           <div className="flex-1 text-left">
//                             <div className="font-medium">Logout</div>
//                             <div className="text-xs text-red-500/70">Sign out from account</div>
//                           </div>
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <Link 
//                 to="/login" 
//                 className="lg:hidden px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl"
//               >
//                 Login
//               </Link>
//             )}

//             {/* Mobile Menu Toggle */}
//             <button
//               className="lg:hidden p-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMobileMenuOpen ? (
//                 <X size={24} />
//               ) : (
//                 <Menu size={24} />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//             className="lg:hidden bg-gray-900 border-t border-gray-800/50 shadow-2xl shadow-black/50"
//             ref={mobileMenuRef}
//           >
            

//             <div className="px-4 py-4 space-y-2">
//               {navLinks.map((link) => {
//                 const isActive = location.pathname === link.path;
//                 return (
//                   <Link
//                     key={link.name}
//                     to={link.path}
//                     className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
//                       isActive
//                         ? `bg-gradient-to-br ${link.gradient} text-white`
//                         : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
//                     }`}
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     <div className={`p-2.5 rounded-lg ${
//                       isActive 
//                         ? 'bg-white/20' 
//                         : 'bg-gray-800'
//                     }`}>
//                       {link.icon}
//                     </div>
//                     <span className="font-semibold">{link.name}</span>
//                     {isActive && (
//                       <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>
            
//             {!userInfo && (
//               <div className="p-4 border-t border-gray-800/50">
//                 <Link
//                   to="/login"
//                   className="block w-full text-center py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-shadow mb-3"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Get Started Free
//                 </Link>
//                 <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
//                   <Star className="w-3 h-3" />
//                   Premium access available
//                 </div>
//               </div>
//             )}

//             {userInfo && isAdmin && (
//               <div className="p-4 border-t border-gray-800/50">
//                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
//                   Administration
//                 </div>
//                 <Link
//                   to="/admin/dashboard"
//                   className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-xl transition-colors"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <Shield className="w-4 h-4 text-purple-400" />
//                   Admin Dashboard
//                 </Link>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;




import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, LogOut, Settings, ChevronDown, Menu, X, Home, Briefcase, 
  FolderKanban, MessageSquare, Mail, Sparkles, Zap, Star, Layers, Shield, 
  Airplay
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
    // { name: 'Ai', path: '/ai', icon: <Airplay className="w-4 h-4" />, gradient: 'from-rose-500 to-red-500' }
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