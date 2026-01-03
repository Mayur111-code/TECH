import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';


import API from '../../api/api';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); 
  const { setAdmin } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
       
        // const { data } = await axios.post('http://localhost:5000/api/admin/login', { email, password });

        const { data } = await API.get('/admin/login', { email, password });


        
        if (data.success) {
            
            localStorage.setItem('adminInfo', JSON.stringify(data));
            
            
            setAdmin(data); 
            
            toast.success('Admin Welcome Back! Redirecting...');
            
           
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 1500);
        }
    } catch (err) {
        toast.error(err.response?.data?.message || 'Invalid Admin Credentials');
        console.error("Admin Login Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-blue-600"
      >
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Admin Panel</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            placeholder="admin@infina.tech" 
            required
          />
          <Input 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            placeholder="••••••••" 
            required
          />
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold py-3 shadow-lg shadow-blue-100">
            Login as Admin
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;