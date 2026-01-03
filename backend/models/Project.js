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
        type: [String], 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    projectLink: { 
        type: String 
    },
    category: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Project', ProjectSchema);