const express = require('express');
const router = express.Router();

const {
    getAllTrajets,
    getTrajet,
    trajetsSimpleSearch,
    createTrajet,
    updateTrajet,
    deleteTrajet,
    detailledSearch,
    getTrajtesWithUserReservationStatus
} = require('../controllers/TrajetController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/trajets', isAuthenticated, getAllTrajets);
router.get('/trajet/:id', getTrajet);
router.post('/trajets/search', isAuthenticated,trajetsSimpleSearch);
router.post('/trajet', isAuthenticated, createTrajet);
router.put('/trajet/:id', isAuthenticated, updateTrajet);
router.delete('/trajet/:id', isAuthenticated, deleteTrajet);
router.post('/trajets/detsearch', isAuthenticated, detailledSearch);
router.get('/trajetsres', isAuthenticated, getTrajtesWithUserReservationStatus);

module.exports = { router };