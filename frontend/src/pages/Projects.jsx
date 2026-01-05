import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  ExternalLink, 
  Github, 
  Globe, 
  Sparkles, 
  Zap, 
  Lock, 
  ChevronRight,
  Eye,
  Code2,
  Palette
} from 'lucide-react';
import ProjectsHero from '../components/Projects/ProjectsHero';

import API from '../api/api'

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredProject, setHoveredProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
             

                const { data } = await API.get('/projects');


                if (data.success) {
                    setProjects(data.data);
                }
            } catch (error) {
                toast.error("Failed to load projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const getColorByCategory = (category) => {
        const colorMap = {
            'Web': 'from-blue-500 to-cyan-600',
            'Mobile': 'from-purple-500 to-pink-600',
            'AI/ML': 'from-emerald-500 to-teal-600',
            'Design': 'from-amber-500 to-orange-600',
            'SaaS': 'from-violet-500 to-indigo-600',
            'E-commerce': 'from-rose-500 to-fuchsia-600',
            'default': 'from-gray-500 to-gray-700'
        };
        return colorMap[category] || colorMap.default;
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900">
            <div className="text-center">
                <div className="relative mb-8">
                    <div className="w-20 h-20 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Palette className="w-10 h-10 text-purple-400 animate-pulse" />
                    </div>
                </div>
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                >
                    Curating Excellence...
                </motion.div>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-b from-gray-950 to-black min-h-screen">
            {/* 🌟 Hero Section */}
            <ProjectsHero />

            {/* 🎯 Projects Grid */}
            <section className="relative py-32 px-6 max-w-7xl mx-auto">
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, #a855f7 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />
                </div>

                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((project, index) => {
                            const colorClass = getColorByCategory(project.category);

                            return (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    onHoverStart={() => setHoveredProject(project._id)}
                                    onHoverEnd={() => setHoveredProject(null)}
                                    className="relative group"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                                    <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden">
                                        <div className="relative h-64 overflow-hidden">
                                            <motion.img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute top-4 right-4">
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${colorClass} text-white`}>
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white mb-3">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.techStack?.slice(0, 4).map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2.5 py-1 bg-gray-800/50 text-gray-300 text-[10px] font-bold rounded-full border border-gray-700"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            <motion.a
                                                href={project.projectLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`block w-full py-3.5 rounded-xl bg-gradient-to-r ${colorClass} text-white font-bold text-center`}
                                            >
                                                Explore Project
                                            </motion.a>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {hoveredProject === project._id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className={`absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center`}
                                            >
                                                <Zap className="w-5 h-5 text-white" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {projects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32"
                    >
                        <Eye className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">
                            No Projects Found
                        </h3>
                        <p className="text-gray-400">
                            Projects will appear here once added.
                        </p>
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default Projects;
