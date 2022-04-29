const express = require('express');
const router = express.Router();

const {
    createReservation,
    reservationSetStatusConfirmed,
    reservationSetStatusCancelled,
    fetchTrajetReservationsList,
    reservationCancelOwner,
    reservationConfirmOwner
} = require('../controllers/ReservationController');
const isAuthenticated = require('../middlewares/isAuthenticated');


router.post('/reservation', isAuthenticated, createReservation);
router.put('/reservation/:id', isAuthenticated, reservationSetStatusConfirmed);
router.put('/reservationcancel/:id', isAuthenticated, reservationSetStatusCancelled);
router.get('/trajteres/:id', isAuthenticated, fetchTrajetReservationsList);
router.put('/reservationcancelowner/:id', isAuthenticated, reservationCancelOwner);
router.put('/reservationconfirmowner/:id', isAuthenticated, reservationConfirmOwner);

module.exports = { router };