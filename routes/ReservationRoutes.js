const express = require('express');
const router = express.Router();

const {
    createReservation,
    reservationSetStatusConfirmed,
    reservationSetStatusCancelled,
} = require('../controllers/ReservationController');
const isAuthenticated = require('../middlewares/isAuthenticated');


router.post('/reservation', isAuthenticated, createReservation);
router.put('/reservation/:id', isAuthenticated, reservationSetStatusConfirmed);
router.put('/reservation/:id', isAuthenticated, reservationSetStatusCancelled);

module.exports = { router };