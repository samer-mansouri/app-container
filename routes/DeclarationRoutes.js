const express = require('express');
const router = express.Router();

const {
    createDeclaration,
    deleteDeclaration,
    getDeclarations,
    getDeclaration,
} = require('../controllers/DeclarationController');
const isAuthenticated = require('../middlewares/isAuthenticated');


router.get('/', isAuthenticated, getDeclarations);
router.get('/:id', isAuthenticated, getDeclaration);
router.post('/declaration', isAuthenticated, createDeclaration);
router.delete('/declaration/:id', isAuthenticated, deleteDeclaration);


module.exports = { router };