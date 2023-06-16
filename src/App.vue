<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  watch: {
    $route(){
      if(this.$route.params.hasOwnProperty('category')|| this.$route.params.hasOwnProperty('subcategory') || this.$route.params.hasOwnProperty('id') || this.$route.params.hasOwnProperty('catalog')){
        console.log(this.$route.params)
        if(this.$route.params.hasOwnProperty('catalog')){
          this.$store.dispatch('catalog')
        } else {
          this.$store.dispatch('productList', this.$route.params)
        }
      }
    },
    '$store.state.popUp.popUp'(){
      this.$store.state.popUp.popUp ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll')   
    }
  },
  mounted(){
    localStorage.getItem('cart') ? this.$store.commit('SET_CART', localStorage.getItem('cart')) : ''
    localStorage.getItem('wishlist') ? this.$store.commit('SET_WISHLIST', localStorage.getItem('wishlist')) : ''
    localStorage.getItem('comparelist') ? this.$store.commit('SET_COMPARELIST', localStorage.getItem('comparelist')) : ''
    sessionStorage.getItem('auth') ? this.$store.commit('SET_AUTH', sessionStorage.getItem('auth')) : ''
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
  height: 100vh;
  background: rgb(26, 26, 26);
  width: 100%;
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
    flex: 1 1;
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
</style>
