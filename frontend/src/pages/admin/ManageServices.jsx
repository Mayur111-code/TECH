import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Save, X, Search } from 'lucide-react';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    
    // 1. icon field add keli aahe 🚀
    const [formData, setFormData] = useState({ title: '', description: '', icon: '' });

    const fetchServices = async () => {
        const { data } = await axios.get('http://localhost:5000/api/services');
        setServices(data.data);
    };

    useEffect(() => { fetchServices(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };

        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/services/${editId}`, formData, config);
                toast.success("Service Updated!");
            } else {
                await axios.post('http://localhost:5000/api/services', formData, config);
                toast.success("Service Added!");
            }
            setFormData({ title: '', description: '', icon: '' });
            setShowForm(false);
            setEditId(null);
            fetchServices();
        } catch (err) {
            toast.error("Process Failed!");
        }
    };

    const deleteService = async (id) => {
        if (!window.confirm("Sure?")) return;
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        await axios.delete(`http://localhost:5000/api/services/${id}`, {
            headers: { Authorization: `Bearer ${adminInfo.token}` }
        });
        toast.success("Deleted!");
        fetchServices();
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black text-slate-800">Manage Services</h1>
                <button 
                    onClick={() => { setShowForm(true); setEditId(null); setFormData({title:'', description:'', icon:''}); }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-blue-200"
                >
                    <Plus size={20}/> Add New Service
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-8 rounded-3xl shadow-xl mb-8 border border-blue-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                    <div className="flex justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800">{editId ? '📝 Edit Service' : '✨ New Service'}</h2>
                        <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X/></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input 
                                className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                                placeholder="Service Title (e.g. Web Design)"
                                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required
                            />
                            {/* 🚀 ICON INPUT FIELD */}
                            <div className="relative">
                                <input 
                                    className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                                    placeholder="Icon Name (e.g. Code, Globe, Laptop)"
                                    value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})}
                                    required
                                />
                                <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="absolute right-3 top-4 text-blue-500 hover:text-blue-700">
                                    <Search size={18}/>
                                </a>
                            </div>
                        </div>
                        <textarea 
                            className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                            placeholder="Write a short description about this service..."
                            rows="4"
                            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                            required
                        />
                        <button className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-bold transition-all shadow-lg">
                            {editId ? 'Update Service Details' : 'Save & Publish Service'}
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="p-5">Service Info</th>
                            <th className="p-5">Icon</th>
                            <th className="p-5">Description</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {services.map(s => (
                            <tr key={s._id} className="hover:bg-blue-50/30 transition-all group">
                                <td className="p-5">
                                    <div className="font-bold text-slate-800">{s.title}</div>
                                </td>
                                <td className="p-5">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-mono">{s.icon || 'Settings'}</span>
                                </td>
                                <td className="p-5">
                                    <p className="text-slate-500 text-sm max-w-xs truncate font-medium">{s.description}</p>
                                </td>
                                <td className="p-5 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => { setEditId(s._id); setFormData(s); setShowForm(true); }} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"><Edit size={18}/></button>
                                        <button onClick={() => deleteService(s._id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"><Trash2 size={18}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageServices;