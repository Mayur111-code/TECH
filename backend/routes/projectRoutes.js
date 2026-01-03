const express = require('express');
const router = express.Router();
const { 
    createProject, 
    getProjects, 
    updateProject,
    deleteProject  
} = require('../controllers/projectController');
const upload = require('../middleware/upload');
const { adminProtect } = require('../middleware/auth');


router.route('/')
    .get(getProjects) 
    .post(adminProtect, upload.single('image'), createProject);


router.route('/:id')
    .put(adminProtect, upload.single('image'), updateProject) 
    .delete(adminProtect, deleteProject);

module.exports = router;