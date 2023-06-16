<script>
export default {
  name: 'my-product',
  props: ['product'],
}
</script>

<template>
  <div class="product">
    <slot></slot>
    <div class="product-main-image">
      <img :src="product.imgMain"/>
    </div>
    <p>{{product.name}}</p>
    <h2>{{product.price}} ₴</h2>
    <h3>{{product.brand}}</h3>
    <div class="line-divider"></div>
    <div class="product-btns">
      <div class="buyBtn">
        <my-button @click="$store.dispatch('addToCart', product.id); $store.commit('SET_PRODUCT', product); $store.commit('SET_TYPE', 'addToCart');" :class="{'active-buyBtn': product.inCart}">
          <template v-if="!product.inCart">Купить</template>
          <template v-else>В корзине</template>
        </my-button>
      </div>
      <div class="favAndCompareBtns">
        <button @click="$store.dispatch('addToWishlist', product.id)" v-if="!product.wishlist" class="fa-regular fa-heart"></button>
        <button @click="$store.dispatch('addToWishlist', product.id)" v-if="product.wishlist" class="fa-regular fa-heart favorite"></button>
        <button @click="$store.dispatch('addToComparelist', product.id)" v-if="!product.compare" class="fa-solid fa-scale-balanced"></button>
        <button @click="$store.dispatch('addToComparelist', product.id)" v-if="product.compare" class="fa-solid fa-scale-balanced favorite"></button>
      </div>
    </div>
    <a @click="$router.push(`/product/${product.id}`)" class="product-link"></a>
  </div>
</template>     

<style scoped>
 .product-link {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .product{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;
    margin: 5px;
    background-color: #fff;
    box-shadow: 0px 2px 2px rgba(0, 8, 29, 0.05),0px 0px 2px rgba(0, 8, 29, 0.06),0px 1px 3px rgba(0, 8, 29, 0.08);
    border-radius: 5px;
    padding: 10px;
    position: relative;
  }
  @media (max-width: 768px){
    .product{
      width: calc(50% - 10px);
      margin: 5px;
    }
  }
  .product:hover{
    box-shadow: 0px 12px 17px rgba(0, 8, 29, 0.05),0px 5px 22px rgba(0, 8, 29, 0.06),0px 7px 8px rgba(0, 8, 29, 0.08);
  }
  .product-main-image{
    width: 100%;
    padding-bottom: 10px;
  }
  .product-main-image img{
    width: 100%;
    height: 100%;
  }
  .product .myBtn{
    z-index: 2;
  }
  .active-buyBtn{
    border: 1px solid #FBCC26;
    color: #FBCC26;
    background: none;
    font-weight: 600;
  }
  .line-divider{
    height: 1px;
    background: rgba(0, 0, 0, 0.06);
    margin: 8px 0;
  }
  .product-btns{
    display: flex;
    justify-content: space-between;
  }
  .favAndCompareBtns{
    display: flex;
    align-items: center;
  }
  .favAndCompareBtns button{
    z-index: 2;
    position: relative;
    cursor: pointer;
    background: none;
    border: none;
    padding: 10px;
    border-radius: 10px;
    font-size: 14px;
    color: black;
  }
   .favAndCompareBtns button:hover{
    background-color: rgba(211, 211, 211, 0.356);
  }
  @media screen and (max-width: 450px) {
    .buyBtn, .favAndCompareBtns{
      display: flex;
      justify-content: center;
      flex: 1 1 100%;
    }
    .favAndCompareBtns button{
      padding: 15px;
      font-size: 18px;
    }
    .product-btns{
      flex-wrap: wrap;
    }
  }
</style>
