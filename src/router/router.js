import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store"
import Main from "@/pages/Main.vue"
import Catalog from "@/pages/Catalog.vue"
import ProductPage from "@/pages/ProductPage.vue"
import Category from "@/pages/Category.vue"
import PodCategory from "@/pages/PodCategory.vue"
import Cart from "@/pages/Cart.vue"
import Wishlist from "@/pages/Wishlist.vue"
import Compare from "@/pages/Compare.vue"
import Auth from "@/pages/Auth.vue"
import SignUp from "@/pages/SignUp.vue"
import ClientPage from "@/pages/ClientPage.vue"
import NotFound from "@/pages/NotFound.vue"
import About from "@/pages/About.vue"
import ShipmentAndPayment from "@/pages/ShipmentAndPayment.vue"
import ExchangeAndReturn from "@/pages/ExchangeAndReturn.vue"
import ContactInfo from "@/pages/ContactInfo.vue"
import Blog from "@/pages/Blog.vue"
import Checkout from "@/pages/Checkout.vue"
import OrderSuccess from "@/pages/OrderSuccess.vue"

const routes = [
    {
      path: '/',
      component: Main,
      name:'main'
    },
    {
      path: '/:catalog',
      component: Catalog,
      name: 'catalog',    
    },
    {
      path: '/catalog/:category',
      component: Category,
      name: 'category',
    },
    {
      path: '/catalog/:category/:subcategory',
      component: PodCategory,
      name: 'subcategory',
    },
    {
      path: '/product/:id',
      component: ProductPage,
      name: 'product-page',
    },
    {
      path: '/cart',
      component: Cart,
      name: 'cart',
      meta: {
        cart: true,
      }
    },
    {
      path: '/wishlist',
      component: Wishlist,
      name: 'wishlist'
    },
    {
      path: '/compare',
      component: Compare,
      name: 'compare'
    },
    {
      path: '/signup',
      component: SignUp,
      name: 'signUp',
      meta: {
        notAuthed: true
      }
    },
    {
      path: '/auth',
      component: Auth,
      name: 'auth',
      meta: {
        notAuthed: true
      }
    },
    {
      path: '/personalAccount',
      component: ClientPage,
      name: 'clientPage',
      meta: {
        auth: true 
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
      name: 'notFound'
    },
    {
      path: '/about',
      component: About,
      name: 'about'
    },
    {
      path: '/shipmentAndPayment',
      component: ShipmentAndPayment,
      name: 'shipmentAndPayment'
    },
    {
      path: '/exchangeAndReturn',
      component: ExchangeAndReturn,
      name: 'exchangeAndReturn'
    },
    {
      path: '/contactInfo',
      component: ContactInfo,
      name: 'contactInfo'
    },
    {
      path: '/blog',
      component: Blog,
      name: 'blog'
    },
    {
      path: '/checkout',
      component: Checkout,
      name: 'checkout',
      meta: {
        cart: true,
      }
    },
    {
      path: '/order-success',
      component: OrderSuccess,
      name: 'orderSuccess'
    }
    
]
const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

router.beforeEach((to, from, next)=>{
  const currentUser = store.state.auth.isAuth
  const requireAuth = to.matched.some(record=> record.meta.auth)
  const requireNotAuth = to.matched.some(record=>record.meta.notAuthed)
  const requireCart = to.matched.some(record=>record.meta.cart)
  if(requireAuth && !currentUser){
    next('/auth')
  } else if (requireNotAuth && currentUser) {
    next('/personalAccount')
  } else if(requireCart && !store.state.cart.cart.length) {
    next('/')
  } else {
    next()
  }
})

export default router