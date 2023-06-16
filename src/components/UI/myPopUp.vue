<script>
import myPopUpFastOrder from './myPopUpFastOrder.vue'
import myPopUpAddToCart from './myPopUpAddToCart.vue'
export default {
    components: { myPopUpFastOrder, myPopUpAddToCart },
    name: "my-popup",
}

</script>
<template>
    <div class="pop-up-wrapper">
        <div class="pop-up">
            <span class="close-icon" @click="$store.commit('SET_POPUP')">✕</span>
            <my-pop-up-add-to-cart v-if="$store.state.popUp.type == 'addToCart'"></my-pop-up-add-to-cart>
            <my-pop-up-fast-order v-if="$store.state.popUp.type == 'fastOrder'"></my-pop-up-fast-order>
        </div>
    </div>
</template>
<style>
.pop-up-wrapper{
    position:fixed;
    display:flex;
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center;
    background:rgba(0,0,0,.5);
    z-index:100;
}
.close-icon{
    right: 0;
    top: 0;
    z-index: 2;
    position: absolute;
    padding-right: 5px;
    font-size: 20px;
    cursor: pointer;
}
.pop-up{
    box-shadow: 0px 12px 17px rgba(0, 8, 29, 0.05),0px 5px 22px rgba(0, 8, 29, 0.06),0px 7px 8px rgba(0, 8, 29, 0.08);
    width:500px;
    height:500px;
    z-index:2;
    background-color: #EDEFF2;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    border-radius: 10px;
    justify-content: center;
}
@media  screen and (max-width: 768px) {
    .pop-up{
        width: 98%;
        height: auto;
    }
}
</style>
