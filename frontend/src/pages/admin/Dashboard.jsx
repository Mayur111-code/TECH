import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { MessageSquare, Users, Bell, ArrowUpRight, Trash2 } from 'lucide-react';

import API from '../../api/api';


const AdminDashboard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { admin } = useAuth();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${admin.token}` } };
                // const { data } = await axios.get('http://localhost:5000/api/admin/dashboard-data', config);
                

                const { data } = await API.get('/admin/dashboard-data', config);



                // const inquiryRes = await axios.get('http://localhost:5000/api/inquiries', config);
                // setInquiries(inquiryRes.data.data);

                const inquiryRes = await API.get('/inquiries', config);
                setInquiries(inquiryRes.data.data);




            } catch (err) {
                toast.error("Data load karnyath error aala");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [admin.token]);

    const deleteInquiry = async (id) => {
        if(window.confirm("Delete inquiry?")) {
            try {
                // await axios.delete(`http://localhost:5000/api/inquiries/${id}`
                
                await API.delete(`inquiries/${id}`, {
                    headers: { Authorization: `Bearer ${admin.token}` }
                });
                setInquiries(inquiries.filter(iq => iq._id !== id));
                toast.success("Inquiry deleted!");
            } catch (err) {
                toast.error("Delete failed!");
            }
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse">Loading Dashboard...</div>;

    return (
        <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-xl font-bold text-slate-800">Admin Command Center</h1>
                <div className="flex items-center gap-4">
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg"><Bell size={20}/></div>
                    <span className="text-sm font-semibold text-slate-600">{admin.admin.name}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl"><MessageSquare size={24}/></div>
                        <span className="text-green-500 text-xs font-bold flex items-center bg-green-50 px-2 py-1 rounded-full">+12% <ArrowUpRight size={12}/></span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium mt-4">Total Inquiries</h3>
                    <p className="text-3xl font-black text-slate-900">{inquiries.length}</p>
                </div>
                
               
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm opacity-60">
                    <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl w-fit"><Users size={24}/></div>
                    <h3 className="text-slate-500 text-sm font-medium mt-4">Active Users</h3>
                    <p className="text-3xl font-black text-slate-900">Coming Soon</p>
                </div>
            </div>

           
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                    <h2 className="font-bold text-slate-800">Recent Client Inquiries</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                            <tr>
                                <th className="p-4">Client Details</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Message</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {inquiries.map((iq) => (
                                <tr key={iq._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-slate-800 text-sm">{iq.user?.name || 'Guest'}</div>
                                        <div className="text-[11px] text-slate-400">{iq.user?.email}</div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600 font-medium">{iq.subject}</td>
                                    <td className="p-4 text-sm text-slate-500 max-w-xs truncate">{iq.message}</td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => deleteInquiry(iq._id)}
                                            className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;