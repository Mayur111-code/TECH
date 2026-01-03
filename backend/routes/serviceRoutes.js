const express = require('express');
const router = express.Router();
const { 
    createService, 
    getServices, 
    updateService,
    deleteService 
} = require('../controllers/serviceController');


const { adminProtect } = require('../middleware/auth');

router.route('/')
    .get(getServices) 
    .post(adminProtect, createService);


router.route('/:id')
    .put(adminProtect, updateService) 
    .delete(adminProtect, deleteService);

module.exports = router;