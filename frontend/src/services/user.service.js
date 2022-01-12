import { httpService } from './http.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USERS_KEY='usersDB'

export const userService={
    setUsers,
    getUsers,
    getLoggedinUser,
    login,
    signup,
    logout,
    update
}

function setUsers(currUsers){
sessionStorage.setItem(USERS_KEY,JSON.stringify(currUsers))
}


function getUsers(){
    return JSON.parse(sessionStorage.getItem(USERS_KEY) || "null")
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(usercred) {
    // const usercred = { username, password }
    const user = await httpService.post('auth/login', usercred)
        // socketService.emit('set-user-socket', user._id);
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    console.log(userCred);
    const user = await httpService.post('auth/signup', userCred)
        // socketService.emit('set-user-socket', user._id);
        console.log(user);
    _saveLocalUser(user)
    return user
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        // socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}