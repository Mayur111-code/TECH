const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Project title is required'] 
    },
    description: { 
        type: String, 
        required: true 
    },
    techStack: { 
        type: [String], // Array: ['React', 'Node', 'MongoDB']
        required: true 
    },
    image: { 
        type: String, // Cloudinary URL
        required: true 
    },
    projectLink: { 
        type: String 
    },
    category: { 
        type: String, // e.g., Web App, Mobile App, UI/UX
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Project', ProjectSchema);