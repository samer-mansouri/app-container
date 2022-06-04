const express = require('express')
const router = express.Router()

const {
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
} = require('../controllers/AdminController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin')

router.get('/users', isAuthenticated, isAdmin, usersList);
router.delete('/admin_users/:id', isAuthenticated, isAdmin, deleteUser);
router.put('/admin_users/:id', isAuthenticated, isAdmin, updateUser);
router.get('/admin_trajets', isAuthenticated, isAdmin, showAllTrajets);
router.delete('/admin_trajets/:id', isAuthenticated, isAdmin, deleteTrajet);
router.delete('/admin_vehicules/:id', isAuthenticated, isAdmin, deleteVehicule);
router.get('/admin_vehicules', isAuthenticated, isAdmin, vehiculeList);
router.post('/admin_users/:id', isAuthenticated, isAdmin, approuveUser);
router.post('/admin_vehicules/:id', isAuthenticated, isAdmin, confirmVehicule);
router.post('/admin_trajets/:id', isAuthenticated, isAdmin, confirmTrajet);
router.get('/admin_declarations', isAuthenticated, isAdmin, getDeclarations);
router.delete('/admin_declarations/:id', isAuthenticated, isAdmin, deleteDeclaration);

module.exports = { router };