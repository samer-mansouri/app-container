const isAdmin = (req, res, next) => {
    console.log("Req.admin == ", req.admin);
    if (req.admin == true) {
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = isAdmin;