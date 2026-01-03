import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Plus, Trash2, Edit, X, Image as ImageIcon } from 'lucide-react';



import API from '../../api/api';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [content, setContent] = useState(''); 
    const [formData, setFormData] = useState({ title: '', category: 'Tech' });

    // 1. Fetch Blogs from Backend
    const fetchBlogs = async () => {
        try {
            // const { data } = await axios.get('http://localhost:5000/api/blogs');
            // setBlogs(data.data);

            const { data } = await API.get('/blogs');
             setBlogs(data.data);




        } catch (err) {
            toast.error("Failed to load blogs");
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        
      
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('content', content); 
        if (imageFile) data.append('image', imageFile);

        const config = {
            headers: { 
                Authorization: `Bearer ${adminInfo.token}`,
                'Content-Type': 'multipart/form-data' 
            }
        };

        try {
            if (editId) {
                await API.put(`/blogs/${editId}`, data, config);
                toast.success("Blog Updated!");
            } else {
                await API.post('/blogs', data, config);
                toast.success("Blog Published!");
            }
            resetForm();
            fetchBlogs();
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation Failed");
        }
    };

    const resetForm = () => {
        setFormData({ title: '', category: 'Tech' });
        setContent('');
        setImageFile(null);
        setShowForm(false);
        setEditId(null);
    };

    const deleteBlog = async (id) => {
        if (!window.confirm("Delete this blog?")) return;
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        await API.delete(`/blogs/${id}`, {
            headers: { Authorization: `Bearer ${adminInfo.token}` }
        });
        toast.success("Blog Removed");
        fetchBlogs();
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black text-slate-800">Manage Blogs</h1>
                <button onClick={() => setShowForm(true)} className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
                    <Plus size={20}/> Write New Blog
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-orange-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input 
                                className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Blog Title"
                                value={formData.title} 
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required
                            />
                            <select 
                                className="p-3 border rounded-xl outline-none"
                                value={formData.category} 
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="Tech">Tech</option>
                                <option value="Business">Business</option>
                                <option value="Design">Design</option>
                            </select>
                        </div>

                        {/* Rich Text Editor */}
                        <div className="mb-4">
                            <label className="block mb-2 font-bold text-slate-700">Content</label>
                            <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64 mb-12" />
                        </div>

                        <div className="mt-8">
                            <label className="block mb-2 font-bold text-slate-700">Banner Image</label>
                            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm text-slate-500" />
                        </div>

                        <div className="flex gap-3">
                            <button type="submit" className="flex-1 bg-black text-white py-3 rounded-xl font-bold">Publish</button>
                            <button type="button" onClick={resetForm} className="px-6 border rounded-xl font-bold">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {/* List Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b">
                        <tr className="text-sm font-bold text-slate-600">
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog._id} className="border-b hover:bg-slate-50">
                                <td className="p-4 font-medium">{blog.title}</td>
                                <td className="p-4 text-sm text-slate-500">{blog.category}</td>
                                <td className="p-4 text-right flex justify-end gap-3">
                                    <button onClick={() => { setEditId(blog._id); setFormData(blog); setContent(blog.content); setShowForm(true); }} className="text-blue-600"><Edit size={18}/></button>
                                    <button onClick={() => deleteBlog(blog._id)} className="text-red-500"><Trash2 size={18}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBlogs;