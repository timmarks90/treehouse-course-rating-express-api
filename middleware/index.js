const auth = require('basic-auth');
const User = require('../models/user');

const authenticateUser = (req, res, next) => {
    const credentials = auth(req);
    // If the user's credentials are available...
    console.log(credentials);
    if (credentials) {
        User.authenticate(credentials.name, credentials.pass, function(err, user) {
            if (err) {
              return next(err);
            } else if (!user) {
              const err = new Error("User not found.");
              err.status = 401;
              return next(err);
            } else if (user) {
              req.currentUser = user;
              return next();
            }
        });
    } else {
        const err = new Error("Auth header not found");
        err.status = 401;
        return next(err);
    }
};

module.exports.authenticateUser = authenticateUser;