const Service = require('../models/Service');


exports.createService = async (req, res) => {
    try {
        const { title, description, icon } = req.body;
        
        const serviceData = {
            title,
            description,
            icon: req.file ? req.file.path : (icon || 'Settings')
        };

        const service = await Service.create(serviceData);
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.updateService = async (req, res) => {
    try {
        let service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

        
        if (req.file) {
            req.body.icon = req.file.path;
        } 
       
        service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().sort('-createdAt');
        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

        await service.deleteOne();
        res.status(200).json({ success: true, message: 'Service Deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};