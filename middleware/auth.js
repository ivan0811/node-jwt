const jwt = require('jsonwebtoken')
const { readToken } = require('../models/Token')
require('dotenv/config')

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)    
    const getToken = await readToken
    if(getToken.indexOf(token) == -1) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
        if (err) return res.sendStatus(403)
        req.id = id        
        next()
    })
}