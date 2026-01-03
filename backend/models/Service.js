const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Service title is required'],
        unique: true 
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'] 
    },
    icon: { 
        type: String, 
        default: 'Settings' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Service', ServiceSchema);