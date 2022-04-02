const mongoose = require('mongoose');
const Vehicule = mongoose.model('Vehicule');

const initializeVehicule = (
    userId, mark, model, color, year, category, motorization, power,
) => {
    const vehicule = new Vehicule({
        userId,
        mark,
        model,
        color,
        year,
        category,
        motorization,
        power,
    });
    return vehicule;
}

module.exports = { initializeVehicule };