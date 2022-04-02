const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservation');
const Trajet = mongoose.model('Trajet');

createReservation = async (req, res) => {
    const userId = req.user;
    const status = "pending";
    const { trajetId } = req.body;
    await new Reservation({
        userId,
        trajetId,
        status,
    }).save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'message': 'Reservation created with success !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })

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


reservationSetStatusCancelled = async (req, res) => {
    const userId = req.user;
    const reservationId = req.params.id;
    const status = "cancelled";
    await Reservation.findOneAndUpdate({ _id: reservationId, userId }, { status }, (err, doc) => {
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