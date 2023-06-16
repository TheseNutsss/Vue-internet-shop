<script>
export default {
    name: 'my-cart',
    methods: {
        updateCountProduct(e){
        if(e.target.value < 1 || e.target.value == ''){
            document.querySelector(`input[id="${e.target.id}"]`).value = "1"
        }
        const product = {
            id: e.target.dataset.id,
            count: parseInt(e.target.value)
        }
        this.$store.dispatch('updateCountProduct', product)
        },
        updateValueProduct(e){
            const input = document.querySelector(`input[id="${e.target.dataset.id}"]`)
            if(e.target.dataset.action == '-'){
                input.value--
            } else {
                input.value++
            }
            const product = {
                id: e.target.dataset.id,
                count: parseInt(document.querySelector(`input[id="${e.target.dataset.id}"]`).value)
            }
            this.$store.dispatch('updateCountProduct', product)
        }
    }
}
</script>
<template>
<div class="my-cart">
    <h2>Ваш заказ</h2>
    <ul class="my-cart-list" v-for="product in $store.state.cart.cart">
        <li>
            <div class="left-side">
                <div class="img-wrapper"><img :src="product.imgMain"></div>
                <div class="product-info">
                    <a @click="$router.push(`/product/${product.id}`)"><p>{{product.name}}</p></a>
                    <p>{{product.price}} грн</p>
                    <div class="quantity-container">
                        <button class="quantity-item fa-solid fa-minus" :data-id="product.id" :disabled="product.count < 2" data-action="-" @click="updateValueProduct"></button>
                        <input type="number" class="quantity-input quantity-item" :value="product.count" :id="product.id" :data-id="product.id" @input="updateCountProduct">
                        <button class="quantity-item fa-solid fa-plus" :data-id="product.id" data-action="+" @click="updateValueProduct"></button>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <span class="trash-icon" @click="$store.dispatch('deleteProduct', product)"><i class="fa-solid fa-trash trash"></i></span>
                <span class="price">{{product.price * product.count}} грн</span>
            </div>
        </li>
    </ul>
    <div class="total-price">Всего <span>{{$store.state.cart.totalSumInCart}} грн</span></div>
</div>
</template>
<style scoped>
.total-price{
    text-align: right;
    margin: 10px 0;
}
.total-price span{
    font-weight: bold;
}
.my-cart-list li{
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 5px;
    margin-bottom: 5px;
}
.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button{
  -webkit-appearance: none;
}
.left-side{
    display: flex;
}
.right-side{
    position: relative;
}
.price{
    position: absolute;
    right: 5%;
    bottom: 5%;
    font-weight: 600;
    width: max-content;
}
.trash-icon{
    position: absolute;
    right: 5%;
    top: 5%;
    cursor: pointer;
    padding: 5px;
    transition: 0.3s;
}
.trash-icon:hover{
    background: #acacac59;
    transform: scale(1.1);
}
.quantity-container{
    font-size: 14px;
    border: 1px solid #acacac;
    display: flex;
    max-width: 100px;
}
.quantity-container button{
    background: transparent;
    border: none;
    cursor: pointer;
    transition: 0.5s;
    color: black;
}
.quantity-container button:active{
    transform: scale(1.1);
}
.quantity-item{
    flex: 1;
}
.quantity-input{
    height: 36px;
    width: 100%;
    border: none;
    text-align: center;
}
.quantity-input:focus{
    outline: none;
}
.img-wrapper img{
    max-width: 100%;
}
.img-wrapper{
    max-width: 150px;
    padding: 5px;
    display: flex;
    min-height: 130px;
}
.product-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
}
.my-cart h2{
    margin-bottom: 10px;
}
.product-info a:hover{
    cursor: pointer;
    color:rgba(0, 0, 0, 0.623);
    transition: 0.1s;
}
</style>