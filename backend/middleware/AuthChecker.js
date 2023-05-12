const jwt = require('jsonwebtoken')
const checkIfUserIsAuthenticated = (req, res, next) => {

    try {
        const token = req.headers.authorization.split("Bearer:")[1]
        console.log(jwt.verify(token, "A_very_long_string_for_our_secret"))
        jwt.verify(token, "A_very_long_string_for_our_secret")
        next()

    } catch (error) {
        res.status(401).json({ message: `Authentication Failed ${error}` });

    }

}
module.exports = checkIfUserIsAuthenticated