<script>
export default {
    name: "my-popup-add-to-cart",
    mounted(){
        const btns = [...document.querySelectorAll('.pop-up-buttons-wrapper button')]
        btns.forEach(btn=>btn.addEventListener('click', ()=> this.$store.commit('SET_POPUP')))
    }
}

</script>
<template>
    <div class="pop-up-inner-wrapper">
        <p class="pop-up-heading">Товар успешно добавлен в корзину!</p>
        <div class="product-pop-up">
            <div class="pop-up-img-wrapper"><img :src="$store.state.popUp.product.imgMain"></div>
            <p>{{$store.state.popUp.product.name}}</p>
            <p>{{$store.state.popUp.product.price}}₴</p>
        </div>
        <div class="pop-up-buttons-wrapper">
            <button class="continue-buy-btn"><span class="fa-solid fa-arrow-left"></span>Продолжить покупки</button>
            <my-button @click="$router.push('/cart')">Перейти в корзину</my-button>
            <my-button @click="$router.push('/checkout')">Оформить заказ</my-button>
        </div>
    </div>
</template>
<style scoped>
.pop-up-heading{
    font-size: 20px;
}
.product-pop-up{
    box-shadow: 0px 2px 2px rgba(0, 8, 29, 0.05),0px 0px 2px rgba(0, 8, 29, 0.06),0px 1px 3px rgba(0, 8, 29, 0.08);
    background-color: #fff;
    padding: 10px;
    line-height: 20px;
    border-radius: 5px;
    margin: 20px;
}
.pop-up-img-wrapper{
    width: 100%;
}
.pop-up-img-wrapper img{
    width: 100%;
}
.pop-up-inner-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.continue-buy-btn{
    border: none;
    background: none;
    font-size: 16px;
    white-space: nowrap;
    cursor: pointer;
}
.continue-buy-btn:hover{
    color:rgba(0, 0, 0, 0.7);
}
.pop-up-buttons-wrapper{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.pop-up-buttons-wrapper button{
    margin: 5px;
}
</style>
