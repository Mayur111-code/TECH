import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Newspaper, 
  FolderKanban, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Manage Services', path: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Manage Projects', path: '/admin/projects', icon: <FolderKanban size={20} /> },
    { name: 'Manage Blogs', path: '/admin/blogs', icon: <Newspaper size={20} /> },
  ];

  const sidebarContent = (
    <>
      {/* Brand Logo */}
      <div className="p-4 md:p-6 mb-4 flex items-center justify-between md:block">
        <h1 className="text-lg md:text-xl font-black text-white tracking-tighter italic">
          INFINA<span className="text-blue-500">.</span>ADMIN
        </h1>
        {isMobile && (
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-white md:hidden"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 md:px-4 space-y-1 md:space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            className={({ isActive }) => 
              `flex items-center justify-between p-3 rounded-lg md:rounded-xl transition-all group ${
                isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium text-sm">{item.name}</span>
            </div>
            <ChevronRight size={14} className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg md:hidden"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-40 transform' : 'sticky top-0'} 
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        w-64 bg-slate-900 h-screen flex flex-col text-slate-300 border-r border-slate-800
        transition-transform duration-300 ease-in-out md:translate-x-0 md:relative
      `}>
        {sidebarContent}
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;