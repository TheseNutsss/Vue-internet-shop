<script>
export default {
  data(){

  },
  methods: {
    fastOrderPopUp(productId){
      this.$store.commit('SET_POPUP');
      this.$store.commit('SET_PRODUCT', productId);
      this.$store.commit('SET_TYPE', 'fastOrder');
    }
  }
}
</script>

<template>
<div class="container">
  <template v-for="product in $store.state.products">
  <div class="productPage-wrapper" v-if="product.id == $route.params.id">
    <div class="imgArea-wrapper"><img :src="product.imgMain"/></div>
    <div class="productDetails-wrapper">
      <div class="nameAndArticul-wrapper">
        <div class="productName"><h3>{{product.name}}</h3></div>
        <div class="productArticul"><p><span>Артикул</span><br>{{product.id}}</p></div>
      </div>
      <div class="priceAndButtons-wrapper">
        <div class="price-wrapper">{{product.price}} грн</div>
        <div class="buttons-wrapper">
          <button @click="$store.dispatch('addToWishlist', product.id)" v-if="!product.wishlist" class="fa-regular fa-heart"></button>
          <button @click="$store.dispatch('addToWishlist', product.id)" v-if="product.wishlist" class="fa-regular fa-heart favorite"></button>
          <button @click="$store.dispatch('addToComparelist', product.id)" v-if="!product.compare" class="fa-solid fa-scale-balanced"></button>
          <button @click="$store.dispatch('addToComparelist', product.id)" v-if="product.compare" class="fa-solid fa-scale-balanced favorite"></button></div>
      </div>
      <div class="buyAndFastOrderBtns">
        <my-button @click="$store.dispatch('addToCart', product.id); $store.commit('SET_PRODUCT', product); $store.commit('SET_TYPE', 'addToCart');" :class="{'active-buyBtn': product.inCart}">
          <template v-if="!product.inCart">Купить</template>
          <template v-else>В корзине</template>
        </my-button>
        <button class="fast-order-button" @click="fastOrderPopUp(product.id)">Быстрый заказ</button>
      </div>
      <div class="tabs-wrapper">
        <tabs>
          <tab name="Гарантия">
            <div class="warranty-info-wrapper">
              <p class="warranty-info">Гарантия от производителя 12 месяцев</p>
            </div>
          </tab>
          <tab name="Оплата">
            <ul class="payment-info-list">
              <li class="info-list-item">Наличными при получении</li>
              <li class="info-list-item">Банковской картой</li>
              <li class="info-list-item">Оплата частями ПриватБанк или Monobank</li>
            </ul>
          </tab>
          <tab name="Доставка">
            <ul class="delivery-info-list">
              <li class="info-list-item">Cамовывоз из нашего магазине — бесплатно</li>
              <li class="info-list-item">Доставка через "Новую почту" — 35 грн.</li>
              <li class="info-list-item">Курьером по Киеву — 35 грн.</li>
              <li class="info-list-item">Больше информации о доставку</li>
            </ul>
          </tab>
        </tabs>
      </div>
    </div>
  </div> 
  </template>
</div>
</template>

<style>
.productPage-wrapper{
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.imgArea-wrapper, .productDetails-wrapper{
  flex: 1;
}
.nameAndArticul-wrapper, .priceAndButtons-wrapper{
  display: flex;
  justify-content: space-between;
}
.nameAndArticul-wrapper{
  margin-bottom: 30px;
}
.productDetails-wrapper{
  display: flex;
  flex-direction: column;
}
.price-wrapper{
  font-size: 25px;
}
.productName h3{
  font-size: 32px;
  font-weight: 400;
}
.buttons-wrapper{
  min-width: 100px;
  display: flex;
  justify-content: space-between;
}
.buttons-wrapper button{
  font-size: 25px;
  background: none;
  border: none;
  padding: 5px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
}
.buttons-wrapper button:hover{
  transform: scale(1.1, 1.1);
  background: white
}
.productArticul{
  background: #fff;
  padding: 2px 5px;
}
.productArticul span {
  color: #ACACAC;
}
button .favorite {
  color: orange;
}
.active-buyBtn{
  border: 1px solid #FBCC26 !important;
  color: #FBCC26 !important;
  background: none !important;
}
.myBtn{
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 400;
}
.fast-order-button{
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 400;
  border: 1px solid black;
  position: relative;
  margin-left: 20px;
  cursor: pointer;
}
.buyAndFastOrderBtns{
  margin-top: 20px;
}
.is-active{
  color: #FBCC26 !important;
}
.tabs-component-tab-a.is-active{
  border-top: 1px solid #FBCC26;
  padding-top: 5px;
}
.info-list-item{
  list-style-type: none;
}
.payment-info-list .info-list-item::before{
    content: '\2014';
    padding-right: 5px;
    font-weight: 300;
}
.payment-info-list{
  position: relative;
}
.tabs-wrapper{
  margin-top: 20px;
}
</style>