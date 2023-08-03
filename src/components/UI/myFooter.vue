<template>
    <footer class="footer">
        <div class="container">
            <div class="footer_columns">
                <div class="footer_col footer_col--double footer-logo"><a href="/"><img src="@/assets/logo.png"/></a></div>
                <div class="footer_col footer_col2">
                    <span class="span_footer" @click.stop="openFooterCatalog">Каталог <div v-if="!isOpen"><img src="@/assets/downArrow.png"/></div><div v-else><img src="@/assets/upArrow.png"/></div></span>
                    <ul class="footer_menu">
                        <li><a @click="$router.push('/catalog/generatory'); openFooterCatalog()">Генераторы</a></li>
                        <li><a>ИБП</a></li>
                        <li><a>Стабилизаторы</a></li>
                        <li><a @click="$router.push('/catalog/powerbanks'); openFooterCatalog()">Павербанки</a></li>
                    </ul>
                </div>
                <div class="footer_col">
                    <span class="span_footer">Клиентам</span>
                    <ul class="footer_menu">
                        <li v-if="!$store.state.auth.isAuth"><a @click="$router.push('/auth')">Вход в ЛК</a></li>
                        <li v-else><a @click="$router.push('/personalAccount')">Открыть ЛК</a></li>
                        <li><a @click="$router.push('/about')">Про нас</a></li>
                        <li><a @click="$router.push('/shipmentAndPayment')">Оплата и доставка</a></li>
                        <li><a @click="$router.push('/exchangeAndReturn')">Обмен и возврат</a></li>
                        <li><a @click="$router.push('/contactInfo')">Контактная информация</a></li>
                        <li><a @click="$router.push('/blog')">Блог</a></li>
                    </ul>
                </div>
                <div class="footer_col footer_col--double">
                    <div class="contact-info-wrapper">
                        <span class="span_footer">Контактная информация</span>
                        <ul class="footer_menu">
                            <li><a href="tel:%2B380932812812">0932812812</a></li>
                            <li><a href="tel:%2B380631599553">0631599553</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: 'my-footer',
  data(){
    return {
        isOpen: false,
    }
  },
  methods:{
    openFooterCatalog(e){
        if(screen.width <= 768){
        this.isOpen = !this.isOpen
        this.isOpen ? document.querySelector('.footer_col2 .footer_menu').classList.add("showMobileMenu") : document.querySelector('.footer_col2 .footer_menu').classList.remove("showMobileMenu")
        }
    }
  }
}
</script>

<style>
/*Footer*/
.showMobileMenu{
    display: inline !important;
}
.footer {
    background: rgb(26, 26, 26);
    color: rgb(255, 255, 255);
    font-size: 13px;
    display: flex;
    justify-content: center;
    width: 100%;
}
.footer_columns {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    flex-wrap: wrap;
}
.footer_col {
    flex: 1 0;
    flex-wrap: wrap;
}
.footer-logo{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.footer_col--double {
    flex: 2 0;
    display: flex;
    flex-direction: column;
}
.span_footer{
    color: #FCCC26;
    font-size: 16px;
    font-weight: bold;
}
.footer_menu{
    list-style-type: none;
    font-weight: bold;
}
.footer_menu li{
    padding-top: 10px;
    cursor: pointer;
}
.footer_menu li a{
    text-decoration: none;
    color: #fffff4;
}
.span_footer div{
    display: none;
}
@media (max-width: 768px){
    .footer_columns {
        flex-direction: column;
    }
    .footer_columns {
        align-items: flex-start;
    }
    .footer_col{
        width: 100%;
    }
    .span_footer{
        margin: 15px 0 10px 0;
        position: relative;
        display: flex;
        font-size: 20px;
    }
    .span_footer div{
        width: 25px;
        height: 25px;
        right: 0;
        position: absolute;
        display: block;
    }
     .span_footer div img{
        max-width: 100%;
    }
    .footer_col--double{
        align-items: flex-start;
    }
    .responsive{
        display: block;
    }
    .footer_col2 .footer_menu{
        display: none;
    }
}
</style>