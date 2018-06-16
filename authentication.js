const jwt = require('jsonwebtoken');


exports.onlyAdmin = function(req, res, next) {
    // Check header for token
    let token = req.headers['x-access-token'];

    //Get user type from token
    let type =token.slice(-1);
    console.log(type);
    token = token.slice(0, -1);

    // Check if token has been sent
    if (token) {
        // Verify token
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err||type!=='A') {
                // Invalid token
                return res.json({
                    success: false,
                    message: 'Unauthorised User'
                });
            }
            else {
                // If everything is good, save to request for use in other routes
                req.decoded = decoded;
                return next();
            }
        });
    }
    else {
        // No token
        return res.json({
            success: false,
            message: 'Unauthorised'
        });
    }
};