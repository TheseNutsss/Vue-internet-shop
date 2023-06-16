export default {
    state: {
        isAuth: false,
        userCredentials: false
    },
    mutations: {
        SET_AUTH(state, user) {
           if(user){
            state.isAuth = true
            state.userCredentials = JSON.parse(user)
           } else {
            state.isAuth = false
            state.userCredentials = false
           }
        }
    },
    actions: {
        logOut(context, user){
            sessionStorage.removeItem('auth')
            context.commit('SET_AUTH', false)
        }
    }
}