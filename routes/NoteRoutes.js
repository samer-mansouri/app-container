const express = require('express');
const router = express.Router();

const {
    addNote,
    getNote,
} = require('../controllers/NoteController');
const isAuthenticated = require('../middlewares/isAuthenticated');



router.post('/note/:id', isAuthenticated, addNote);
router.get('/note/:id', isAuthenticated, getNote);

module.exports = { router };