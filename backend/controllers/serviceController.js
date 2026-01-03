const Service = require('../models/Service');

// @desc    Add New Service (Admin Only)
// @desc    Add New Service (Admin Only)
exports.createService = async (req, res) => {
    try {
        // 1. req.body madhun icon (text) gya
        const { title, description, icon } = req.body;
        
        const serviceData = {
            title,
            description,
            // 2. Jar file (image) upload keli asel tar ti gya, 
            // nasel tar Admin ne taklela icon name gya, nasel tar default 'Settings'
            icon: req.file ? req.file.path : (icon || 'Settings')
        };

        const service = await Service.create(serviceData);
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update Service (Admin Only)
exports.updateService = async (req, res) => {
    try {
        let service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

        // 3. Jar navin file aali asel tar ti path update kara
        if (req.file) {
            req.body.icon = req.file.path;
        } 
        // Jar file nasel aali, tar req.body madhe jo 'icon' (text) aahe toch rahil

        service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
// @desc    Get All Services (Public)
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().sort('-createdAt');
        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update Service (Admin Only) - 🆕 He missing hota
// exports.updateService = async (req, res) => {
//     try {
//         let service = await Service.findById(req.params.id);
//         if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

//         if (req.file) req.body.icon = req.file.path;

//         service = await Service.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });

//         res.status(200).json({ success: true, data: service });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

// @desc    Delete Service (Admin Only)
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