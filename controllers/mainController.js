const sendRes = require('../modules/sendRes')
const userDb = require('../schemas/userSchema')
const likesDb = require('../schemas/likeSchema')
const bcrypt = require('bcrypt')


module.exports = {
    register: async (req, res) => {
        const { username, passOne, city, gender, year } = req.body
        const password = await bcrypt.hash(passOne, 10)

        let users = await userDb.find()
        const asd = users.map(x => x.username)

        if (city === '' && gender === '' && year === '') return sendRes(res, 'Please fill all fields', true)

        if (asd.includes(username)) {
            return sendRes(res, 'Username already exists', true)
        } else {
            const user = new userDb({
                username,
                password,
                city,
                gender,
                year
            })

            await user.save()
            return sendRes(res, 'all good', false)
        }
    },
    login: async (req, res) => {
        const { username, password } = req.body

        const user = await userDb.findOne({ username })

        if (!user) return sendRes(res, "User not found!", true)

        const compare = await bcrypt.compare(password, user.password)
        if (!compare) return sendRes(res, "Bad credentials", true)

        if (user) {
            const likes = await likesDb.find()
            const getLikes = likes.map(x => {
                if (x.user === user.username) {
                    return x
                }
            })

            console.log(getLikes);
            return sendRes(res, 'All good', false, { user, likes })
        }



    },
    upload: async (req, res) => {
        const { username, url } = req.body
        // console.log(username);
        // const findUser = await userDb.findOne({ username })
        // console.log(findUser.image.length);
        if (url === '') return sendRes(res, 'Please fill the field', true)
        await userDb.findOneAndUpdate({ username: username }, { $push: { image: url } }, { new: true })
        const user = await userDb.findOne({ username })
        return sendRes(res, 'Update is ok', false, { user })

    },
    getUsers: async (req, res) => {
        let allUsers = await userDb.find()
        // console.log(allUsers);
        return sendRes(res, 'all users', false, { allUsers })
    },
    filter: async (req, res) => {
        const { city, gender, year } = req.body
        let allUsers = await userDb.find()
        const filtered = allUsers.filter(x => x.city === city && x.gender.toUpperCase() === gender.toUpperCase() && x.gender.toLowerCase() === gender.toLowerCase() && x.year === year)
        // console.log(city, gender, year);
        return sendRes(res, 'filtered users', false, { filtered })
    },
    uploadLikes: async (req, res) => {
        const { username, image, user } = req.body
        // console.log(username, image);
        const likes = new likesDb({
            user,
            username,
            image
        })

        await likes.save()
        // const like = await likesDb.find({ username: username })
        // console.log(like);

        sendRes(res, 'ok', false, { likes })
    },
    getAllLikes: async (req, res) => {
        const allLikes = await likesDb.find()

        return sendRes(res, 'all likes', false, { allLikes })
    }
}