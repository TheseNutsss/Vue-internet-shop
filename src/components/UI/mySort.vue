<script>
export default {
    name: 'my-sort',
    data () {
        return {
            isSortOpen: false,
            sortCriteria: "default",
        }
    },
    mounted(){
        document.addEventListener('click', (e)=> {
            if(!e.target.classList.contains('choosed-sort-option') && !e.target.hasAttribute('data-sort')){               
                this.isSortOpen !== false ? this.isSortOpen = !this.isSortOpen : ''
            }
        })       
    },
    watch: {
        sortCriteria(){
            this.$store.dispatch('SORT_PRODUCTS', this.sortCriteria)  
        },
        $route(){
            document.querySelector(".choosed-sort-option").innerHTML = "По умолчанию"
            this.sortCriteria = "default"
        },
        '$store.state.filteredProducts'(){
            !this.$store.state.filteredProducts.length && this.$store.state.sortedProducts ? this.$store.dispatch('SORT_PRODUCTS', this.sortCriteria) : ''
            this.$store.state.filteredProducts.length && this.$store.state.sortedProducts ? this.$store.dispatch('SORT_PRODUCTS', this.sortCriteria) : ''
        }
    },
    methods: {
        showSortOptions(event){
            this.isSortOpen = !this.isSortOpen
            if(event.target.tagName == "LI"){
                document.querySelector(".choosed-sort-option").innerHTML = event.target.innerHTML
                this.sortCriteria = event.target.dataset.sort
            }
        }
    }
    
}


</script>

<template>
<div class="sort-wrapper">
    <div class="sort-wrapper-content">
  <h3>Сортировка</h3>
    <div class="sort-options">
        <p @click="showSortOptions" class="choosed-sort-option">По умолчанию</p>
        <ul :class="{open: isSortOpen}" class="sort-list" @click="showSortOptions">
            <li data-sort ="default">По умолчанию</li>
            <li data-sort ="priceAsc">По возрастанию цен</li>
            <li data-sort ="priceDsc">По уменьшению цен</li>
        </ul>
    </div>
    </div>
</div>
</template>

<style>
.sort-wrapper{
    display: flex;
}
.sort-list{
    display: none;
    flex-direction: column;
    list-style-type: none;
    position: absolute;
    border: 1px solid black;
    background-color: white;
    border-radius: 5px;
    z-index: 2;
}
.sort-list li{
    padding: 5px;
    cursor: pointer;
}
.sort-list li:hover{
    background-color: rgba(100, 104, 103, 0.119);
}
.open {
    display: flex;
}
.choosed-sort-option{
    border-bottom: 1px dashed rgb(11, 64, 126);
    color: rgb(11, 64, 126);
    padding: 0 5px;
    cursor: pointer;
}
.sort-wrapper-content{
    display: flex;
    align-items: baseline;
    padding: 5px;
}
</style>