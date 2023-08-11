import {createStore} from "vuex"
import filters from "./filters/filter.js"
import cart from "./cart/cart.js"
import sort from "./sort/sort.js"
import popUp from "./popUp/popup.js"
import wishlist from "./wishlist/wishlist.js"
import comparelist from "./comparelist/comparelist.js"
import auth from "./AuthAndSignUp/auth.js"
import sendOrder from "./database/sendOrder.js"
export default createStore({
  state: {
      products: [
            {id: "1", title: "Генератор бензиновый xiaomi Днепр", name: "Генератор бензиновый xiaomi 5квт модель", description: "Генератор бензиновый xiaomi 5квт модель", price: 100, imgMain: "/assets/1.jpg", brand: "Xiaomi", category: "generatory", categoryFilter: "Генераторы", subcategoryFilter: "Бензиновые", compare: false, wishlist: false, inCart: false},
            {id: "2", title: "Генератор бензиновый Niki Днепр", name: "Генератор бензиновый Niki 5квт модель", description: "Генератор бензиновый Niki 5квт модель", price: 300, imgMain: "src/assets/2.jpg", brand: "Niki", category: "generatory", categoryFilter: "Генераторы", subcategoryFilter: "Бензиновые", compare: false, wishlist: false, inCart: false},
            {id: "3", title: "Генератор бензиновый Wolfer Днепр", name: "Генератор бензиновый Wolfer 5квт модель", description: "Генератор бензиновый Wolfer 5квт модель", price: 400, imgMain: "src/assets/3.jpg", brand: "Wolfer", category: "generatory", categoryFilter: "Генераторы", subcategoryFilter: "Бензиновые", compare: false, wishlist: false, inCart: false},
            {id: "4", title: "Генератор дизель xiaomi Днепр", name: "Генератор дизель xiaomi 5квт модель", description: "Генератор дизель xiaomi 5квт модель", price: 100, imgMain: "src/assets/4.jpg", brand: "Xiaomi", category: "generatory", categoryFilter: "Генераторы", subcategoryFilter: "Дизельные", compare: false, wishlist: false, inCart: false},
            {id: "5", title: "Генератор дизель Niki Днепр", name: "Генератор дизель Niki 5квт модель", description: "Генератор дизель Niki 5квт модель", price: 300, imgMain: "src/assets/5.jpg", brand: "Niki", category: "generatory", categoryFilter: "Генераторы", subcategoryFilter: "Дизельные", compare: false, wishlist: false, inCart: false},
            {id: "6", title: "Генератор дизель Wolfer Днепр", name: "Генератор дизель Wolfer 5квт модель", description: "Генератор дизель Wolfer 5квт модель", price: 200, imgMain: "src/assets/6.jpg", brand: "Wolfer", category: "generatory", categoryFilter: "Генераторы", subcategoryFilter: "Дизельные", compare: false, wishlist: false, inCart: false}, 
            {id: "7", title: "xiaomi powerbank Днепр", name: "Павербанк xiaomi 20000mah модель", description: "Павербанк xiaomi разработан по новой технологии", price: 500, imgMain: "src/assets/7.jpeg", brand: "Xiaomi", category: "powerbanks", categoryFilter: "Павербанки", compare: false, wishlist: false, inCart: false},
            {id: "8", title: "Huawei powerbank Днепр", name: "Павербанк Huawei 20000mah модель", description: "Павербанк huawei разработан по новой технологии", price: 600, imgMain: "src/assets/8.jpeg", brand: "Huawei", category: "powerbanks", categoryFilter: "Павербанки", compare: false, wishlist: false, inCart: false},
            {id: "9", title: "Apple powerbank Днепр", name: "Павербанк apple 20000mah модель", description: "Павербанк apple разработан по новой технологии", price: 700, imgMain: "src/assets/9.jpeg", brand: "Apple", category: "powerbanks", categoryFilter: "Павербанки", compare: false, wishlist: false, inCart: false}
      ],
      categories: {
        "Генераторы": ['Бензиновые', 'Дизельные'],
        "Павербанки": []
      },
  },
  mutations: {
    /* setProducts(state, products){
      state.showedProducts = products 
    },
    showProducts(state, products){
      state.productsToShow = products
    } */
  },
  actions: {
 
  },
  modules: {
    filters,
    cart,
    sort,
    popUp,
    wishlist,
    comparelist,
    auth,
    sendOrder
  }
})