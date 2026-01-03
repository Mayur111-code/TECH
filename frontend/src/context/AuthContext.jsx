import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user or admin is logged in from localStorage
        const savedUser = localStorage.getItem('userInfo');
        const savedAdmin = localStorage.getItem('adminInfo');

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
        
        setLoading(false);
    }, []);

    // --- Logout Logic ---
    const logout = (type) => {
        if (type === 'admin') {
            localStorage.removeItem('adminInfo');
            setAdmin(null);
            toast.success('Admin Logged Out');
        } else {
            localStorage.removeItem('userInfo');
            setUser(null);
            toast.success('User Logged Out');
        }
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, setUser, admin, setAdmin, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);