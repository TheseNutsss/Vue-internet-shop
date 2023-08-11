<script>
import {mapActions, mapMutations} from "vuex"
export default {
  methods: {
    ...mapActions(['productList', 'catalog']),
    ...mapMutations(['SET_CART', 'SET_WISHLIST', 'SET_COMPARELIST', 'SET_AUTH'])
  },
  watch: {
    $route(){
      if(this.$route.params.hasOwnProperty('category')|| this.$route.params.hasOwnProperty('subcategory') || this.$route.params.hasOwnProperty('id') || this.$route.params.hasOwnProperty('catalog')){
        if(this.$route.params.hasOwnProperty('catalog')){
          this.catalog()
        } else {
          this.productList(this.$route.params)
        }
      }
    },
    '$store.state.popUp.popUp'(){
      this.$store.state.popUp.popUp ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll')   
    }
  },
  mounted(){
    localStorage.getItem('cart') ? this.SET_CART(localStorage.getItem('cart')) : ''
    localStorage.getItem('wishlist') ? this.SET_WISHLIST(localStorage.getItem('wishlist')) : ''
    localStorage.getItem('comparelist') ? this.SET_COMPARELIST(localStorage.getItem('comparelist')) : ''
    sessionStorage.getItem('auth') ? this.SET_AUTH(sessionStorage.getItem('auth')) : ''
    }
}
</script>

<template>
  <my-header></my-header>
  <template v-if="$store.state.popUp.popUp">
    <my-popup></my-popup>
  </template>
  <main class="main">
      <router-view></router-view>
  </main>
  <my-footer></my-footer>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Oswald", sans-serif;
  -webkit-text-size-adjust: 100%;
}
html,body{
  background: rgb(26, 26, 26);
  position: relative;
}
body{
  height: 100vh;
}
#app{
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.main{
  background-color: #EDEFF2;
}
@media (min-width: 769px){
  .main{
    flex: 1 1 auto;
  }
}
@media (max-width: 1200px){
  .main{
    margin-top: 40px;
  }
}
.product-area{
  height: max-content;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
}
.container{
  width: 70%;
  margin: 0px auto;
  padding: 0px 10px;
}
@media (max-width: 1200px){
  .container{
    width: 100%;
  }
}
@media (max-width: 992px){
}
@media (max-width: 768px){
  .container{
    max-width: none;
    width: 100%;
  }
}
.product-area-wrapper{
  display: flex;
  flex-direction: column;
  flex: 4;
}
.content-wrapper{
  display: flex;
}
.sort-wrapper{
  display: flex;
  justify-content: flex-end;
}
.favorite{
  color: orange !important;
}
.main-heading{
  margin: 10px 0 10px 0;
  font-size: 32px;
}
.main-text{
  padding: 20px;
}
</style>
