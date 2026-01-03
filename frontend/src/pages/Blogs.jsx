import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import {
    Calendar,
    ArrowRight,
    User,
    Clock,
    Eye,
    Bookmark,
    Share2,
    TrendingUp,
    Sparkles
} from 'lucide-react';
import BlogHero from '../components/Blog/BlogHero';


import API from '../api/api'

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [hoveredBlog, setHoveredBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // const { data } = await axios.get('http://localhost:5000/api/blogs');


                const { data } = await API.get('/blogs');

                
                if (data.success) setBlogs(data.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                toast.error("Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const getColorByCategory = (category) => {
        const colorMap = {
            'Technology': 'from-blue-500 to-cyan-600',
            'Design': 'from-purple-500 to-pink-600',
            'AI/ML': 'from-emerald-500 to-teal-600',
            'Business': 'from-amber-500 to-orange-600',
            'Development': 'from-violet-500 to-indigo-600',
            'Tutorial': 'from-rose-500 to-fuchsia-600',
            'News': 'from-orange-500 to-red-600',
            'default': 'from-gray-500 to-gray-700'
        };
        return colorMap[category] || colorMap.default;
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return 'Recent';
        }
    };

    const getReadingTime = (content) => {
        if (!content) return '1 min read';
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    // Function to safely get author name
    const getAuthorName = (author) => {
        if (!author) return 'Admin';

        // If author is a string, return it
        if (typeof author === 'string') return author;

        // If author is an object with name property
        if (typeof author === 'object' && author !== null) {
            return author.name || author.username || author.email || 'Admin';
        }

        return 'Admin';
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900">
            <div className="text-center">
                <div className="relative mb-8">
                    <div className="w-20 h-20 border-4 border-gray-800 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-orange-400 animate-pulse" />
                    </div>
                </div>
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
                >
                    Curating Insights...
                </motion.div>
            </div>
        </div>
    );

    const filteredBlogs = blogs.filter(blog => {
        if (!blog) return false;

        if (filter !== 'all' && blog.category !== filter) return false;
        if (search && !blog.title?.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    // Function to safely extract excerpt
    const getExcerpt = (content) => {
        if (!content) return 'No content available...';

        // Remove HTML tags
        const plainText = content.replace(/<[^>]*>/g, '');

        // Limit to 150 characters
        return plainText.length > 150
            ? plainText.substring(0, 150) + '...'
            : plainText;
    };

    return (
        <div className="bg-gradient-to-b from-gray-950 to-black min-h-screen">
            {/* 🌟 1. Hero Section */}
            <BlogHero />




            {/* 🎯 3. Blogs Grid Section */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-16 flex flex-wrap items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <TrendingUp className="w-6 h-6 text-orange-400" />
                        <div>
                            <h3 className="text-white font-bold">Latest Insights</h3>
                            <p className="text-gray-500 text-sm">{filteredBlogs.length} articles found</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            10K+ monthly readers
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Updated weekly
                        </span>
                    </div>
                </motion.div>

                {/* Grid with Proper Spacing */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter + search}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredBlogs.map((blog, index) => {
                            if (!blog) return null; // Skip invalid blog entries

                            const colorClass = getColorByCategory(blog.category);
                            const authorName = getAuthorName(blog.author);
                            const excerpt = getExcerpt(blog.content);
                            const readingTime = getReadingTime(blog.content);

                            return (
                                <motion.article
                                    key={blog._id || index}
                                    layout
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    onHoverStart={() => setHoveredBlog(blog._id)}
                                    onHoverEnd={() => setHoveredBlog(null)}
                                    className="group relative"
                                >
                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                    {/* Blog Card */}
                                    <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl shadow-black/30 overflow-hidden hover:border-gray-700/50 transition-all duration-300 h-full flex flex-col">

                                        {/* Image Container */}
                                        <div className="relative h-64 overflow-hidden">
                                            <motion.img
                                                src={blog.image || 'https://via.placeholder.com/400x250/1f2937/6b7280?text=Blog+Image'}
                                                alt={blog.title || 'Blog Post'}
                                                className="w-full h-full object-cover"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400x250/1f2937/6b7280?text=Blog+Image';
                                                }}
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${colorClass} text-white shadow-lg`}>
                                                    {blog.category || 'Technology'}
                                                </span>
                                            </div>

                                            {/* Reading Time */}
                                            <div className="absolute top-4 right-4">
                                                <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-2">
                                                    <Clock className="w-3 h-3" />
                                                    {readingTime}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            {/* Meta Info */}
                                            <div className="flex items-center gap-4 mb-6 text-gray-400 text-xs font-medium">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {formatDate(blog.createdAt)}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    {authorName}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-100 transition-colors line-clamp-2 leading-tight">
                                                {blog.title || 'Untitled Blog Post'}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                                                {excerpt}
                                            </p>

                                            {/* Action Bar */}
                                            <div className="flex items-center justify-between pt-6 border-t border-gray-800/50 mt-auto">
                                                <Link
                                                    to={`/blog/${blog._id}`}
                                                    className="flex items-center gap-2 text-orange-400 font-bold text-sm group/btn hover:text-orange-300 transition-colors"
                                                >
                                                    Read Full Story
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                                </Link>

                                                <div className="flex items-center gap-3">
                                                    <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                                                        <Bookmark className="w-4 h-4 text-gray-400 hover:text-orange-400" />
                                                    </button>
                                                    <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                                                        <Share2 className="w-4 h-4 text-gray-400 hover:text-orange-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Indicator */}
                                    <AnimatePresence>
                                        {hoveredBlog === blog._id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center shadow-2xl z-20`}
                                            >
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

              



            </section>
        </div>
    );
};

export default Blogs;