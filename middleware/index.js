const auth = require('basic-auth');
const User = require('../models/user');

const authenticateUser = (req, res, next) => {
    const credentials = auth(req);
    // If the user's credentials are available...
    if (credentials) {
        User.authenticate(credentials.name, credentials.pass, (err, user) => {
            if (err || !user) {
                const err = new Error("Incorrect username or password.");
                err.status = 401;
                return next(err);
              }
            req.currentUser = user;
            return next();
        });
    } else {
        const err = new Error('Credentials not found.');
        err.status = 401;
        return next(err);
    }
};

module.exports.authenticateUser = authenticateUser;