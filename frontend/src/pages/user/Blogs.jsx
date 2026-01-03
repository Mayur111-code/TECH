import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/blogs');
                if (data.success) setBlogs(data.data);
            } catch (error) {
                toast.error("Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading Blogs...</div>;

    return (
        <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-12 border-l-4 border-blue-600 pl-6"
            >
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">Tech Insights</h1>
                <p className="text-gray-500 mt-2">Latest news, tutorials, and updates from Infina Tech.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                    <motion.article
                        key={blog._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                    >
                        {/* 🖼️ Blog Image */}
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={blog.image} 
                                alt={blog.title} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* 📝 Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                                    {blog.category || 'Technology'}
                                </span>
                                <span className="text-gray-400 text-xs">
                                    {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </span>
                            </div>
                            
                            <h2 className="text-xl font-bold text-slate-800 mb-3 leading-tight hover:text-blue-600 cursor-pointer">
                                {blog.title}
                            </h2>
                            
                            <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                                {blog.content.replace(/<[^>]*>/g, '')} {/* HTML tags kadhun taknyathi */}
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-50">
                                <Link 
                                    to={`/blog/${blog._id}`}
                                    className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                >
                                    Read Full Story <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    );
};

export default Blogs;