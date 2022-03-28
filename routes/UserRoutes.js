const express = require('express');
var router = express.Router();
const { 
    createUser, 
    handleLogin, 
    handleLogout,
    handleRefreshToken
} = require('../controllers/UserController');
const isAuthenticated = require('../middlewares/isAuthenticated');


router.post('/register', createUser);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.get('/refresh', handleRefreshToken)
router.get('/test', isAuthenticated, (req, res) => {
    res.send({"Message": "Authenticated and able to see this"})
})

module.exports = { router };