export default {
    state: {
        sortOption: "default",
    },
    mutations: {
        SET_SORT_OPTION(state, option){
            state.sortOption = option
        }
    },
    actions: {
        SORT_PRODUCTS({rootState, state, commit}, criteria){
            let sortedProducts
            switch (criteria) {
                case "default":
                    //console.log("default")  
                    sortedProducts = rootState.filters.originalOrderProducts
                    break;
                case "priceAsc":
                    //console.log("priceAsc")
                    if(rootState.filters.filteredProducts.length){
                        sortedProducts = Array.from(rootState.filters.filteredProducts)
                    }/*  else {
                        sortedProducts = Array.from(rootState.showedProducts)
                    }  */                
                    sortedProducts.sort((a, b) => a.price > b.price ? 1 : -1)
                break;
                case "priceDsc":
                    //console.log("priceDsc")
                    if(rootState.filters.filteredProducts.length){
                        sortedProducts = Array.from(rootState.filters.filteredProducts)
                    } /* else {
                        sortedProducts = Array.from(rootState.showedProducts)
                    } */
                    sortedProducts.sort((a, b) => a.price < b.price ? 1 : -1)
                break;
            }
            if(sortedProducts.length || state.sortedProducts.length){
                //console.log(sortedProducts, this.state.sortedProducts)
                /* commit('SET_SORTED_PRODUCTS', sortedProducts) */
                commit('SET_FILTERED_PRODUCTS', sortedProducts)
            }
        }
        
    }
}