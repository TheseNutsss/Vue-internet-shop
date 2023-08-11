<script>
import { mapState, mapMutations, mapActions } from "vuex"
export default {
  name: 'my-filter',
  data() {
    return {
      priceGap: 1,
      categoriesList: [],
      subcategoriesList: [],
      minPrice: null,
      maxPrice: null,
      isMobileFiltersOpen: false,
      filterCategory: [],
      priceSliderMin: null,
      priceSliderMax: null,
      isLoadingFilters: false,
    }
  },
  computed: {
    ...mapState({
      products: state => state.products,
      categories: state => state.categories,
      filterOptions: state => state.filters.filterOptions,
      filteredProducts: state => state.filters.filteredProducts,
      categoriesProducts: state => state.filters.categoriesProducts,
      usedFilter: state => state.filters.usedFilter,
      showedProducts: state => state.showedProducts,
      sortOption: state => state.sort.sortOption,
    })
  },
  methods: {
    ...mapMutations(['SET_FILTER', 'SET_FILTERED_PRODUCTS', 'SET_USED_FILTER', 'setProducts', 'showProducts']),
    ...mapActions(['filterProducts', 'SORT_PRODUCTS', 'productList', 'catalog']),
    async deleteUsedFilters(){
      this.subcategoriesList = []
      await this.SET_FILTER({category: [], subcategory: [], priceFrom: null, priceTo: null})
      const checkboxes = document.querySelectorAll('input[type="checkbox"]')
      checkboxes.forEach(checkbox=>{
        if(checkbox.checked){
          checkbox.checked = !checkbox.checked
        }
      })

      this.setValuesForFilters()

      
    },
    async setValuesForFilters(){
      console.log('setValuesForFilters')
      this.isLoadingFilters = !this.isLoadingFilters
      let priceList = this.products.filter(product=> {
        if(Object.values(this.filterOptions.subcategory).length){
          if(product.hasOwnProperty('subcategory')){
            if(this.filterOptions.subcategory.includes(product.subcategory)){
              product.price
            }
          }
        } else if(Object.values(this.filterOptions.category).length){
          if(this.filterOptions.category.includes(product.categoryFilter)){
            product.price
          }
        }
      })
      if(!priceList.length){
        priceList = this.categoriesProducts.map(product => product.price)
      }
      console.log('priceList', priceList)
      this.products.map(product=>!this.categoriesList.find(category=> category == product.categoryFilter) ? this.categoriesList.push(product.categoryFilter) : '')
      this.minPrice = Math.min(...priceList)
      this.maxPrice = Math.max(...priceList)
      setTimeout(()=>{
        this.priceSliderMin = this.minPrice
        this.priceSliderMax =  this.maxPrice
        this.isLoadingFilters = !this.isLoadingFilters
      }, 100)
      this.$refs.filterInputMin.setAttribute('min', this.minPrice)
      this.$refs.filterInputMax.setAttribute('max', this.maxPrice)
      this.$refs.filterInputMin.value = this.minPrice
      this.$refs.filterInputMax.value = this.maxPrice
      const progress = this.$refs.progress
      progress.style.cssText = "left: 0; right: 0;"
    },
    slideOne(){
      console.log('slideOne')
      const inputMin = this.$refs.rangeMin
      const inputMax = this.$refs.rangeMax
      const numberInputMin = this.$refs.filterInputMin
      if(parseInt(inputMax.value) - parseInt(inputMin.value) < this.priceGap){
        inputMin.value = parseInt(inputMax.value) - this.priceGap
      } else {
        numberInputMin.value = inputMin.value
        this.fillColor()
      }
    },
    slideTwo(){
      console.log('slideOne')
      const inputMin = this.$refs.rangeMin
      const inputMax = this.$refs.rangeMax
      const numberInputMax = this.$refs.filterInputMax
      if(parseInt(inputMax.value) - parseInt(inputMin.value) < this.priceGap){
        inputMax.value = parseInt(inputMin.value) + this.priceGap
      } else {
        numberInputMax.value = inputMax.value
        this.fillColor()
      }
      
    },
    fillColor(){
      const progress = this.$refs.progress
      const inputMin = this.$refs.rangeMin
      const inputMax = this.$refs.rangeMax
      progress.style.left = ((inputMin.value - inputMin.min) * 100) / (inputMin.max - inputMin.min) + "%"
      progress.style.right = ((inputMin.max - inputMax.value) * 100) / (inputMax.max - inputMax.min) + "%"
    },
    priceFilterInput(e){
      console.log('priceFilterInput')
      const inputMin = document.querySelector('.range-min')
      const inputMax = document.querySelector('.range-max')
      const priceMin = document.querySelector('input[name="priceFrom"]')
      const priceMax = document.querySelector('input[name="priceTo"]')
      const inputMinValue = parseInt(priceMin.value)
      const inputMaxValue = parseInt(priceMax.value)
      const progress = this.$refs.progress
      if((inputMaxValue - inputMinValue >= this.priceGap) && (inputMinValue >= this.minPrice) && (inputMaxValue <= this.maxPrice)){
        if(e.target.classList.contains('input-min')){
          inputMin.value = inputMinValue
          progress.style.left = ((inputMinValue - inputMin.min) * 100) / (inputMin.max - inputMin.min) + "%"
        } else {
          inputMax.value = inputMaxValue
          progress.style.right = ((inputMin.max - inputMaxValue) * 100) / (inputMax.max - inputMax.min) + "%"
        }
      }
  },
  handleFilterCategory(e){
    if(e.target.checked){
      const filter = this.filterOptions
      filter.category.push(e.target.value)
      console.log("filterArr", filter)
      this.SET_FILTER(filter)
      this.filterCategory.push(e.target.value)
      this.showSubcategory(e.target.value)
    } else {
      const filter = this.filterOptions
      filter.category.splice(filter.category.findIndex(category=> category == e.target.value), 1)
      this.SET_FILTER(filter)
      const indexToDelete = this.filterCategory.findIndex(category => category == e.target.value)
      this.filterCategory.splice(indexToDelete, 1)
      this.removeSubcategory(e.target.value)
    }
  }, 
  handleFilterSubcategory(e){
    if(e.target.checked){
      if(!this.filterOptions.subcategory.includes(e.target.value)){
        const filter = this.filterOptions
        filter.subcategory.push(e.target.value)
        this.SET_FILTER(filter)
      }
    } else {
      if(this.filterOptions.subcategory.includes(e.target.value)){
        const filter = this.filterOptions
        filter.subcategory.splice(filter.subcategory.findIndex(subcategory=> subcategory == e.target.value), 1)
        this.SET_FILTER(filter)
      }
    }
  },
  handleFilterPrice(){
    console.log('handleFilterPrice')
    if(document.querySelector('input[name="priceFrom"]').value >= this.minPrice || document.querySelector('input[name="priceTo"]').value <= this.maxPrice){
      console.log("handleFilterPrice")
      const filter = this.filterOptions
      filter.priceFrom = document.querySelector('input[name="priceFrom"]').value
      filter.priceTo = document.querySelector('input[name="priceTo"]').value
      this.SET_FILTER(filter)
    }
  },
  toggleMobileFilters(){
    this.isMobileFiltersOpen = !this.isMobileFiltersOpen
  },
  showSubcategory(category){
    if(this.categories[category].length){
      this.categories[category].forEach(subcategory => this.subcategoriesList.push(subcategory))
    }
  },
  removeSubcategory(category){
    console.log(category)
    if(this.categories[category].length){
      this.categories[category].forEach(subcategory => this.subcategoriesList.splice(this.subcategoriesList.findIndex(subcategoryItem => subcategoryItem == subcategory), 1))
    }
  }
},
  watch: {
    isMobileFiltersOpen(){
      this.isMobileFiltersOpen ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll')
    },
    $route(){
      this.deleteUsedFilters()
    },
    filterOptions: {
      async handler(){
        console.log('filterOptions')
        if(Object.values(this.filterOptions).join('')== ""){
          if(this.$route.params.hasOwnProperty('catalog')){
            this.catalog()
          } else {
            this.productList(this.$route.params)
          }
        } else if ((this.filterOptions.priceFrom || this.filterOptions.priceTo) && (!this.filterOptions.category.length && !this.filterOptions.subcategory.length) ) {
          this.filterProducts()
        } else {
          await this.filterProducts()
          await this.setValuesForFilters()
        }
        if(this.sortOption !== "default"){
          this.SORT_PRODUCTS(this.sortOption)
        }
      },
      deep: true
    },
  },
  mounted(){
    this.setValuesForFilters()
    /* this.slideOne()
    this.slideTwo() */
  }
}
</script>

<template>
<teleport to="body">
  <div class="overlay" :class="{overlayIsOn: isMobileFiltersOpen}" @click="toggleMobileFilters"></div>
</teleport>
  <div class="filter-icon-wrapper" @click.stop="toggleMobileFilters"><img src="@/assets/filter-icon.png"/></div>
  <div class="filter-area-wrapper" :class="{'mobile-filters-bar' : isMobileFiltersOpen}">
    <span class="close-mobile-filters-icon" @click.stop="toggleMobileFilters">✕</span>
    <div class="usedFilters" @click.stop="deleteUsedFilters" v-if="Object.values(filterOptions).join('')!== ''"><my-button>Cбросить все фильтры</my-button></div>
    <h2>Фильтры</h2>
    <div class="filter-price">
      <div class="price-filter-overlay" v-if="isLoadingFilters"><div class="loader"></div></div>
      <div class="filter-input-price-wrapper">
        <input class="filter-input-price input-min" type="number" ref="filterInputMin" name="priceFrom" @change="handleFilterPrice" @input="priceFilterInput"/>
          <div class="input-divider">-</div>
        <input class="filter-input-price input-max" type="number" ref="filterInputMax" name="priceTo" @change="handleFilterPrice" @input="priceFilterInput"/>
        <my-button @click.prevent="handleFilterPrice">ОК</my-button>
      </div>
      <div class="filter-price-range-wrapper">
          <div class="filter-price-slider">
            <div class="filter-price-slider-progress" ref="progress"></div>
          </div>
          <div class="price-toggle-wrapper">
            <input name="priceFromRange" type="range" ref="rangeMin" class="ranges-filter range-min" :min="minPrice" :max="maxPrice" v-model="priceSliderMin" @input="slideOne"/>
            <input name="priceToRange" type="range" ref="rangeMax" class="ranges-filter range-max" :min="minPrice" :max="maxPrice" v-model="priceSliderMax" @input="slideTwo"/>
          </div>
      </div>
    </div>
    <div class="filter-categories-wrapper">
      <div class="price-filter-overlay" v-if="isLoadingFilters"><div class="loader"></div></div>
      <div class="categories">
        <h3>Категории</h3>
        <ul class="filter-category-list">
        <template v-for="category in categoriesList">
          <li>
            <input type="checkbox" name="filter-category" :id="category" :value="category" @change="handleFilterCategory"/>
            <label :for="category">{{category}}</label>
          </li>
        </template>
        </ul>
      </div>
    </div>
    <div class="filter-subcategories-wrapper" v-if="subcategoriesList.length">
      <div class="price-filter-overlay" v-if="isLoadingFilters"><div class="loader"></div></div>
      <div class="subcategories">
        <h3>Подкатегории</h3>
        <ul class="filter-subcategory-list">
           <template v-for="subcategory in subcategoriesList">
           <li>
            <input type="checkbox" name="filter-subcategory" :id="subcategory" :value="subcategory" @change="handleFilterSubcategory"/>
            <label :for="subcategory">{{subcategory}}</label>
           </li>
           </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.overlay{
  display: none;
}
.overlayIsOn{
  position: absolute;
  display:flex;
  width:100%;
  height:100%;
  justify-content:center;
  align-items:center;
  background:rgba(0,0,0,.5);
  z-index:100;
  left: 0;
  top: 0;
}
.filter-input-price-wrapper,.filter-price-range-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}
.filter-price-range-wrapper{
  height: 30px;
  justify-content: center;
  position: relative;
  flex-direction: column;

}
.input-divider{
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filter-input-price{
  padding: 8px;
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.418);
  width: 40%;
  flex: 2;
  text-align: center;
  -moz-appearance: textfield;
}
.filter-input-price::-webkit-outer-spin-button,
.filter-input-price::-webkit-inner-spin-button{
  -webkit-appearance: none;
}
.filter-price button{
  flex: 1;
  margin-left: 5px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background-color: #FCCC26;
  cursor: pointer; 
}
.filter-area-wrapper{
  flex: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}
.filter-area-wrapper h2{
  padding: 20px;
}
.filter-price{
  width: 100%;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 8, 29, 0.05),0px 0px 2px rgba(0, 8, 29, 0.06),0px 1px 3px rgba(0, 8, 29, 0.08);
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin-bottom: 10px;
  position: relative;
}
.filter-price-slider{
  height: 4px;
  width: 100%;
  background: #ddd;
  position: relative;
  border-radius: 5px;
}
.filter-price-slider-progress{
  height: 4px;
  background: #FCCC26;
  position: absolute;
  border-radius: 5px;
}
.price-toggle-wrapper{
  position: relative;
}
.price-toggle-wrapper input{
  position: absolute;
  width: 100%;
  margin-top: -10px;
  -webkit-appearance: none;
  background: none;
  pointer-events: none;
}
input[type="range"]::-webkit-slider-thumb{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  -webkit-appearance: none;
  background-color: #FCCC26;
  pointer-events: auto;
}
input[type="range"]::-moz-slider-thumb{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  -moz-appearance: none;
  background-color: #FCCC26;
  pointer-events: auto;
  border: none;
}
.ranges-filter::-webkit-slider-thumb:hover{
  transform: scale(1.4);
  transition: 0.1s ease-in-out;
  cursor: pointer;
}
.ranges-filter::-webkit-slider-thumb:active{
  transform: scale(1.1);
}
.filter-categories-wrapper, .filter-subcategories-wrapper{
  width: 100%;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 8, 29, 0.05), 0px 0px 2px rgba(0, 8, 29, 0.06), 0px 1px 3px rgba(0, 8, 29, 0.08);
  flex-direction: column;
  align-items: center;
  padding: 16px;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
}
.categories, .subcategories{
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.filter-category-list, .filter-subcategory-list{
  list-style-type: none;
  width: 100%;
}
.filter-icon-wrapper{
  display: none;
}
.close-mobile-filters-icon{
  display: none;
  z-index: 7;
}
.usedFilters{
  padding: 5px;
}
@media (max-width: 1200px){
  .filter-area-wrapper{
    display: none;
  }
  .filter-icon-wrapper{
    position: fixed;
    right: 0;
    bottom: 20%;
    z-index: 5;
    background-color: rgba(104, 101, 101, 0.247);
    width: 50px;
    height: 50px;
    border-radius: 5px;
    display: block;
  }
  .filter-icon-wrapper img{
    max-width: 100%;
  }
  .mobile-filters-bar{
    height: 100%;
    position: fixed;
    z-index: 101;
    top: 0;
    right: 0;
    background-color: #FFFFFF;
    overflow: hidden;
    width: 400px;
    display: inline;
    margin-right: 0;
  }
  @media (max-width: 450px){
    .mobile-filters-bar {
        width: 100%;
    }
  }
  .close-mobile-filters-icon{
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 25px;
    margin-right: 10px;
  }
}
.price-filter-overlay{
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index:100;
  left: 0;
  top: 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #FCCC26;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>