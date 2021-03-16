const jwt = require("jsonwebtoken")
require("dotenv").config();
const secret = process.env.JWT_SECRET;


module.exports = (req, res, next) => {
    const { headers: { authorization } } = req

    try {
        // Bearer <token>

        const token = authorization.replace('Bearer ', '')
        if (!token) {
            console.log('no token')
            return res.sendStatus(403).send('No token provided.');


        } else {
            jwt.verify(token, secret, (err, user) => {
                if (err) return res.sendStatus(403).send(token);

                req.user = user.id

                next()

            });
        }

    } catch (error) {
        throw new Error(error.message)
    }
}