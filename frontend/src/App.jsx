import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { AdminRoute } from './components/ProtectedRoute';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/admin/Sidebar';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import ManageServices from './pages/admin/ManageServices';

// User & Public Pages
import Home from './pages/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blogs from './pages/user/Blogs';
import Contact from './pages/Contact';
import LoginSuccess from './pages/user/LoginSuccess';
import ManageProjects from './pages/admin/ManageProjects';
import ManageBlogs from './pages/admin/ManageBlogs';

// 💡 Error yenar nahi mhanun temporary empty components (Jar banvle nastil tar)
//const ManageProjects = () => <div className="p-10 font-bold">Manage Projects Coming Soon...</div>;
//const ManageBlogs = () => <div className="p-10 font-bold">Manage Blogs Coming Soon...</div>;

// 🛡️ Layout Manager: Navbar ani Sidebar manage karnyathi
const LayoutHandler = ({ children }) => {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');
    const isLoginPage = location.pathname === '/admin/login';

    return (
        <div className={isAdminPath && !isLoginPage ? "flex" : ""}>
            {/* User Navbar: Fakt Public pages var disnar */}
            {!isAdminPath && <Navbar />}

            {/* Admin Sidebar: Fakt Admin pages var (Dashboard, Services etc.) disnar */}
            {isAdminPath && !isLoginPage && <Sidebar />}

            <main className={!isAdminPath ? "pt-16 flex-1" : "flex-1"}>
                {children}
            </main>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Toaster position="top-right" richColors />
                
                <LayoutHandler>
                    <Routes>
                        {/* --- PUBLIC ROUTES --- */}
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path='/blogs' element={<Blogs/>}/>
                        <Route path='/contact' element={<Contact/>}/>
                        <Route path="/login-success" element={<LoginSuccess />} />

                        {/* --- USER AUTH --- */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* --- ADMIN AUTH --- */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        
                        {/* --- PROTECTED ADMIN ROUTES --- */}
                        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                        <Route path="/admin/services" element={<AdminRoute><ManageServices /></AdminRoute>} />
                        <Route path="/admin/projects" element={<AdminRoute><ManageProjects /></AdminRoute>} />
                       <Route path="/admin/blogs" element={<AdminRoute><ManageBlogs /></AdminRoute>} />
                    </Routes>
                </LayoutHandler>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;