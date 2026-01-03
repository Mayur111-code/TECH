import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/projects');
                if (data.success) setProjects(data.data);
            } catch (error) {
                toast.error("Failed to load projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading Projects...</div>;

    return (
        <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">Our Portfolio</h1>
                <p className="text-gray-500 mt-4">Showcasing our best work and technical expertise.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
                    >
                        {/* 🖼️ Project Image */}
                        <div className="relative overflow-hidden h-52">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow">
                                {project.category}
                            </div>
                        </div>

                        {/* 📝 Project Details */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-4">{project.description}</p>
                            
                            {/* 💻 Tech Stack Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} className="bg-slate-100 text-slate-600 text-[10px] uppercase font-bold px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <a 
                                href={project.projectLink} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-block w-full text-center py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                            >
                                View Project
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;