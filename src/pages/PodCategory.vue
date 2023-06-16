<script>

</script>

<template>
<div class="container">
  <h2>Podcategory</h2>
  <my-filter></my-filter>
  <h2>{{  $route.params.subcategory }}</h2>
  <div class="product-area">
    <template v-for="product in $store.state.products">
      <div class="product" v-if="product.category == $route.params.category && product.subcategory == $route.params.subcategory">       
        <a @click="$router.push(`/product/${product.id}`)">
                <p>Название:{{product.name}}</p>
                <p>Описание:{{product.description}}</p>
                <h2>Цена:{{product.price}}</h2>
                <h3>Бренд:{{product.brand}}</h3>
                </a>
        </div>
    </template>       
  </div>  
</div>
</template>

<style>
</style>