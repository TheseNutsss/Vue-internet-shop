export default {
    state: {
    },
    mutations: {
        SET_FILTERED_PRODUCTS(context, products){
            this.state.filteredProducts = products
        },
        SET_FILTER(context, filterObj){
            console.log(filterObj)
            this.state.filter = filterObj
        }
    },
    actions: {
        /* filterPrice(context, priceRange){
            const filteredProducts = this.state.showedProducts.filter(product=> product.price >= parseInt(priceRange.min) && product.price <= parseInt(priceRange.max) ? product : '')
            context.commit('SET_FILTERED_PRODUCTS', filteredProducts)
        }, */
        filter(context, filterObj){
            let filteredProducts = []
            if(filterObj.category.length){
                filterObj.category.forEach(category => {
                    this.state.products.forEach(product => {
                        if(category === product.categoryFilter){
                            if(filterObj.subcategory.length){
                                if(product.hasOwnProperty('subcategoryFilter')){
                                    console.log("popal")
                                    filterObj.subcategory.forEach(subcategory=>{
                                        product.subcategoryFilter === subcategory ? filteredProducts.push(product) : ''
                                    })
                                }
                            } else {
                                filteredProducts.push(product)
                            }
                        }
                    })
                })
            }
            if(filteredProducts.length){
                if(filterObj.priceFrom && filterObj.priceTo){
                    filteredProducts = filteredProducts.filter(product=> product.price >= filterObj.priceFrom && product.price <=filterObj.priceTo)
                } else if(filterObj.priceFrom){
                    filteredProducts = filteredProducts.filter(product=> product.price >= filterObj.priceFrom)
                } else if(filterObj.priceTo){
                    filteredProducts = filteredProducts.filter(product=> product.price <= filterObj.priceTo)
                }
            } else {
                if(filterObj.priceFrom && filterObj.priceTo){
                    filteredProducts = this.state.showedProducts.filter(product=> product.price >= filterObj.priceFrom && product.price <=filterObj.priceTo)
                } else if(filterObj.priceFrom){
                    filteredProducts = this.state.showedProducts.filter(product=> product.price >= filterObj.priceFrom)
                } else if(filterObj.priceTo){
                    filteredProducts = this.state.showedProducts.filter(product=> product.price <= filterObj.priceTo)
                }
            }
        console.log(filteredProducts)
        context.commit('SET_FILTERED_PRODUCTS', filteredProducts)
        }
        
    }
}