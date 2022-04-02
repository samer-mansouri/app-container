const mongoose = require('mongoose');
const Trajet = mongoose.model('Trajet');
const { initializeTrajet } = require('../helpers/TrajetHelpers');

const getAllTrajets = (req, res) => {
    Trajet.find({}, (err, doc) => {
        if (!err) {
            res.status(200).send(doc);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

getAllTrajetsWithPagination = (req, res) => {
    const { page, limit } = req.query;
    Trajet.find({})
        .skip(page * limit)
        .limit(limit)
        .exec((err, doc) => {
            if (!err) {
                res.status(200).send(doc);
            } else {
                console.log(err);
                res.status(500).send({"Error": "Internal Server Error"})
            }
        })
}

const getTrajet = (req, res) => {
    const trajetId = req.params.id;
    Trajet.findOne({ _id: trajetId }, (err, doc) => {
        if (!err) {
            res.status(200).send(doc);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const trajetsSimpleSearch = (req, res) => {
    const { placeOfDeparture, placeOfDestination, departureTime } = req.body;
    Trajet.find({
        placeOfDeparture: placeOfDeparture,
        placeOfDestination: placeOfDestination,
        departureTime: departureTime,
    }, (err, doc) => {
        if (!err) {
            res.status(200).send(doc);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}


const createTrajet = async (req, res) => {
    const userId = req.user;
    const {
        vehiculeId,
        placeOfDeparture,
        placeOfDestination,
        departureTime,
        pathTaken,
        availableSeats,
        price,
        phoneNumber,
    } = req.body;
    await initializeTrajet(
        userId,
        vehiculeId,
        placeOfDeparture,
        placeOfDestination,
        departureTime,
        pathTaken,
        availableSeats,
        price,
        phoneNumber,
    ).save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'message': 'Trajet created with success !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const updateTrajet = (req, res) => {
    const userId = req.user;
    const trajetId = req.params.id;
    const {
        vehiculeId,
        placeOfDeparture,
        placeOfDestination,
        departureTime,
        pathTaken,
        availableSeats,
        price,
        phoneNumber,
    } = req.body;
    Trajet.findOneAndUpdate(
        { _id: trajetId, userId },
        {
            vehiculeId,
            placeOfDeparture,
            placeOfDestination,
            departureTime,
            pathTaken,
            availableSeats,
            price,
            phoneNumber,
        },
        { new: true },
        (err, doc) => {
            if (!err) {
                res.status(200).send({ 'message': 'Trajet updated with success !' });
            } else {
                console.log(err);
                res.status(500).send({"Error": "Internal Server Error"})
            }
        }
    )
}

const deleteTrajet = (req, res) => {
    const userId = req.user;
    const trajetId = req.params.id;
    Trajet.findOneAndDelete({ _id: trajetId, userId }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Trajet deleted with success !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

module.exports = {
    getAllTrajets,
    getTrajet,
    trajetsSimpleSearch,
    createTrajet,
    updateTrajet,
    deleteTrajet,
}