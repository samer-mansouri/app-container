const mongoose = require('mongoose');
const User = mongoose.model('User');
const Trajet = mongoose.model('Trajet');
const Vehicule = mongoose.model('Vehicule');
const Declaration = mongoose.model('Declaration');



const usersList = (req, res) => {
    User.find({ isAdmin: false }, (err, docs) => {
        if (!err) {
            res.status(200).send({
                'message': 'Users list',
                'users': docs
            });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const deleteUser = (req, res) => {
    const userId = req.params.id;
    User.findOneAndDelete({ _id: userId }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'User deleted with success !', "id": doc._id });
        }
        else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const updateUser = (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, picture } = req.body;
    User.findOneAndUpdate({ _id: userId }, { firstName, lastName, email, picture }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'User updated with success !' });
        }
        else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const showAllTrajets = (req, res) => {
    Trajet.find({})
    .exec((err, docs) => {
        if (!err) {
            res.status(200).send({
                'message': 'Trajets list',
                'trajets': docs
            });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const deleteTrajet = (req, res) => {
    const trajetId = req.params.id;
    Trajet.findOneAndDelete({ _id: trajetId }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Trajet deleted with success !', "id": doc._id });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const vehiculeList = (req, res) => {
    Vehicule.find({})
    .exec((err, docs) => {
        if (!err) {
            res.status(200).send({
                'message': 'Vehicules list',
                'vehicules': docs
            });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}
    

const deleteVehicule = (req, res) => {
    const vehiculeId = req.params.id;
    Vehicule.findOneAndDelete({ _id: vehiculeId }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Vehicule deleted with success !', "id": doc._id });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const approuveUser = (req, res) => {
    const userId = req.params.id;
    User.findOneAndUpdate({ _id: userId }, { isVerified: true }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'User approved with success !' });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const confirmVehicule = (req, res) => {
    const vehiculeId = req.params.id;
    Vehicule.findOneAndUpdate({ _id: vehiculeId }, { isConfirmed: true }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Vehicule confirmed with success !' });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const confirmTrajet = (req, res) => {
    const trajetId = req.params.id;
    Trajet.findOneAndUpdate({ _id: trajetId }, { isConfirmed: true }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Trajet confirmed with success !' });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const getDeclarations = (req, res) => {
    Declaration.find({})
    .populate('user', '_id firstName lastName email picture')
    .exec((err, docs) => {
        if (!err) {
            res.status(200).send({
                'message': 'Declarations list',
                'declarations': docs
            });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const deleteDeclaration = (req, res) => {
    const declarationId = req.params.id;
    Declaration.findOneAndDelete({ _id: declarationId }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Declaration deleted with success !', "id": doc._id });
        } else {
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}




module.exports = {
    usersList,
    deleteUser,
    updateUser,
    showAllTrajets,
    deleteTrajet,
    deleteVehicule,
    vehiculeList,
    approuveUser,
    confirmVehicule,
    confirmTrajet,
    getDeclarations,
    deleteDeclaration
}
