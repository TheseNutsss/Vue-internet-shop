<template>
    <header class="header">
            <div v-if="isMenuOpen" class="mobile-side-nav-wrapper">
                <div class="mobile_side_nav" :class="{responsive: isMenuOpen}">
                    <div class="mob_side_nav_top"><span @click="toggleNav" class="btn_close">✕</span>
                    <p class="mob_side_nav_top_center">Solaris</p></div>
                    <ul class="mob_menu_katalog" @click="toggleNav">
                        <li @click="$router.push('/catalog')">Каталог</li>
                        <li @click="$router.push('/catalog/generatory')">Генераторы</li>
                        <li>ИБП</li>
                        <li>Стабилизаторы</li>
                        <li @click="$router.push('/catalog/powerbanks')">Павербанки</li> 
                    </ul>
                    <ul class="mob_menu_top">
                        <li @click="$router.push('/about')">Про нас</li>
                        <li @click="$router.push('/shipmentAndPayment')">Оплата и доставка</li>
                        <li @click="$router.push('/exchangeAndReturn')">Обмен и возврат</li>
                        <li @click="$router.push('/contactInfo')">Контактная информация</li>
                        <li @click="$router.push('/blog')">Блог</li>
                    </ul>
                </div> 
            </div>
            <div class="mobile_top_nav">
                <div class="mob_col1">
                    <div class="container-mobile"
                        :class="{change: isMenuOpen}"
                        @click="toggleNav">
                            <div class="bar1"></div>
                            <div class="bar2"></div>
                            <div class="bar3"></div>
                    </div>
                </div>
                
                <div class="mob_col2">
                    <a href="/"><img src="@/assets/images/logo.png" width="88" height="44"/></a>
                </div>
                <div class="mob_col3">
                    <div class="icons-wrapper">
                        <span class="fa-solid fa-scale-balanced" v-if="!$store.state.comparelist.length"></span>
                        <span class="fa-solid fa-scale-balanced favorite" v-else @click="$router.push('/compare')"></span>
                        <span class="fa-regular fa-heart" v-if="!$store.state.wishlist.wishlist.length"></span>
                        <span class="fa-regular fa-heart favorite" v-else @click="$router.push('/wishlist')"></span>
                        <span class="fa-solid fa-basket-shopping" v-if="!$store.state.cart.cart.length"></span>
                        <span class="fa-solid fa-basket-shopping favorite" v-else @click="$router.push('/cart')"></span>
                    </div>
                </div>
            </div>
            <div class="header_top">
                <div class="container">
                    <div class="header_top_wrapper">
                        <div class="header_column_left" >
                                <nav>
                                    <ul class="navBar" :class="{responsive: isMenuOpen}">
                                        <li><a @click="$router.push('/about')">Про нас</a></li>
                                        <li><a @click="$router.push('/shipmentAndPayment')">Оплата и доставка</a></li>
                                        <li><a @click="$router.push('/exchangeAndReturn')">Обмен и возврат</a></li>
                                        <li><a @click="$router.push('/contactInfo')">Контактная информация</a></li>
                                        <li><a @click="$router.push('/blog')">Блог</a></li>
                                    </ul>
                                </nav>              
                        </div>
                        <div class="header_column_right" :class="{responsive: isMenuOpen}">  
                            <span v-if="$store.state.comparelist.length"><a @click="$router.push('/compare')"><i class="fa-solid fa-scale-balanced"></i>Сравнение</a></span>
                            <span v-else class="opacity compare"><i class="fa-solid fa-scale-balanced"></i>Сравнение</span>
                            <span v-if="$store.state.wishlist.wishlist.length"><a @click="$router.push('/wishlist')"><i class="fa-solid fa-heart"></i>Избранное</a></span>
                            <span v-else class="opacity fav"><i class="fa-solid fa-heart"></i>Избранное</span>
                            <span v-if="!$store.state.auth.isAuth"><a @click="$router.push('/auth')"><i class="fa-solid fa-user"></i>Вход в ЛК</a></span>
                            <span v-else><a @click="$router.push('/personalAccount')"><i class="fa-solid fa-user"></i>Открыть ЛК</a></span>
                            <span v-if="$store.state.cart.cart.length"><a @click="$router.push('/cart')"><i class="fa-solid fa-cart-shopping"></i>{{$store.state.cart.totalSumInCart}} грн</a></span>     
                            <span v-else class="opacity cart"><i class="fa-solid fa-cart-shopping"></i>Моя корзина</span>                 
                        </div>
                    </div>
                </div>
            </div>
            <div class="header_middle">
                <div class="container">
                    <div class="header-middle-wrapper">
                        <div class="column logo">
                            <a href="/" class="logo-link"></a>
                            <img src="@/assets/images/logo.png"/>
                        </div>
                        <div class="column column-double">
                            <ul class="middle_menu">
                                <li @click="$router.push('/catalog/generatory')"><a>Генераторы</a></li>
                                <li><a>ИБП</a></li>
                                <li><a>Стабилизаторы</a></li>
                                <li @click="$router.push('/catalog/powerbanks')"><a>Павербанки</a></li>
                            </ul>
                        </div>
                        <div class="number column"><i class="fa-solid fa-phone"></i><span>0932812812</span></div>
                    </div>
                </div>
            </div>
    </header>
</template>
<script>
export default {
    name: 'my-header',
    data(){
        return{
            isMenuOpen: false,
            totalCartSum: 0
        }
    },
    methods: {
        toggleNav(){
            console.log("+")
            this.isMenuOpen = !this.isMenuOpen
        }
    },
    watch: {
        isMenuOpen(){
            this.isMenuOpen ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll')
        },
        '$store.state.cart.cart': {
            handler(){
                this.$store.dispatch('totalSumInCart')
            },
            deep: true
            
        }
    }
}
</script>

<style>
.opacity {
    color: rgba(0, 0, 0, 0.3);
    position: relative;
}
.header_top {
    background: #FCCC26;
    color: #000;
    height: 30px;
    display: flex;
    align-items: center;
}
.header_top_wrapper {
    display: flex;
    justify-content: space-between;
}
.navBar li{
    display: inline-block;
    margin-left: 5px;
}
.navBar li a{
    cursor: pointer;
}
.header_column_right span {
    margin-left: 5px;
    display: inline-block;
    text-align: left;
    cursor: pointer;
}
.header{
    font-size: 15px;
}
/* header middle*/
.header-middle-wrapper{
    display: flex;
}
.header_middle{
    background: rgb(26, 26, 26);
    color: rgb(255, 255, 255);
    font-size: 12px;
}
.column{
    flex: 1 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.column-double{
    flex: 3 1;
}
.middle_menu li{
    display: inline-block;
    padding: 12px 12px;
    font-size: 16px;
    font-weight: bold;
}
.middle_menu li:hover{
    background-color: #4C4C4C;
    transition: 0.3s ease-in-out;
    cursor: pointer;
}
.number span{
    font-size: 18px;
    font-weight: bold;
    margin-left: 5px;
}
.number i{
    border-radius: 50%;
    background-color: #FCCC26;
    padding: 5px;
    color: black;
}
.logo{
    position: relative;
}
.logo img{
    max-width: 100%;
}
.logo-link{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    z-index: 2;
}
/*Mobile side nav */
.mobile_side_nav{
    display: none;
}
.mob_col1{
    display: flex;
    position: relative;
    width: 40px;
    height: 40px;
    flex: 1;
}
.mob_col2{
    display: flex;
    justify-content: center;
    overflow: hidden;
    height: 100%;
    flex:1;
}
.mob_col3{
    justify-content: flex-end;
    display: flex;
    color: white;
    font-size: 20px;
    flex: 1;
}
.icons-wrapper{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.mob_col3 span{
    display: flex;
    align-items: center;
}
.mob_menu_katalog li, .mob_menu_top li{
    font-size: 14px;
    margin-left: 15px;
    font: Arial;
    color: black; 
}
.mob_menu_katalog, .mob_menu_top{
    border-bottom: 0.3px solid lightgrey;
}
.mob_side_nav_top_center{
    font-weight: bold;
    font-size: 15px;
    display: inline-block;
}
.mobile-side-nav-wrapper{
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.5);
    z-index: 101;
}
.no-scroll{
    overflow: hidden;
}
.header_column_right i{
    margin-right: 5px;
    font-size: 14px;
}
/*Кнопка для открытия меню*/

#navbar_btn{
    display: none;
    cursor: pointer;
    height: 48px;
}
#navbar_btn:hover div{
    background-color: white;
}
.bar3, .bar2  {
  width: 35px;
  height: 4px;
  background-color: #fff;
  margin-bottom: 6px;
  transition: 0.4s;  
}
.bar1 {
  width: 35px;
  height: 4px;
  background-color: #fff;
  margin-bottom: 6px;
  margin-top: -3px;
  transition: 0.4s;
}
.change .bar1 {
  transform: translate(0, 10px) rotate(-45deg); 
}
.change .bar2 {
    opacity: 0;
}
.change .bar3 {
  transform: translate(0, -10px) rotate(45deg); 
}
.mobile_side_nav,.mobile_top_nav{
    display: none;
}
.mob_side_nav_top{
    border-bottom: 0.5px solid lightgrey;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.btn_close{
    display: flex;
    cursor:pointer;
    font-size: 40px;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
}
/*Всплытие подсказок при пустом избранном или сравнении */
.fav:hover::after{
    opacity: 1;
}
.opacity::after{
    position: absolute;
    width: max-content;
    opacity: 0;
    top: 22px;
    left: 0;
    background: rgb(255, 255, 255);
    transition: 0.5s;
    pointer-events: none;
    padding: 5px;
    color: black
}
.fav::after{
    content: 'Добавьте товары в избранное';
}
.compare:hover::after{
    opacity: 1;
}
.compare::after{
    content: 'Добавьте товары в cписок сравнения';
}
.cart:hover::after{
    opacity: 1;
}
.cart::after{
    content: 'Ваша корзина пуста';
}

@media screen and (max-width: 1200px) {
    .header_top {
        display: none;
    }
    .mobile_side_nav{
        height: 100%;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        background-color: #FFFFFF;
        overflow: hidden;
        width: 0;
        display: inline;
        
    }
    .mobile_side_nav li {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        display: block;
    }
    .mobile_side_nav li{
        cursor: pointer;
    }
    .mobile_side_nav.responsive {
        width: 400px;
    }
    @media (max-width: 450px){
        .mobile_side_nav.responsive {
            width: 100%;
        }
    }
    .mobile_top_nav {
        background: #0B0E0B;
        height: 40px;
        position: fixed;
        display: flex;
        justify-content: space-between;
        top: 0;
        left: 0;
        right: 0;
        z-index: 5;
        width: 100vw;
        box-shadow: 0px 2px 2px rgba(0, 8, 29, 0.05),0px 0px 2px rgba(0, 8, 29, 0.06),0px 1px 3px rgba(0, 8, 29, 0.08);
    }
    .container-mobile {
        display: inline-block;
        cursor: pointer;
        height: auto;
        position: absolute;
        z-index: 100;
        top:0;
        left:0;
        padding-left: 5px;
        padding-top: 10px;
    }
    .header_middle{
        display: none;
    }
}
</style>