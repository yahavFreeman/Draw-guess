import { userService } from "../services/user.service.js";
export const userStore = {
state: {
    user: userService.getLoggedinUser() || null,
    isDrawer:false,
    user1:userService.getUsers()? userService.getUsers()[0] : null,
    user2:userService.getUsers()? userService.getUsers()[1] : null,
},
getters:{
    user(state){
        return state.user
    },
    user1(state) {
        return state.user1.username
    },
    user2(state) {
        return state.user2.username
    },
    usersForRouter(state){
        if(state.currUsers.length>1){
        return state.currUsers
        }else{
            return null
        }
    },
    isDrawer(state){
        return state.isDrawer
    }
},
mutations:{
    setUser(state, { loginUser }) {
        state.user = loginUser
    },
    setDrawer(state) {
        state.isDrawer = true
    },
    setScore(state, {score}){
            state.user.score+=score
    },
    setUser2(state,{secondUser}){
        state.user2=secondUser
    },
    setUser1(state,{firstUser}){
        state.user1=firstUser
    }

},
actions:{
    async setUser({ commit }, { user }) {
        const loginUser = await userService.login(user);
        if (loginUser) {
            commit({ type: "setUser", loginUser })
            return true
        } else {
            return false
        }
    },
    async signUser({ commit }, { user }) {
        var loginUser = await userService.signup(user)
        commit({ type: "setUser", loginUser })
    },
    async logoutUser({ commit }) {
        await userService.logout()
        const loginUser = null
        commit({ type: 'setUser', loginUser })
    },
    async setUserScore({dispatch,commit, state}, {score}){
        console.log(score);
        commit({type:'setScore', score})
        await dispatch({ type: "setGame" });
        console.log(state.user);
        const updatedUser=await userService.update(state.user)
    },
    async setCompanions({commit},{companions}){
        console.log(companions);
        await userService.setUsers(companions)
        const firstUser=companions[0]
        const secondUser=companions[1]
        commit({type:"setUser2", secondUser})
        commit({type:"setUser1", firstUser})
    },
}
}