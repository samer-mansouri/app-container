const mongoose = require('mongoose');
const Covoiturage = mongoose.model('Covoiturage');

const createCovoiturage = async (req, res) => {
    const userId = req.user;
    const { lieuDepart, lieuArrivee, heureDepart, cause } = req.body;
    await new Covoiturage({
        userId,
        lieuDepart,
        lieuArrivee,
        heureDepart,
        cause,
    }).save((err, doc) => {
        if (!err) {
            Covoiturage.findOne({ _id: doc._id })
            .populate("user", "firstName lastName picture")
            .exec((err, covoiturage) => {
                if (!err) {
                    res.status(201).send({ 
                        'message': 'Covoiturage created with success !',
                        'covoiturage': covoiturage
                    });
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

const updateCovoiturage = async (req, res) => {
    const userId = req.user;
    const covoiturageId = req.params.id;
    const { lieuDepart, lieuArrivee, heureDepart, cause } = req.body;
    Covoiturage.findOneAndUpdate({ _id: covoiturageId, userId }, { lieuDepart, lieuArrivee, heureDepart, cause }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Covoiturage updated with success !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const deleteCovoiturage = async (req, res) => {
    const userId = req.user;
    const covoiturageId = req.params.id;
    Covoiturage.findOneAndDelete({ _id: covoiturageId, userId }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Covoiturage deleted with success !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const getCovoiturage = async (req, res) => {
    const userId = req.user;
    const covoiturageId = req.params.id;
    Covoiturage.findOne({ _id: covoiturageId, userId }, (err, doc) => {
        if (!err) {
            res.status(200).send(doc);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const getAllCovoiturageList = (req, res) => {
    Covoiturage.find({})
    .populate("user", "firstName lastName picture")
    .sort({ createdAt: -1 })
    .exec((err, covoiturages) => {
        if (!err) {
            res.status(200).send(covoiturages);
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

module.exports = {
    createCovoiturage,
    updateCovoiturage,
    deleteCovoiturage,
    getCovoiturage,
    getAllCovoiturageList,
}
