const express = require('express')
const router = express.Router()

const {
    createCovoiturage,
    deleteCovoiturage,
    getAllCovoiturageList,
    getCovoiturage,
    updateCovoiturage,
} = require('../controllers/CovoiturageController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/covoiturages', isAuthenticated, getAllCovoiturageList);
router.get('/covoiturage/:id', isAuthenticated, getCovoiturage);
router.post('/covoiturage', isAuthenticated, createCovoiturage);
router.delete('/covoiturage/:id', isAuthenticated, deleteCovoiturage);
router.put('/covoiturage/:id', isAuthenticated, updateCovoiturage);

module.exports = { router };