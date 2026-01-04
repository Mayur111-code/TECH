import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FileText, MessageSquare, Briefcase, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          x: isSidebarOpen ? 0 : -260,
          width: 260
        }}
        className="fixed md:relative inset-y-0 left-0 z-40 bg-slate-900 border-r border-slate-800 flex flex-col h-screen"
      >
        <div className="p-4 md:p-6 flex items-center justify-between">
          <motion.span 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            className="font-bold text-lg md:text-xl text-blue-400"
          >
            Infina Admin
          </motion.span>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-slate-800 rounded-lg"
          >
            <X size={20} className="md:hidden"/>
            <Menu size={20} className="hidden md:block"/>
          </button>
        </div>

        <nav className="flex-1 px-3 md:px-4 space-y-1 md:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setSidebarOpen(false)}
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center p-3 rounded-lg md:rounded-xl transition-colors ${
                    isActive 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon size={20} className="md:size-[22px]" />
                  <span className="ml-3 md:ml-4 text-sm md:text-base">{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={20} className="md:size-[22px]" />
            <span className="ml-3 md:ml-4 font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-3 md:p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet /> 
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;