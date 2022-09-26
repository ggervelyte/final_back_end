const sendRes = require('../modules/sendRes')

module.exports = {
    validateRegister: (req, res, next) => {
        const { passOne, passTwo } = req.body

        if (passOne !== passTwo) return sendRes(res, 'Passwords does not match!', true)

        next()
    }
}