const mongoose = require('mongoose');
const Note = mongoose.model('Note');


const createNote = (req, res) => {
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


const addNote = async (req, res) => {
    const sender = req.user;
    const receiver = req.params.id;
    const note = req.body.note;
    const checkNote = await Note.findOne({ sender, receiver });
    if (checkNote) {
        Note.findOneAndUpdate({ sender, receiver }, { note }, (err, doc) => {
            if (!err) {
                res.status(201).send({ 'message': 'Note updated with success !' });
            } else {
                console.log(err);
                res.status(500).send({"Error": "Internal Server Error"})
            }
        })
    } else {
        const newNote = new Note({
            sender,
            receiver,
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
}

const getNote = async (req, res) => {
    const sender = req.user;
    const receiver = req.params.id;
    const note = await Note.findOne({ sender, receiver });
    if (note) {
        res.status(200).send(note);
    } else {
        res.status(404).send({ "Error": "Note not found" });
    }
}

module.exports = {
    addNote,
    getNote
}