const mongoose = require('mongoose');
const Declaration = mongoose.model('Declaration');

const createDeclaration = (req, res) => {
    const userId = req.user;
    const { title, description } = req.body;
    const newDeclaration = new Declaration({
        userId,
        title,
        description,
    });
    newDeclaration.save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'message': 'Declaration created with success !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

const deleteDeclaration = (req, res) => {
    const userId = req.user;
    const declarationId = req.params.id;
    Declaration.findOneAndDelete({ _id: declarationId, userId }, (err, doc) => {
        if (!err) {
            res.status(200).send({ 'message': 'Declaration deleted with success !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

module.exports = {
    createDeclaration,
    deleteDeclaration,
}