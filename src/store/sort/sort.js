export default {
    state: {
       
    },
    mutations: {
        SET_SORTED_PRODUCTS(context, products){
            this.state.sortedProducts = products
        }
    },
    actions: {
        SORT_PRODUCTS(context, criteria){
            let sortedProducts
            switch (criteria) {
                case "default":
                    //console.log("default")  
                    sortedProducts = []
                    break;
                case "priceAsc":
                    //console.log("priceAsc")
                    if(this.state.filteredProducts.length){
                        sortedProducts = Array.from(this.state.filteredProducts)
                    } else {
                        sortedProducts = Array.from(this.state.showedProducts)
                    }                 
                    sortedProducts.sort((a, b) => a.price > b.price ? 1 : -1)
                break;
                case "priceDsc":
                    //console.log("priceDsc")
                    if(this.state.filteredProducts.length){
                        sortedProducts = Array.from(this.state.filteredProducts)
                    } else {
                        sortedProducts = Array.from(this.state.showedProducts)
                    }
                    sortedProducts.sort((a, b) => a.price < b.price ? 1 : -1)
                break;
            }
            if(sortedProducts.length || this.state.sortedProducts.length){
                //console.log(sortedProducts, this.state.sortedProducts)
            context.commit('SET_SORTED_PRODUCTS', sortedProducts)
            }
        }
        
    }
}