const jwt = require('jsonwebtoken')
require('dotenv').config()

const clientMiddleware = (req, resp, next) => {
    const token = req.headers.authorization
    try {
        if (token) {
            const { _id } = jwt.verify(token, process.env.SECRET_KEY)
            // console.log('id from middleware', token, 'secretKey')

            if (_id) {
                req.clientId = _id
                next();
            }
        }
        else {
            resp.json({ success: false, message: "Access denied. Token expired" })
        }
    }
    catch (err) {
        console.log('err in client middleware',err)
        resp.json({ success: false, message: err })
    }
}
module.exports = clientMiddleware