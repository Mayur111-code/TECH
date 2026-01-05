import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, X, Upload, ExternalLink } from 'lucide-react';



import API from '../../api/api'

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '', description: '', techStack: '', projectLink: '', category: 'Web App'
    });

    const fetchProjects = async () => {
        const { data } = await API.get('/projects');
        setProjects(data.data);
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        
      
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('techStack', formData.techStack);
        data.append('projectLink', formData.projectLink);
        data.append('category', formData.category);
        if (imageFile) data.append('image', imageFile);

        const config = {
            headers: { 
                Authorization: `Bearer ${adminInfo.token}`,
                'Content-Type': 'multipart/form-data' 
            }
        };

        try {
            if (editId) {
                await API.put(`/projects/${editId}`, data, config);
                toast.success("Project Updated!");
            } else {
                await API.post('/projects', data, config);
                toast.success("Project Added!");
            }
            resetForm();
            fetchProjects();
        } catch (err) {
            toast.error(err.response?.data?.message || "Process Failed!");
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', techStack: '', projectLink: '', category: 'Web App' });
        setImageFile(null);
        setShowForm(false);
        setEditId(null);
    };

    const deleteProject = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        await API.delete(`/projects/${id}`, {
            headers: { Authorization: `Bearer ${adminInfo.token}` }
        });
        toast.success("Deleted!");
        fetchProjects();
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black text-slate-800">Manage Projects</h1>
                <button 
                    onClick={() => { setShowForm(true); setEditId(null); }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all"
                >
                    <Plus size={20}/> Add Project
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-8 rounded-3xl shadow-xl mb-8 border border-indigo-50">
                    <div className="flex justify-between mb-6">
                        <h2 className="text-lg font-bold">{editId ? '📝 Edit Project' : '🚀 New Project'}</h2>
                        <button onClick={resetForm}><X/></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input 
                            className="p-3.5 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Project Title"
                            value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required
                        />
                        <input 
                            className="p-3.5 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Category (Web App, UI/UX)"
                            value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                        />
                        <input 
                            className="p-3.5 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Tech Stack (comma separated: React, Node)"
                            value={formData.techStack} onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                        />
                        <input 
                            className="p-3.5 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Live Link"
                            value={formData.projectLink} onChange={(e) => setFormData({...formData, projectLink: e.target.value})}
                        />
                        <textarea 
                            className="md:col-span-2 p-3.5 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Description"
                            rows="3"
                            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                        <div className="md:col-span-2 border-2 border-dashed border-slate-200 p-6 rounded-xl text-center">
                            <input 
                                type="file" 
                                id="fileInput"
                                className="hidden" 
                                onChange={(e) => setImageFile(e.target.files[0])}
                            />
                            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-2">
                                <Upload className="text-slate-400" />
                                <span className="text-sm text-slate-500">
                                    {imageFile ? imageFile.name : "Click to upload Project Thumbnail"}
                                </span>
                            </label>
                        </div>
                        <button className="md:col-span-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all">
                            {editId ? 'Update Project' : 'Upload Project'}
                        </button>
                    </form>
                </div>
            )}

            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                    <div key={p._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border group">
                        <img src={p.image} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="p-5">
                            <h3 className="font-bold text-lg">{p.title}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{p.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold">{p.category}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditId(p._id); setFormData({...p, techStack: p.techStack.join(', ')}); setShowForm(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18}/></button>
                                    <button onClick={() => deleteProject(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;