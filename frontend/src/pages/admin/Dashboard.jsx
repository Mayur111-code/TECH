import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { MessageSquare, Users, Bell, ArrowUpRight, Trash2, Menu } from 'lucide-react';
import API from '../../api/api';

const AdminDashboard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { admin } = useAuth();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${admin.token}` } };
                const { data } = await API.get('/admin/dashboard-data', config);
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

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse">
            Loading Dashboard...
        </div>
    );

    return (
        <div className="space-y-4 md:space-y-6 p-2 md:p-0">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg md:text-xl font-bold text-slate-800">Admin Dashboard</h1>
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100"
                    >
                        <Menu size={20} />
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                        <Bell size={20}/>
                    </div>
                    <span className="text-sm font-semibold text-slate-600 truncate">
                        {admin.admin.name}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
                            <MessageSquare size={24}/>
                        </div>
                        <span className="text-green-500 text-xs font-bold flex items-center bg-green-50 px-2 py-1 rounded-full">
                            +12% <ArrowUpRight size={12}/>
                        </span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium mt-4">Total Inquiries</h3>
                    <p className="text-2xl md:text-3xl font-black text-slate-900">{inquiries.length}</p>
                </div>
                
                <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-3xl border border-slate-100 shadow-sm opacity-60">
                    <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl w-fit">
                        <Users size={24}/>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium mt-4">Active Users</h3>
                    <p className="text-2xl md:text-3xl font-black text-slate-900">Coming Soon</p>
                </div>
            </div>

            {/* Recent Inquiries Table */}
            <div className="bg-white rounded-xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-slate-50">
                    <h2 className="font-bold text-slate-800 text-sm md:text-base">Recent Client Inquiries</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px] md:min-w-0">
                        <thead className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase font-bold tracking-widest">
                            <tr>
                                <th className="p-3 md:p-4">Client Details</th>
                                <th className="p-3 md:p-4">Subject</th>
                                <th className="p-3 md:p-4">Message</th>
                                <th className="p-3 md:p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {inquiries.map((iq) => (
                                <tr key={iq._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-3 md:p-4">
                                        <div className="font-bold text-slate-800 text-xs md:text-sm truncate max-w-[150px]">
                                            {iq.user?.name || 'Guest'}
                                        </div>
                                        <div className="text-[10px] md:text-[11px] text-slate-400 truncate max-w-[150px]">
                                            {iq.user?.email}
                                        </div>
                                    </td>
                                    <td className="p-3 md:p-4 text-xs md:text-sm text-slate-600 font-medium truncate max-w-[120px]">
                                        {iq.subject}
                                    </td>
                                    <td className="p-3 md:p-4 text-xs md:text-sm text-slate-500 truncate max-w-[200px] md:max-w-xs">
                                        {iq.message}
                                    </td>
                                    <td className="p-3 md:p-4 text-center">
                                        <button 
                                            onClick={() => deleteInquiry(iq._id)}
                                            className="text-red-400 hover:text-red-600 p-1 md:p-2 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} className="md:size-[18px]"/>
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