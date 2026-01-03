import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Newspaper, 
  FolderKanban, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

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

  return (
    <div className="w-64 bg-slate-900 h-screen sticky top-0 flex flex-col text-slate-300 border-r border-slate-800">
      {/* Brand Logo */}
      <div className="p-6 mb-4">
        <h1 className="text-xl font-black text-white tracking-tighter italic">
          INFINA<span className="text-blue-500">.</span>ADMIN
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
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
  );
};

export default Sidebar;