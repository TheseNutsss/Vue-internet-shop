<script>
import Auth from "@/pages/Auth.vue"
import db from "@/firebase/init.js"
import { collection, addDoc } from "firebase/firestore"; 
export default {
    components: {
        Auth
    },
    data (){
        return {
            isCommentArea: false,
            buyerCity: '',
            buyerCityFromTip: '',
            cityTip: [],
            deliveryOption: '',
            paymentType: '',
            postDepartments: [],
            postDepartment: '',
            fullName: '',
            email: '',
            phoneNumber: '',
            isFormValid: false,
            isFormFastOrderValid: false,
            index: '',
            street: '',
            house: '',
            flat: '',
            comment: '',
            phoneNumberFast: '',
            emailFast: '',
            fullNameFast: '',
        }
    },
    methods: {
        changeDeliveryOption(e){
            console.log('changeDeliveryOption')
            this.deliveryOption !== event.target.value ? this.deliveryOption = event.target.value : ''
        },
        showWarehouses(){
            console.log('showWarehouses')
            this.postDepartments = []
            let url = 'https://api.novaposhta.ua/v2.0/json/'
            if(this.buyerCity.length > 1){
                let requestCities = { 
                    "apiKey": "584cc4490864f999e459af77ec0c0f62",
                    "modelName": "Address",
                    "calledMethod": "getWarehouses",
                    "methodProperties": {
                        "Language": "RU",
                        "TypeOfWarehouseRef" : "841339c7-591a-42e2-8233-7a0a00f0ed6f"
                    }
                }
                if(this.buyerCityFromTip){
                    requestCities["methodProperties"].CityName = this.buyerCityFromTip
                } else {
                    requestCities["methodProperties"].CityName = this.buyerCity
                }
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify(requestCities)
                })
                .then(response=>response.json())
                .then(departments=>{
                    departments.data.forEach(department => {
                    this.postDepartments.push(department['DescriptionRu'])
                    });
                })
            }
        },
        setCityFromTip(cityName){
            this.buyerCity = event.target.textContent
            this.buyerCityFromTip = cityName
        },
        validateFormNewBuyer(e) {
            console.log("validateFormNewBuyer")
            let setOfCriteria = true
            this.resetErrors()
            if(e){
                if(e.type){
                    console.log("event есть")
                    if(this.fullName.trim() == ''){
                        this.showError('fullName', 'Заполните это поле')
                    }
                    if(this.phoneNumber.trim() == ''){
                        this.showError('phoneNumber', 'Заполните это поле')
                    }
                    if(this.buyerCity.trim() == ''){
                        this.showError('city', 'Заполните это поле')
                    }
                    if(this.deliveryOption == ''){
                        this.showError('deliveryOption', 'Выберите способ доставки')
                    }
                    if(this.paymentType == ''){
                        this.showError('paymentType', 'Выберите способ оплаты')
                    }
                    if(this.deliveryOption == "Новая почта"){
                        if(this.postDepartment == ''){
                            this.showError('postDepartment', 'Выберите отделение')
                        }
                    } else if (this.deliveryOption == "Адресная доставка"){
                        if(this.index.trim() == ''){
                            this.showError('index', 'Заполните это поле')
                        }
                        if(this.street.trim() == ''){
                            this.showError('street', 'Заполните это поле')
                        }
                        if(this.house.trim() == ''){
                            this.showError('house', 'Заполните это поле')
                        }
                    }
                }
            }
            if(this.deliveryOption == "Новая почта"){
                if(this.postDepartment == ''){
                    setOfCriteria = !setOfCriteria;
                }
            } else if (this.deliveryOption == "Адресная доставка"){
                setOfCriteria = this.index.trim() !== '' && this.street.trim() !== '' && this.house.trim() !== ''
            }
            // Проверка, что все поля формы заполнены
            this.isFormValid =  this.fullName.trim() !== '' &&
                                this.phoneNumber.trim() !== '' &&
                                this.buyerCity.trim() !== '' &&
                                this.deliveryOption !== '' &&
                                this.paymentType !== '' &&
                                setOfCriteria
            // Добавьте другие проверки для остальных полей формы, если необходимо
        },
        validateFormFastOrder(e){
            if(e){
                this.resetErrors()
                if(e.type){
                    if(this.fullNameFast.trim() == ''){
                        this.showError('fullNameFast', 'Заполните это поле')
                    }
                    if(this.phoneNumberFast.trim() == ''){
                        this.showError('phoneNumberFast', 'Заполните это поле')
                    }
                }
            }
            this.isFormFastOrderValid = this.fullNameFast.trim() !== '' &&
                                        this.phoneNumberFast.trim() !== ''
        },
        async sendOrder(){
            console.log("sendOrder")
            if(this.isFormValid){
                const order = {
                    products: [],       
                }
                if(this.deliveryOption == "Новая почта"){
                    const buyerInfo = [{'ФИО': this.fullName }, {'Телефон' : this.phoneNumber}, {'Дата и время': new Date().toLocaleString()}, {'Город': this.buyerCity}, {'Доставка': this.deliveryOption}, {'Отделение': this.postDepartment}, {'Оплата': this.paymentType}]
                    if(this.email.trim() !== ''){
                        buyerInfo.push({'E-mail' : this.email.trim()})
                    }
                    if(this.comment.trim() !== ''){
                        buyerInfo.push({'Комментарий': this.comment.trim()})
                    }
                    buyerInfo.forEach(info=>{
                        let infoArr = Object.entries(info)
                        order[infoArr[0][0]] = infoArr[0][1]
                    })
                    this.$store.state.cart.cart.forEach(productInCart => {
                        order.products.push({'product id': productInCart.id,
                                    'product count' : productInCart.count
                        })
                    })
                    this.$store.dispatch('send_order', order)
                    this.$store.dispatch('clearCart');
                } else if(this.deliveryOption == "Адресная доставка"){
                    const buyerInfo = [{'ФИО': this.fullName }, {'Телефон' : this.phoneNumber}, {'Дата и время': new Date().toLocaleString()}, {'Город': this.buyerCity}, {'Доставка': this.deliveryOption}, {'Оплата': this.paymentType}, {'Индекс': this.index}, {'Улица': this.street}, {'Дом': this.house}]
                    if(this.email.trim() !== ''){
                        buyerInfo.push({'E-mail' : this.email.trim()})
                    }
                    if(this.comment.trim() !== ''){
                        buyerInfo.push({'Комментарий': this.comment.trim()})
                    }
                    if(this.flat.trim() !== ''){
                        buyerInfo.push({'Квартира': this.flat.trim()})
                    }
                    buyerInfo.forEach(info=>{
                        let infoArr = Object.entries(info)
                        order[infoArr[0][0]] = infoArr[0][1]
                    })
                    this.$store.state.cart.cart.forEach(productInCart => {
                        order.products.push({'product id': productInCart.id,
                                    'product count' : productInCart.count
                        })
                    })
                    this.$store.dispatch('send_order', order)
                    this.$store.dispatch('clearCart');
                } else {
                    const buyerInfo = [{'ФИО': this.fullName }, {'Телефон' : this.phoneNumber}, {'Дата и время': new Date().toLocaleString()}, {'Город': this.buyerCity}, {'Доставка': this.deliveryOption}, {'Оплата': this.paymentType}]
                    if(this.email.trim() !== ''){
                        buyerInfo.push({'E-mail' : this.email.trim()})
                    }
                    buyerInfo.forEach(info=>{
                        let infoArr = Object.entries(info)
                        order[infoArr[0][0]] = infoArr[0][1]
                    })
                    this.$store.state.cart.cart.forEach(productInCart => {
                        order.products.push({'product id': productInCart.id,
                                    'product count' : productInCart.count
                        })
                    })
                    this.$store.dispatch('send_order', order)
                    this.$store.dispatch('clearCart');
                }
                document.querySelector('form[name="checkout-new-buyer"]').reset()
            } else if(this.isFormFastOrderValid){
                const buyerInfo = [{'ФИО': this.fullNameFast }, {'Телефон' : this.phoneNumberFast},  {'Дата и время': new Date().toLocaleString()}]
                if(this.emailFast.trim() !== ''){
                    buyerInfo.push({'E-mail' : this.emailFast.trim()})
                }
                const order = {
                    products: [],       
                }
                buyerInfo.forEach(info=>{
                    let infoArr = Object.entries(info)
                    order[infoArr[0][0]] = infoArr[0][1]
                })
                console.log(order)
                this.$store.state.cart.cart.forEach(productInCart => {
                    order.products.push({'product id': productInCart.id,
                                        'product count' : productInCart.count
                    })
                })
                this.$store.dispatch('send_order', order)
                this.$store.dispatch('clearCart');
                document.querySelector('form[name="checkout-fast"]').reset()
            }
        },
        showError(inputId, message){
            const errorElement = document.querySelector(`#${inputId}`)
            const errorElementMessage = document.querySelector(`#${inputId}-error`)
            errorElementMessage.innerText = message;
            errorElement.classList.add('error-border')
        },
        resetErrors() {
            const errorMessage = document.getElementsByClassName('error-message');
            const errorElements = document.querySelectorAll('form input, form select')
            Array.from(errorElements).forEach(function(element) {
                if(element.classList.contains('error-border')){
                    element.classList.remove('error-border')
                }
            });
            Array.from(errorMessage).forEach(function(element) {
                element.innerText = '';
            });
        }, 
    },
    mounted(){
    },
    watch:{
        buyerCity(){
            this.validateFormNewBuyer()
            if(this.buyerCity.length > 1){
                console.log("Подсказка городов")
                this.cityTip = []
                const url = "https://api.novaposhta.ua/v2.0/json/"
                const requestCities = {
                    "apiKey": "584cc4490864f999e459af77ec0c0f62",
                    "modelName": "Address",
                    "calledMethod": "getSettlements",
                    "methodProperties": {
                        "Page" : "1",
                        "Warehouse" : "1",
                        "FindByString" : this.buyerCity,
                        "Limit" : "200"
                        }
                }
            fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestCities)
            })
            .then(response => response.json())
            .then(result=> {
                result.data.forEach(city => {
                    this.cityTip.push({CityName: city['DescriptionRu'], cityFullName: `${city['SettlementTypeDescriptionRu'][0]}. ${city['DescriptionRu']}, ${city['AreaDescriptionRu']}`})
                });
            })
            } else {
                this.cityTip = []
            }
        },
        fullName: 'validateFormNewBuyer',
        fullNameFast: 'validateFormFastOrder',
        phoneNumber: 'validateFormNewBuyer',
        phoneNumberFast: 'validateFormFastOrder',
        deliveryOption: 'validateFormNewBuyer',
        paymentType: 'validateFormNewBuyer',
        postDepartment: 'validateFormNewBuyer',
        index: 'validateFormNewBuyer',
        street: 'validateFormNewBuyer',
        house: 'validateFormNewBuyer',
    }
}
</script>
<template>
<div class="container">
    <div class="checkout"></div>
    <h2>Оформление заказа</h2>
    <div class="checkout-wrapper">
        <tabs class="checkout-main">
            <tab name="Быстрый заказ">
                <form name="checkout-fast">
                    <h3>Получатель заказа</h3>
                    <div class="form-group"><label for="fullNameFast">ФИО</label><my-input id="fullNameFast" class="fullName" type="text" v-model="fullNameFast"></my-input><span class="error-message" id="fullNameFast-error"></span></div>
                    <div class="form-group"><label for="phoneNumberFast">Телефон</label><my-input id="phoneNumberFast" class="phoneNumber" type="tel" v-model="phoneNumberFast"></my-input><span class="error-message" id="phoneNumberFast-error"></span></div>
                    <div class="form-group"><label for="email">E-mail</label><my-input id="email" type="email" v-model="emailFast"></my-input></div> 
                    <div class="form-btn-wrapper"><my-button :class="{ 'disabled': !isFormFastOrderValid }" @click.prevent="validateFormFastOrder($event); sendOrder()">Оформить заказ</my-button></div>
                </form>
            </tab>
            <tab name="Я зарегистрированный покупатель">
                <my-auth></my-auth>
            </tab>
            <tab name="Я новый покупатель">
                <form name="checkout-new-buyer">
                    <h3>Получатель заказа</h3>
                    <div class="form-group"><label for="fullName">ФИО</label><my-input v-model="fullName" class="fullName" id="fullName" type="text"></my-input><span class="error-message" id="fullName-error"></span></div>
                    <div class="form-group"><label for="phoneNumber">Телефон</label><my-input v-model="phoneNumber" class="phone" id="phoneNumber" type="tel"></my-input><span class="error-message" id="phoneNumber-error"></span></div>
                    <div class="form-group">
                        <label for="city">Город</label>
                        <div class="input-container">
                            <my-input v-model="buyerCity" @change="showWarehouses" id="city" type="text" autocomplete="off" placeholder="Введите название города"></my-input>
                            <span class="closeIcon fa-solid fa-xmark" @mousedown="buyerCity = ''" v-if="buyerCity"></span>
                            <ul class="city-tip-list" v-if="cityTip.length">
                                <li v-for="city in cityTip" class="city-tip-list-item" @mousedown="setCityFromTip(city['CityName'])">{{city["cityFullName"]}}</li>
                            </ul>
                        </div>
                        <span class="error-message" id="city-error"></span>
                    </div>
                    <div class="form-group"><label for="email">E-mail</label><my-input v-model="email" id="email" type="email"></my-input></div>
                    <p @click="isCommentArea = true" v-if="!isCommentArea" class="showCommentArea">Добавить комментарий к заказу</p>
                    <div class="form-group" v-if="isCommentArea"><label for="orderComment">Комментарий</label><textarea id="orderComment" v-model="comment"></textarea></div>
                    <div class="delivery-wrapper">
                        <div class="form-group delivery-options-group">
                            <h3>Доставка</h3>
                            <select class="delivery-options" :disabled="buyerCity.length < 2" @change="changeDeliveryOption" v-model="deliveryOption" id="deliveryOption">
                                <option value="" selected disabled hidden>Выберите</option>
                                <option v-if="buyerCity.includes('Киев')">Cамовывоз</option>
                                <option v-if="postDepartments.length">Новая почта</option>
                                <option>Адресная доставка</option>
                            </select>
                            <span class="error-message" id="deliveryOption-error"></span>
                        </div>
                        
                        <div class="form-group delivery-info-department" v-if="postDepartments.length && deliveryOption == 'Новая почта'">
                            <h3>Отделение</h3>
                            <select class="post-departments" v-model="postDepartment" id="postDepartment">
                                <option value="" selected disabled hidden>Выберите</option>
                                <option v-for="department in postDepartments">{{department}}</option>
                            </select>
                            <span class="error-message" id="postDepartment-error"></span>
                        </div>
                        <template v-if="deliveryOption == 'Адресная доставка'">
                            <div class="form-group"><label for="index">Индекс</label><my-input id="index" type="number" v-model="index"></my-input><span class="error-message" id="index-error"></span></div>
                            <div class="form-group"><label for="street">Улица</label><my-input id="street" type="text" v-model="street"></my-input><span class="error-message" id="street-error"></span></div>
                            <div class="form-group"><label for="house">Дом</label><my-input id="house" type="number" v-model="house"></my-input><span class="error-message" id="house-error"></span></div>
                            <div class="form-group"><label for="flat">Квартира</label><my-input id="flat" type="number" v-model="flat"></my-input></div>
                        </template>
                    </div>
                    <div class="paymentType-wrapper">
                        <div class="form-group">
                            <h3>Оплата</h3>
                            <select v-model="paymentType" id="paymentType" :disabled="buyerCity.length < 2">
                                <option value="" selected disabled hidden>Выберите</option>
                                <option value="Наличные">Наличные</option>
                                <option value="Безналичный рассчёт">Безналичный рассчёт</option>
                            </select>
                            <span class="error-message" id="paymentType-error"></span>
                        </div>
                    </div>
                    <div class="form-btn-wrapper"><my-button :class="{ 'disabled': !isFormValid }" @click.prevent="validateFormNewBuyer($event); sendOrder()">Оформить заказ</my-button></div>
                </form>
            </tab>
        </tabs>
        <div class="checkout-aside">
            <my-cart></my-cart>
        </div>
    </div>
</div>
</template>
<style>
.error-message{
    color: red;
    font-size: 14px;
    position: absolute;
    right: 10px;
    bottom: -10px;
    margin-bottom: 0;
}
.disabled {
  opacity: 0.5;
}
.error-border{
    border: 1px solid red !important;
}
.checkout-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.tabs-component-tabs{
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    margin: 10px 0;
}
.tabs-component-tabs li{
    list-style-type: none;
    margin-right: 10px;
    cursor: pointer;
}
.tabs-component-tabs a{
    text-decoration: none; 
    color: #000;
    font-weight: 600;
}
form{
    display: flex;
    flex-direction: column;
}
.checkout-main,.checkout-aside{
    flex: 1 1;
    min-width: 450px;
    max-width: 600px;
}
.customInput{
    max-width: 350px;
    min-width: 270px;
}
.form-group{
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    position: relative;
}
.tabs-component-panels{
    max-width: 500px;
}
@media screen and (min-width: 1200px){
}
.form-btn-wrapper{
    text-align: right;
    margin-top: 10px;
}
.myBtn{
    font-size: 18px;
    font-weight: 600;
    margin: 5px;
}
textarea{
    resize: vertical;
    border: 1px solid #acacac;
    background: #fff;
    border-radius: 0;
    line-height: normal;
    vertical-align: middle;
    transition: border-color .1s;
    font-size: 16px;
    height: 36px;
    min-height: 36px;
    max-width: 350px;
    min-width: 270px;
    max-height: 300px;
    width: 100%;
    padding: 5px;
}
.form-group label {
    margin-right: 10px;
}
@media screen and (max-width: 968px){
    .checkout-main,.checkout-aside{
        flex: 1 1 100%;
        max-width: none;
        min-width: 0;
    }
}
@media screen and (max-width: 450px){
    .form-group{
        flex-direction: column;
        align-items: flex-start;
    }
}
.cityTip-wrapper{
    position: relative;
}
.input-container{
    width: 100%;
    max-width: 350px;
    min-width: 270px;
    position: relative;
}
.city-tip-list{
    top: 100%;
    left: 0;
    width: 100%;
    position: absolute;
    z-index: 500;
    max-height: 300px;
    max-width: 100%;
    box-sizing: border-box;
    overflow: auto;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 4px;  
    display: none;
}
.city-tip-list-item:hover{
    background-color: #EDEDED;
}
.customInput:focus ~ .city-tip-list{
    display: block;
}
.customInput:focus + .closeIcon{
    display: block;
}
.city-tip-list-item{
    list-style-type: none;
    font-size: 16px;
    color: #000;
    padding: 7px;
    border: 0;
    cursor: pointer;
}
.showCommentArea{
    padding: 5px;
}
.showCommentArea:hover{
    cursor: pointer;
    color:#000000be;
}
.closeIcon{
    position: absolute;
    top: 2px;
    right: 1px;
    padding: 9px;
    line-height: 12px;
    cursor: pointer;
    display: none;
}
.form-group select{
    border: 1px solid #acacac;
    background: #fff;
    border-radius: 0;
    line-height: normal;
    vertical-align: middle;
    transition: border-color .1s;
    padding: 0 8px; 
    font-size: 16px;
    width: 100%;
    height: 36px;
    max-width: 350px;
    min-width: 270px;
}
.form-group h3{
    font-weight: bold;
    font-size: 18px;
}
.form-group label{
    font-size: 14px;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button{
     -webkit-appearance: none;
}
</style>