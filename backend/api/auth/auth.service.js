const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(username, password, score) {
    logger.debug(`auth.service - login with username: ${username}`)


    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup(username, password, score) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}`)
    if (!username) return Promise.reject('username required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash , score})
}

module.exports = {
    signup,
    login,
}