<script>

</script>

<template>
<div class="container">
    <template v-if="$store.state.cart.cart.length">
        <div class="go-back-btn">
            <button class="continue-buy-btn" @click="$router.back()"><span class="fa-solid fa-arrow-left"></span>Продолжить покупки</button>
        </div>
        <my-cart></my-cart>
        <div class="order-button">
            <my-button @click="$router.push('/checkout')">Оформление заказа</my-button>
        </div>
    </template>
    <template v-else>
         <h2>Ваша корзина пуста :(</h2>
    </template>
</div>
</template>

<style>
.order-button {
    text-align: right;
    margin-bottom: 10px;
}
.continue-buy-btn{
    border: none;
    background: none;
    font-size: 16px;
    white-space: nowrap;
    cursor: pointer;
}
.go-back-btn{
    margin: 10px 0;
}
</style>
