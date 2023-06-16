<script>

</script>

<template>
<div class="container">
    <div class="compare-container">
        <h2>Cписок сравнения</h2>
        <div class="compare-wrapper" v-if="$store.state.comparelist.length">
            <div class="compare-item-wrapper">
            <template v-for="product in $store.state.products">
                <template v-if="product.compare"> 
                    <my-product :product="product"><p class="icon-delete_compare-item" @click="$store.dispatch('addToComparelist', product.id)">✕</p></my-product>
                </template>
            </template>
            </div>
            <div class="compare-item-info-wrapper">
                <div class="compare-item-info">
                    <ul class="compare-info-main-list">
                        <li>Бренд</li>
                        <li>Категория</li>
                        <li>Цена</li>
                    </ul>
                </div>
                <template v-for="product in $store.state.products">
                    <template v-if="product.compare">
                        <div class="compare-item-info">
                            <p>{{product.brand}}</p>
                            <p>{{product.categoryFilter}}</p>
                            <p>{{product.price}}</p>
                        </div>
                    </template>
                </template>
            </div>
        </div>
        <p v-else>Список сравнения пуст</p>
    </div>
</div>
</template>

<style scoped>
.compare-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    line-height: 25px;
}
.compare{
    flex: 1;
}
.product{
    width: calc(20% - 10px)
}
.product:first-child{
    margin-left: calc(10% + 5px);
}
.compare-item-wrapper{
    display: flex;
}
.compare-item-info-wrapper{
    display: flex;
}
.compare-item-info{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;
    margin: 5px;
    background-color: #fff;
    box-shadow: 0px 2px 2px rgba(0, 8, 29, 0.05),0px 0px 2px rgba(0, 8, 29, 0.06),0px 1px 3px rgba(0, 8, 29, 0.08);
    border-radius: 5px;
    position: relative;
    padding: 10px;
    width: calc(20% - 10px);
}
.compare-item-info:first-child{
    width: calc(10% - 10px);
}
 .compare-img{
    width: 100%;
    padding-bottom: 10px;
  }
  .compare-img img{
    width: 100%;
    height: 100%;
  }
.compare-info-main-list{
    list-style-type: none;
}
.icon-delete_compare-item{
    position: absolute;
    top:0;
    right:0;
    margin-right: 5px;
    font-size: 20px;
    z-index: 2;
}
.product-link {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.compare-item .myBtn{
    z-index: 2;
}
@media screen and (max-width: 768px) {
    .compare-item-info{
        width: calc(50% - 10px);
    }
    .compare-item-info:first-child{
        width: max-content;
    }
    .product:first-child{
        margin-left: calc(25% + 5px);
}   
}
</style>
