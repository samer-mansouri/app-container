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
    getTrajtesWithUserReservationStatus,
    getCurrentUserTrajets,
    getSingleTrajetUsersReservationsList
} = require('../controllers/TrajetController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/trajets', getAllTrajets);
router.get('/trajet/:id', isAuthenticated,getTrajet);
router.get('/mytrajets', isAuthenticated, getCurrentUserTrajets);
router.post('/trajets/search', isAuthenticated,trajetsSimpleSearch);
router.post('/trajet', isAuthenticated, createTrajet);
router.put('/trajet/:id', isAuthenticated, updateTrajet);
router.delete('/trajet/:id', isAuthenticated, deleteTrajet);
router.post('/trajets/detsearch', isAuthenticated, detailledSearch);
router.get('/trajetsres', isAuthenticated, getTrajtesWithUserReservationStatus);
router.get('/trajet/:id/reservations', isAuthenticated, getSingleTrajetUsersReservationsList);

module.exports = { router };