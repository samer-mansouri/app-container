const mongoose = require('mongoose');
const Trajet = mongoose.model('Trajet');
const User = mongoose.model('User');
const Reservation = mongoose.model('Reservation');
const { initializeTrajet } = require('../helpers/TrajetHelpers');

const getAllTrajets = (req, res) => {
    Trajet.find({}).populate("user", "firstName lastName picture").sort('-createdAt').exec((err, docs) => {
        if(!err){
            res.status(200).send(docs);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const getTrajtesWithUserReservationStatus = (req, res) => {
   
    const userId = req.user;
    Trajet.find({})
    .select('_id userId placeOfDeparture placeOfDestination departureTime')
    .populate("user", "firstName lastName picture")
    .sort('-createdAt').exec((err, docs) => {
            let len = docs.length;
            let counter = 0;
            docs = JSON.stringify(docs)
            docs = JSON.parse(docs)
            docs.map((doc) => {
                Reservation.findOne({ trajetId: doc._id, userId }, (err, reservation) => {
                    if (!err) {
                        if (reservation) {
                            doc.reservationStatus = reservation.status;
                        } else {
                            doc.reservationStatus = false;
                        }
                        counter++;
                        if (counter === len) {
                            res.status(200).send(docs);
                        }
                    } else {
                        console.log(err);
                        res.status(500).send({"Error": "Internal Server Error"})
                    }
                })
            })
        
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
    Trajet.findOne({ _id: trajetId })
    .populate("user", "firstName lastName picture")
    .populate("vehicule")    
    .exec((err, doc) => {
        doc = JSON.stringify(doc)
        doc = JSON.parse(doc)
        if (!err) {
            Reservation.findOne({ trajetId: trajetId, userId: req.user }, (err, reservation) => {
                if (!err) {
                    if (reservation) {
                        doc.reservationStatus = reservation.status;
                    } else {
                        doc.reservationStatus = false;
                    }        
                     res.status(200).send(doc);
                } else {
                    console.log(err);
                    res.status(500).send({"Error": "Internal Server Error"})
                }
            })
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
    }).populate("user", "firstName lastName picture").sort('-createdAt').exec((err, doc) => {
        if (!err) {
            res.status(200).send(doc);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const detailledSearch = (req, res) => {
    const { placeOfDeparture, placeOfDestination, departureTime, pathTaken, userGender } = req.body;
    Trajet.find({
        placeOfDeparture: placeOfDeparture,
        placeOfDestination: placeOfDestination,
        departureTime: departureTime,
        pathTaken: pathTaken,
    }).populate("user", "firstName lastName picture gender").sort('-createdAt').exec((err, docs) => {
        if (!err) {
            if(docs.length > 0){
                
                const filteredDocs = docs.filter(doc => doc.user.gender != userGender)
                res.status(200).send(filteredDocs);
            } else {
                res.status(200).send(docs);
            }
                
            
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
    detailledSearch,
    getTrajtesWithUserReservationStatus
}