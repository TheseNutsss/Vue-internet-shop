export default {
    state: {
        popUp: false,
        product: [],
        type: ''
    },
    mutations:{
        SET_POPUP(state){
            state.popUp = !state.popUp
        },
        SET_PRODUCT(state, product){
            state.product = product
        },
        SET_TYPE(state, type){
            state.type = type
        }
    },
}