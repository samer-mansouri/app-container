const mongoose = require('mongoose');
const Note = mongoose.model('Note');


const addNote = (req, res) => {
    const userNoted = req.user;
    const userWhoNotes = req.params.id;
    const note = req.body.note;
    const newNote = new Note({
        userNoted,
        userWhoNotes,
        note,
    });
    newNote.save((err, doc) => {
        if (!err) {
            res.status(201).send({ 'message': 'Note created with success !' });
        } else {
            console.log(err);
            res.status(500).send({"Error": "Internal Server Error"})
        }
    })
}

module.exports = {
    addNote,
}