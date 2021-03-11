const jwt = require("jsonwebtoken")
require("dotenv").config();


//ACCESS TOKEN SECRET
const secret = process.env.TOKEN_SECRET;


module.exports = (req, res, next) => {
    const { headers: { authorization } } = req

    try {
        // Bearer <token>
        debugger
        const token = authorization.replace('Bearer ', '')
        console.log(token)
        if (!token) {
            return res.sendStatus(403).send({ auth: false, message: 'No token provided.' });


        } else {
            jwt.verify(token, secret, (err, user) => {
                if (err) return res.sendStatus(403).send({ auth: false, message: 'Failed to authenticate token.' });
                req.user = user
                next()

            });
        }

    } catch (error) {
        throw new Error(error.message)
    }
}