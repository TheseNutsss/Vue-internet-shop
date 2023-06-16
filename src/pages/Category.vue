<script>
export default {
  data () {
    return{
    }
  },
  
    
}


</script>

<template>
<div class="container">
  <div class="content-wrapper">
    <my-filter></my-filter>
    <div class="product-area-wrapper">
    <my-sort></my-sort>
      <div class="product-area">
          <template v-for="product in $store.state.productsToShow">       
              <my-product :product="product"></my-product>
          </template>  
      </div>
      </div>
  </div>
</div>
</template>

<style>
.product{
  width: calc(25% - 10px);
}
</style>