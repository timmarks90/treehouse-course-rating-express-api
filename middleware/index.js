const auth = require('basic-auth');
const bcrypt = require('bcrypt');

const authenticateUser = (req, res, next) => {
    let message = null;
    
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);
    
    // If the user's credentials are available...
    if (credentials) {
        const user = user.find(u => u.username === credentials.name);

        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            
            if(authenticated) {
                console.log(`Authentication successful for username: ${user.username}`);
                req.currentUser = user;
            } else {
                message = `Authentication failure for username: ${user.username}`;
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        // Return a response with a 401 Unauthorized HTTP status code.
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }
};

module.exports.authenticateUser = authenticateUser;