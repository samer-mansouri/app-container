const express = require('express');
var router = express.Router();
const { 
    userVehiculesList,
    createVehicule,
    vehiculeDetails,
    deleteVehicule,
    updateVehicule,
} = require('../controllers/VehiculeController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/vehicules', isAuthenticated, userVehiculesList);
router.post('/vehicule', isAuthenticated, createVehicule);
router.get('/vehicule/:id', isAuthenticated, vehiculeDetails);
router.put('/vehicule/:id', isAuthenticated, updateVehicule);
router.delete('/vehicule/:id', isAuthenticated, deleteVehicule);

module.exports = { router };