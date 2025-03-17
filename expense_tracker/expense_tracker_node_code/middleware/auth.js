const jwt = require('jsonwebtoken')

const authenticationToken = (req, res, next) => {
    const token = req.headers('Authorization')?.split(' ')[1]
    console.log("Token in middleware", token)
    if (!token) {
        return res.status(400).json({ message: "Access deined" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECERT)
        req.user = decoded
        next()
    }
    catch (err) {
        console.log("Error in middleware portion", err)
        return res.status(403).json({ message: 'Invalid or expired token' })
    }
}

module.exports = authenticationToken