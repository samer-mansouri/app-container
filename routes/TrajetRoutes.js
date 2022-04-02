const express = require('express');
const router = express.Router();

const {
    getAllTrajets,
    getTrajet,
    trajetsSimpleSearch,
    createTrajet,
    updateTrajet,
    deleteTrajet,
} = require('../controllers/TrajetController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/trajets', getAllTrajets);
router.get('/trajet/:id', getTrajet);
router.get('/trajets/search', isAuthenticated,trajetsSimpleSearch);
router.post('/trajet', isAuthenticated, createTrajet);
router.put('/trajet/:id', isAuthenticated, updateTrajet);
router.delete('/trajet/:id', isAuthenticated, deleteTrajet);

module.exports = { router };