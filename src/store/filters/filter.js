export default {
    state: {
        usedFilter: [],
        filterOptions: {category: [], subcategory: [], priceFrom: null, priceTo: null},
        filteredProducts: [],
        originalOrderProducts: [],
        categoriesProducts: []
    },
    mutations: {
        SET_FILTERED_PRODUCTS(state, products){
            state.filteredProducts = products
        },
        SET_FILTER(state, filterObj){
            state.filterOptions = filterObj
        },
        SET_ORIGINAL_ORDER(state, products){
            state.originalOrderProducts = products
        },
        SET_USED_FILTER(state, filter){
            state.usedFilter = filter
        },
        SET_CATEGORIES_PRODUCTS(state, products){
            state.categoriesProducts = products
        }
    },
    actions: {
        filterProducts({rootState, state, commit}) {
            const filteredProducts = rootState.products.filter(product => {
                const passCategoryFilter = state.filterOptions.category.length === 0 || state.filterOptions.category.includes(product.categoryFilter);
                const passSubcategoryFilter = state.filterOptions.subcategory.length === 0 || (product.subcategoryFilter && state.filterOptions.subcategory.includes(product.subcategoryFilter));
                const passPriceFilter = (state.filterOptions.priceFrom === null || product.price >= state.filterOptions.priceFrom) && 
                                        (state.filterOptions.priceTo === null || product.price <= state.filterOptions.priceTo);
                
                return passCategoryFilter && passSubcategoryFilter && passPriceFilter;
            });
            commit('SET_FILTERED_PRODUCTS', filteredProducts)
            commit('SET_ORIGINAL_ORDER', filteredProducts)
        },
        productList({rootState, commit}, payload){
            console.log("productList")
            const products = rootState.products.filter(product => product[Object.keys(payload).join('')].includes(Object.values(payload).join('')))
            commit('SET_FILTERED_PRODUCTS', products)
            commit('SET_ORIGINAL_ORDER', products)
            commit('SET_CATEGORIES_PRODUCTS', products)
        },
        catalog({commit, rootState}){
            console.log("catalog")
            commit('SET_FILTERED_PRODUCTS', rootState.products)
            commit('SET_ORIGINAL_ORDER', rootState.products)
        }
    }
}