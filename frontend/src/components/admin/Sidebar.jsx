import { useState } from 'react';
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

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle state

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

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Header */}
      <div className="lg:hidden bg-slate-900 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-black text-white italic">
          INFINA<span className="text-blue-500">.</span>ADMIN
        </h1>
        <button onClick={toggleSidebar} className="text-white p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Main Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 z-40
        w-64 bg-slate-900 h-screen flex flex-col text-slate-300 border-r border-slate-800
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Logo (Hidden on mobile header if you want, or kept here) */}
        <div className="p-6 mb-4 hidden lg:block">
          <h1 className="text-xl font-black text-white tracking-tighter italic">
            INFINA<span className="text-blue-500">.</span>ADMIN
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 mt-4 lg:mt-0">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Close on click
              className={({ isActive }) => 
                `flex items-center justify-between p-3 rounded-xl transition-all group ${
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
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
      </div>
    </>
  );
};

export default Sidebar;