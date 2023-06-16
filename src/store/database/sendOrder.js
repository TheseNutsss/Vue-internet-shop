import db from "@/firebase/init.js"
import { collection, addDoc } from "firebase/firestore";
import router from "@/router/router.js"
export default {
    state: {
        userOrderRef: ''
    },
    mutations: {
        SET_USER_ORDER_REF(state, ref){
            state.userOrderRef = ref
        }
    },
    actions: {
        async send_order(context, order){
            console.log('send order vuex')
            const docRef = await addDoc(collection(db, "Orders"), order);
            context.commit('SET_USER_ORDER_REF', docRef.id)
            router.push('/order-success')
        }
    }
}