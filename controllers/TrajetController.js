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
    console.log(req.user)
    searchQuery = Trajet.find({}).populate("user", "firstName lastName picture").sort('-createdAt');
    searchQuery.exec((err, docs) => {
       if(!err){
        let i = 0;
        docs = docs.map(doc => {
            let query = Reservation.find({  userId , trajetId: doc._id }) 
            query.exec((err, d) =>{
                if(!err){
                    if(d.length > 0){
                        doc.set("reservationStatus", d[0].status, {strict: false});
                    } else {
                        doc.set("reservationStatus", "none", {strict: false});
                    }
                    if(i == docs.length){
                        res.status(200).send(docs);
                    }
                } else {
                    console.log(err);
                    res.status(500).send({"Error": "Internal Server Error"})
                }
            })
            i++;

                return doc;
            
        })
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