const isAdmin = (req, res, next) => {
    if (req.admin) {
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = isAdmin;