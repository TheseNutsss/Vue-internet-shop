<script>
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import db from "@/firebase/init.js"
export default {
    data(){
        return {
            orderInfo: '',
            products: [],
            totalPrice: null,
            orderNumber: null,
        }
    },
    methods:{
        async getOrder(orderRef){
            const docRef = doc(db, "Orders", orderRef);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                this.orderInfo = docSnap.data()
                this.orderInfo['products'].forEach(product => {
                    this.getProductById(product)
                });
                this.totalOrderSum()
                const querySnapshot = await getDocs(collection(db, "Orders"));
                this.orderNumber = querySnapshot.size
            }
        },
        getProductById(productObj){
            const findedProduct = this.$store.state.products.find(product => product.id === productObj["product id"])
            findedProduct.count = productObj["product count"]
            this.products.push(findedProduct)
        },
        totalOrderSum(){
            this.totalPrice = this.products.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.count), 0)
        }
    },
    mounted(){
        this.getOrder(this.$store.state.sendOrder.userOrderRef)
    }
}
</script>

<template>
<div class="container">
    <div class="order-success-wrapper">
        <p class="order-success-heading">Ваш заказ принят</p>
        <div class="order-info-wrapper">
            <p class="order-info-heading">Заказ №{{orderNumber}}</p>
            <div class="order-info-body">
                <template v-for="(infoValue, infoKey) in orderInfo">
                    <div class="order-info-group" v-if="infoKey !== 'products' "><div class="order-info-left-side">{{infoKey}}</div><div class="order-info-right-side">{{infoValue}}</div></div>
                </template>
                <div class="order-info-group"></div>
            </div>
        </div>
        <div class="order-products-wrapper">
            <p class="order-products-heading">Ваш заказ</p>
            <div class="order-products-list-wrapper">
                <div class="success-order-product" v-for="product in products">
                    <div class="img-wrapper"><img :src="product.imgMain"></div>
                    <div class="product-info">
                        <p>{{product.name}}</p>
                        <p>{{product.price}} × {{product.count}}  <span class="product-info-total-price">{{product.price * product.count}}грн</span></p>
                    </div>
                </div>
            </div>
            <div class="order-summary">Всего <span class="total-price">{{totalPrice}} грн</span></div>
        </div>
    </div>
</div>
</template>

<style scoped>
.order-success-wrapper{
    display: flex;
    flex-direction: column;
    max-width: 500px;
}
.order-success-heading{
    font-size: 32px;
    margin-bottom: 18px;
}
.order-info-wrapper{
    padding: 5px;
}
.order-info-heading{
    font-size: 20px;
    font-weight: bold;
}
.order-products-wrapper{
    padding: 10px;
}
.order-products-heading{
    font-size: 18px;
    font-weight: bold;
}
.order-info-body{
    display: flex;
    flex-direction: column;
}
.order-info-group{
    display: flex;
    justify-content: space-between;
}
.product-info-total-price, .total-price{
    font-weight: bold;
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
.order-products-list-wrapper{
    padding: 10px;
}
.success-order-product{
    display: flex;
    background-color: #fff;
    padding: 5px;
    margin-bottom: 5px;
}
.order-summary{
    text-align: right;
}
.order-info-left-side{
    color: #b8b8b8;
    font-size: 16px;
}
</style>