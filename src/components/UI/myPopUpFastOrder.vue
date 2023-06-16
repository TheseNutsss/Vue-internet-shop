<script>
export default {
    name: "my-popup-fast-order",
    data (){
        return {
            fullName: '',
            email: '',
            phoneNumber: '',
            isFormValid: false,
        }
    },
    methods: {
        sendOrder(){
            if(this.isFormValid){
                console.log('sendOrderSuccess')
                const buyerInfo = [{'ФИО': this.fullName}, {'Телефон': this.phoneNumber}, {'Дата и время': new Date().toLocaleString()}]
                const order = {
                    products: []
                }
                if(this.email !== ''){
                    buyerInfo.push({'E-mail': this.email})
                }
                buyerInfo.forEach(info=>{
                    let infoArr = Object.entries(info)
                    order[infoArr[0][0]] = infoArr[0][1]
                })
                order.products.push({'product id' : this.$store.state.popUp.product[0],
                                    'product count' : 1})
                this.$store.dispatch('send_order', order)
                this.$store.commit('SET_POPUP')
                this.$store.commit('SET_PRODUCT', [])
                this.$store.commit('SET_TYPE', '')
            }
        },
        validateForm(e){
            this.resetErrors()
            if(e){
                if(e.type){
                    if(this.fullName == ''){
                        this.showError('fullName', 'Заполните это поле')
                    }
                    if(this.phoneNumber == ''){
                        this.showError('phoneNumber', 'Заполните это поле')
                    }
                }
            }
            this.isFormValid = this.fullName !== '' && this.phoneNumber !== ''
        },
        showError(inputId, errorMessage){
            const errorElement = document.querySelector(`#${inputId}`)
            const errorElementMessage = document.querySelector(`#${inputId}-error`)
            errorElement.classList.add('error-border')
            errorElementMessage.innerText = errorMessage
        },
        resetErrors(){
            const errorMessage = document.getElementsByClassName('error-message');
            const errorElements = document.querySelectorAll('form input')
            Array.from(errorElements).forEach(function(element) {
                if(element.classList.contains('error-border')){
                    element.classList.remove('error-border')
                }
            });
            Array.from(errorMessage).forEach(function(element) {
                element.innerText = '';
            });
        }
    },
    watch:{
        fullName: 'validateForm',
        phoneNumber: 'validateForm'
    }
}

</script>
<template>
    <p class="pop-up-heading">Быстрый заказ</p>
    <form name="fast-order">
        <div class="form-group"><label for="fullName">ФИО</label><my-input id="fullName" class="fullName" type="text" v-model.trim="fullName"></my-input><span class="error-message" id="fullName-error"></span></div>
        <div class="form-group"><label for="email">E-mail</label><my-input id="email" class="email" type="text" v-model.trim="email"></my-input></div>
        <div class="form-group"><label for="phoneNumber">Телефон</label><my-input id="phoneNumber" class="phoneNumber" type="text" v-model.trim="phoneNumber"></my-input><span class="error-message" id="phoneNumber-error"></span></div>
        <div class="form-btn-wrapper"><my-button :class="{ 'disabled': !isFormValid }" @click.prevent="validateForm($event); sendOrder()">Оформить заказ</my-button></div>
    </form>
</template>
<style scoped>
.error-message{
    color: red;
    font-size: 14px;
    position: absolute;
    right: 10px;
    bottom: -10px;
    margin-bottom: 0;
}
.error-border{
    border: 1px solid red;
}
.disabled {
  opacity: 0.5;
}
form{
    display: flex;
    flex-direction: column;
    width: 100%;
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
.pop-up-heading{
    font-size: 32px;
}
.myBtn{
    padding: 8px 16px;
    font-size: 18px;
}
.form-btn-wrapper{
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
}
</style>
