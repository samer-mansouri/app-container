const express = require('express');
const router = express.Router();

const {
    createDeclaration,
    deleteDeclaration
} = require('../controllers/DeclarationController');
const isAuthenticated = require('../middlewares/isAuthenticated');



router.post('/declaration', isAuthenticated, createDeclaration);
router.delete('/declaration/:id', isAuthenticated, deleteDeclaration);


module.exports = { router };