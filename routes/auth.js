const express = require('express')
const router = express.Router()

const {
    login,
    logout,
    profile,
    hashPass,
    getUsers,
    getToken
} = require('../controllers/auth')

const { authenticateToken } = require('../middleware/auth')

router.post('/generate-pass', hashPass)
router.get('/profile', authenticateToken, profile)
router.post('/login', login)
router.get('/get-users', getUsers)
router.get('/get-token', getToken)
router.delete('/logout', authenticateToken, logout)

module.exports = router