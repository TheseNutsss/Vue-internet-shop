export default {
    state:{
        wishlist: []
    },
    mutations:{
        SET_WISHLIST(state, products){
            const wishlist = []
            products = JSON.parse(products)          
            products.forEach(wishProduct => {
                this.state.products.forEach(product => {
                    if(wishProduct === product.id){
                        product.wishlist = true
                        wishlist.push(product)
                    }
                })
            });
            state.wishlist = wishlist
        },
        UPDATE_WISHLIST(state, wishProduct){
            console.log('UPDATE_WISHLIST')
            this.state.products.forEach(product => {
                wishProduct === product.id ? product.wishlist = !product.wishlist : ''
            })
        },
        CLEAR_WISHLIST(state){
            this.state.products.forEach(product=> product.wishlist ? product.wishlist = false : '')
        }
    },
    actions:{
        addToWishlist(context, product){
            if(localStorage.getItem('wishlist')){
                //Избранное уже есть
                const wishlist = JSON.parse(localStorage.getItem('wishlist'))
                if(wishlist.includes(product)){
                    //удаляем из избранного
                    wishlist.splice(wishlist.findIndex(wishProduct=> wishProduct == product), 1)
                    if(wishlist.length){
                        context.commit('UPDATE_WISHLIST', product)
                        localStorage.setItem('wishlist', JSON.stringify(wishlist))
                        context.commit('SET_WISHLIST', JSON.stringify(wishlist))
                    } else {
                        context.commit('CLEAR_WISHLIST')
                        localStorage.removeItem('wishlist')
                        context.commit('SET_WISHLIST', JSON.stringify([]))
                    }
                } else {
                    //добавляем
                    wishlist.push(product)
                    localStorage.setItem('wishlist', JSON.stringify(wishlist))
                    context.commit('UPDATE_WISHLIST', product)
                    context.commit('SET_WISHLIST', JSON.stringify(wishlist))
                }
            } else {
                //Первое добавление в избранное
                console.log('Первое добавление в избранное')
                localStorage.setItem('wishlist', JSON.stringify([product]))
                context.commit('SET_WISHLIST', JSON.stringify([product]))
            }
            //this.state.products.forEach(product => product.wishlist ? console.log(product): '')
        }
    }
}