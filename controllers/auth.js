const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { users } = require('../models/User')
const { readToken, saveToken, deleteToken } = require('../models/Token')
const fs = require('fs')
require('dotenv/config')

exports.hashPass = async (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.sendStatus(403)
            res.status(200).json({hash})          
        })
    })
}

exports.getToken = async (req, res) => {
    res.status(200).json({
        token: await readToken
    })
}

exports.getUsers = async (req, res) => {    
    res.status(200).json({ user: await users().then((res) => res[0]).catch(err => console.error(err)) })    
}

exports.profile = async (req, res) => {    
    res.status(200).json(await users()
    .then(res => res.filter(user => user._id === req.id))
    .catch(err => console.error(err)))
}

exports.login = async (req, res) => {
    const user = await users().then((res) => res[0]).catch(err => console.error(err))    
    const { username, password } = req.body    
    bcrypt.compare(password, user.password, async (err, result) => {
        if (err) return res.sendStatus(402)        
        if (user.username === username && result) {
            const accessToken = jwt.sign(user._id, process.env.ACCESS_TOKEN_SECRET)            
            const status = await saveToken(accessToken)
            if(status) res.status(200).json({ accessToken })
        } else {
            res.sendStatus(401)    
        }
    })        
}

exports.logout = async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]    
    await deleteToken(token) ?
        res.status(200).json('Delete Success')
        : res.sendStatus(401)
}