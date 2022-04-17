const express = require('express');
const { uploadProfilePicture } = require('../config/upload');
var router = express.Router();
const { 
    userVehiculesList,
    createVehicule,
    vehiculeDetails,
    deleteVehicule,
    updateVehicule,
    addCarPicture
} = require('../controllers/VehiculeController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const upload = require("../config/multer");


router.get('/vehicules', isAuthenticated, userVehiculesList);
router.post('/vehicule', isAuthenticated, createVehicule);
router.get('/vehicule/:id', isAuthenticated, vehiculeDetails);
router.put('/vehicule/:id', isAuthenticated, updateVehicule);
router.delete('/vehicule/:id', isAuthenticated, deleteVehicule);
router.post('/vehiculepic/:id', isAuthenticated, upload.single('picture'), addCarPicture);

module.exports = { router };