const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservation');
const Trajet = mongoose.model('Trajet');

createReservation = async (req, res) => {
    const userId = req.user;
    const status = "pending";
    const { trajetId } = req.body;
    Reservation.find({ trajetId, userId }, (err, doc) => {
        if (!err) {
            if (doc.length > 0 && doc[0].status == "pending") {
                res.status(400).json({
                    message: "Vous avez déjà une réservation pour ce trajet"
                });
            } else if (doc.length > 0 && doc[0].status == "canceled") {
                Reservation.findByIdAndUpdate(doc[0]._id, { status: "pending" }, (err, doc) => {
                    if (!err) {
                        res.status(200).json({
                            message: "Votre réservation a été réactivée"
                        });
                    } else {
                        res.status(400).json({
                            message: "Une erreur est survenue"
                        });
                    }
                });
            } else {
                const reservation = new Reservation({
                    userId,
                    trajetId,
                    status
                });
                reservation.save((err, doc) => {
                    if (!err) {
                        res.status(200).json({
                            message: "Votre réservation a bien été enregistrée"
                        });
                    } else {
                        res.status(400).json({
                            message: "Une erreur est survenue"
                        });
                    }
                });
            }
        } else {
            console.log(err)
            res.status(400).json({
                message: "Une erreur est survenue"
            });
        }
    });
}



reservationSetStatusConfirmed = async (req, res) => {
    const userId = req.user;
    const reservationId = req.params.id;
    const status = "confirmed";
    Reservation.find({ _id: reservationId } , (err, doc) => {
        if (!err) {
            if (doc.length > 0) {
                Trajet.findOneAndUpdate({ _id: doc[0].trajetId, userId, availableSeats: { $gt : 0 } }, { $inc :{ availableSeats: -1 }}, (err, doc1) => {
                    if(!err){
                        if(doc1.length > 0){
                            Reservation.findOneAndUpdate({ _id: reservationId }, { status }, (err, doc2) => {
                                if (!err) {
                                    res.status(200).send({ 'message': 'Reservation status to confirmed !' });
                                } else {
                                    console.log(err);
                                    res.status(500).send({"Error": "Internal Server Error"})
                                }
                            })
                        } else {
                            res.status(404).send({ 'message': 'Reservation with this trajet not found !' });
                        }
                    } else {
                        res.status(500).send({"Error": "Internal Server Error"})
                    }
                })
            } else {
                res.status(404).send({ "Error": "Reservation not found" });
            }
        }
        else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}


reservationSetStatusCancelled = (req, res) => {
    const userId = req.user;
    const trajetId = req.params.id;
    console.log(userId);
    Reservation.findOneAndUpdate({ trajetId , userId }, { status: "canceled" }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Reservation status to cancelled !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

module.exports = {
    createReservation,
    reservationSetStatusConfirmed,
    reservationSetStatusCancelled,
}