import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FileText, MessageSquare, Briefcase, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 sticky top-0 h-screen"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <motion.span initial={{opacity:0}} animate={{opacity:1}} className="font-bold text-xl text-secondary">Infina Admin</motion.span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg">
            {isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center p-3 rounded-xl transition-colors ${isActive ? 'bg-secondary text-primary font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
                >
                  <Icon size={22} />
                  {isSidebarOpen && <span className="ml-4">{item.name}</span>}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center w-full p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut size={22} />
            {isSidebarOpen && <span className="ml-4 font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet /> {/* Yahan Admin Dashboard, Blogs, Projects render honge */}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;