const mongoose = require('mongoose');
const Trajet = mongoose.model('Trajet');

const initializeTrajet = (
    userId,
    vehiculeId,
    placeOfDeparture,
    placeOfDestination,
    departureTime,
    pathTaken,
    availableSeats,
    price,
    phoneNumber,
) => {
    const trajet = new Trajet({
        userId,
        vehiculeId,
        placeOfDeparture,
        placeOfDestination,
        departureTime,
        pathTaken,
        availableSeats,
        price,
        phoneNumber,
    });
    return trajet;
}

module.exports = { initializeTrajet };