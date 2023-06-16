<script>
export default {
  watch: {

  },
  mounted(){
  
  }
}
</script>

<template>
<div class="container">
  <div class="wishlist-container">
      <h2>Cписок желаний</h2>
      <div class="wishlist-wrapper">
          <template v-for="product in $store.state.products">
              <template v-if="product.wishlist">
                  <my-product :product="product"><p class="icon-delete_compare-item" @click="$store.dispatch('addToWishlist', product.id)">✕</p></my-product>
              </template>
          </template>
      </div>
  </div>
</div>
</template>

<style scoped>
.icon-delete_compare-item{
    position: absolute;
    top:0;
    right:0;
    margin-right: 5px;
    font-size: 20px;
    z-index: 2;
}
.wishlist-wrapper{
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
}
.product{
    width: calc(20% - 10px);
}
  .product-wishlist:hover{
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
</style>
