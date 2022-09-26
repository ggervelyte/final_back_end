const express = require('express')
const router = express.Router()

const {
    register,
    login,
    upload,
    getUsers,
    filter,
    uploadLikes,
    getAllLikes,
    autoLogin
} = require('../controllers/mainController')
const { validateRegister } = require('../modules/validator')


router.post('/register', validateRegister, register)
router.post('/login', login)
router.post('/upload', upload)
router.get('/allUsers', getUsers)
router.post('/filter', filter)
router.post('/uploadLikes', uploadLikes)
router.get('/getLikes', getAllLikes)





module.exports = router