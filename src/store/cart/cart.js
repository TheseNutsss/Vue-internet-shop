export default {
    state: {
        cart: [],
        totalSumInCart: '',
    },
    mutations: {
        SET_CART(state, products){
            console.log('SET_CART')
            const cart = []
            products = JSON.parse(products)
                products.forEach(productInCart=>{
                    this.state.products.forEach(product=>{
                        if(productInCart.id === product.id){
                            const neededProduct = Object.assign({}, product)
                            product.inCart = true
                            neededProduct.count = productInCart.count
                            neededProduct.inCart = true
                            cart.push(neededProduct)
                        }
                    })
                });
            state.cart = cart
        },
        ADD_TO_CART(state, productToCart){
            this.state.products.forEach(product => {
                productToCart.id === product.id ? product.inCart == false ? product.inCart = true : '' : ''
            })
            const findProduct = state.cart.find(productInCart => productInCart.id == productToCart.id)
            if(!findProduct){
                console.log('if', productToCart)
                productToCart.count = 1
                productToCart.inCart = true
                state.cart.push(productToCart);
            } else {
                findProduct.count++
            }
        },
        DELETE_PRODUCT(state, productToDelete){
            console.log('DELETE_PRODUCT', productToDelete)
            state.cart.splice(state.cart.findIndex(productInCart => productInCart.id == productToDelete.id), 1)
            this.state.products.find(productToFind => productToFind.id == productToDelete.id).inCart = false
        },
        CLEAR_CART(state){
            state.cart = []
        },
        SET_TOTAL_PRICE(state, sum){
            state.totalSumInCart = sum
        }
    },
    actions: {
        addToCart(context, productId){
            console.log('addToCart', productId)
            //console.log("addToCart METHOD"+ "id товара, который добавили в корзину "+ productId)
            if(localStorage.getItem('cart')){
                //товары в корзине уже есть
                //console.log("товары в корзине уже есть")
                let cart = []
                cart = JSON.parse(localStorage.getItem('cart'))
                cart.find(productInCart => productInCart.id == productId ? productInCart.count++ : '') ? '' : cart.push({id: productId, count: 1})
                localStorage.setItem("cart", JSON.stringify(cart))
                context.commit('ADD_TO_CART', Object.assign({}, this.state.products.find(product=>product.id == productId)))
            } else {
                //первый товар в корзину
                //console.log('первый товар в корзину')
                localStorage.setItem("cart", JSON.stringify([{id: productId, count: 1}]))
                console.log(Object.assign({}, this.state.products.find(product=>product.id == productId)))
                context.commit('ADD_TO_CART', Object.assign({}, this.state.products.find(product=>product.id == productId)))
            }
            context.commit('SET_POPUP')
        },
        updateCountProduct(context, product){
            console.log(product)
            const cart = JSON.parse(localStorage.getItem('cart'))
            const {productId, productCount} = {productId : product.id, productCount: product.count}
            cart.find(productInCart=> productInCart.id == productId ? productInCart.count = productCount : '')
            localStorage.setItem("cart", JSON.stringify(cart))
            context.commit('SET_CART', JSON.stringify(cart))
        },
        deleteProduct(context, productToDelete){
            console.log('deleteProduct')
            const cart = JSON.parse(localStorage.getItem('cart'))
            const updatedCart = cart.filter(productInCart=>productInCart.id !== productToDelete.id)
            if(updatedCart.length){
                localStorage.setItem("cart", JSON.stringify(updatedCart))
                context.commit('DELETE_PRODUCT', productToDelete)   
            } else {
                localStorage.removeItem('cart')
                console.log(productToDelete)
                context.commit('DELETE_PRODUCT', productToDelete)
            }   
        },
        clearCart(context){
            localStorage.removeItem('cart')
            context.commit('CLEAR_CART')
        },
        totalSumInCart(context){
            const sum = this.state.cart.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.count), 0)
            context.commit('SET_TOTAL_PRICE', sum)       
        }
    }
}