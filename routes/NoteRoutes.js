const express = require('express');
const router = express.Router();

const {
    addNote,
} = require('../controllers/NoteController');
const isAuthenticated = require('../middlewares/isAuthenticated');



router.post('/notes', isAuthenticated, addNote);

module.exports = { router };