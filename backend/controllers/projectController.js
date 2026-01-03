const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const { title, description, techStack, projectLink, category } = req.body;

        const projectData = {
            title,
            description,
            projectLink,
            category,
            // Safe Array conversion
            techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(s => s.trim()),
            image: req.file ? req.file.path : ''
        };

        if (!projectData.image) {
            return res.status(400).json({ success: false, message: "Please upload a project image" });
        }

        const project = await Project.create(projectData);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 👆 GET PROJECTS (No changes needed)
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort('-createdAt');
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 👇 ADDED: UPDATE PROJECT (Garaj lagte)
exports.updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });

        if (req.file) req.body.image = req.file.path;
        
        if (req.body.techStack) {
            req.body.techStack = Array.isArray(req.body.techStack) 
                ? req.body.techStack 
                : req.body.techStack.split(',').map(s => s.trim());
        }

        project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        
        await project.deleteOne();
        res.status(200).json({ success: true, message: "Project removed" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};