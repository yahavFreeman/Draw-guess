const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { username, password, score } = req.body
    try {
        const user = await authService.login(username, password , score)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        console.log(req.body);
        const { username, password, score } = req.body
        const account = await authService.signup(username, password ,score)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(username, password,score)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        // req.session.destroy()
        req.session.user = null;
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}