const mongoose = require('mongoose');
const Vehicule = mongoose.model('Vehicule');
const { initializeVehicule } = require('../helpers/VehiculeHelpers')


const vehiculeDetails = (req, res) => {
    const userId = req.user;
    const vehiculeId = req.params.id;
    Vehicule.findOne({ _id: vehiculeId, userId }, (err, doc) => {
        if (!err) {
            res.status(200).send(doc);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
} 

const userVehiculesList = (req, res) => {
    const userId = req.user;
    Vehicule.find({ userId }).sort('-createdAt').exec((err, doc) => {
        if (!err) {
            res.status(200).send(doc);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const createVehicule = async (req, res) => {
    const userId = req.user;
    const { mark, model, color, year, category, motorization, power } = req.body;
    await initializeVehicule(
        userId,
        mark,
        model,
        color,
        year,
        category,
        motorization,
        power,
    ).save((err, doc) => {
        if (!err) {
            res.status(201).send(doc);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}


const deleteVehicule = (req, res) => {
    const userId = req.user;
    const vehiculeId = req.params.id;
    Vehicule.findOneAndDelete({ _id: vehiculeId, userId }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Vehicule deleted with success !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const updateVehicule = (req, res) => {
    const userId = req.user;
    const vehiculeId = req.params.id;
    const { mark, model, color, year, category, motorization, power } = req.body;
    Vehicule.findOneAndUpdate({ _id: vehiculeId, userId }, {
        mark,
        model,
        color,
        year,
        category,
        motorization,
        power,
    }, (err, doc) => {
        if (!err) {
            res.status(200).send(doc);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

module.exports = {
    userVehiculesList,
    vehiculeDetails,
    createVehicule,
    updateVehicule,
    deleteVehicule,
};