<script>
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
    }
  },
  methods: {
    deleteUsedFilters(){
      this.$store.commit('SET_FILTERED_PRODUCTS', [])
      this.$store.commit('SET_FILTER', {category: [], subcategory: [], priceFrom: null, priceTo: null})
      const checkboxes = document.querySelectorAll('input[type="checkbox"]')
      checkboxes.forEach(checkbox=>{
        if(checkbox.checked){
          checkbox.checked = !checkbox.checked
        }
      })
    },
    setValuesForFilters(){
      const priceList = this.$store.state.showedProducts.map(product=> product.price)
      this.$store.state.products.map(product=>!this.categoriesList.find(category=> category == product.categoryFilter) ? this.categoriesList.push(product.categoryFilter) : '')
      this.$store.state.products.map(product=>product.hasOwnProperty('subcategoryFilter')? (!this.subcategoriesList.find(subcategory=> subcategory == product.subcategoryFilter) ? this.subcategoriesList.push(product.subcategoryFilter) : '') : '')
      this.minPrice = Math.min(...priceList)
      this.maxPrice = Math.max(...priceList)
    },
    priceFilterSliderRange(e){
      const inputMin = document.querySelector('.range-min')
      const inputMax = document.querySelector('.range-max')
      const priceMin = document.querySelector('input[name="priceFrom"]')
      const priceMax = document.querySelector('input[name="priceTo"]')
      const inputMinValue = parseInt(inputMin.value)
      const inputMaxValue = parseInt(inputMax.value)
      const progress = document.querySelector('.filter-price-slider-progress')
      if(!e){
        progress.style.left = 0
        progress.style.right = 0
      }
      if(inputMaxValue - inputMinValue < this.priceGap){
        if(e){
          if(e.target.className === 'range-min'){
            inputMin.value = inputMaxValue - this.priceGap
          } else {
            inputMax.value = inputMinValue + this.priceGap
          }
        }
      } else {
        priceMin.value = inputMinValue
        priceMax.value = inputMaxValue
        progress.style.left = ((inputMinValue - inputMin.min) * 100) / (inputMin.max - inputMin.min) + "%"
        progress.style.right = ((inputMin.max - inputMaxValue) * 100) / (inputMax.max - inputMax.min) + "%"
      }
    },
    priceFilterInput(e){
    const inputMin = document.querySelector('.range-min')
    const inputMax = document.querySelector('.range-max')
    const priceMin = document.querySelector('input[name="priceFrom"]')
    const priceMax = document.querySelector('input[name="priceTo"]')
    const rangeInputMinValue = parseInt(inputMin.value)
    const rangeInputMaxValue = parseInt(inputMax.value)
    const inputMinValue = parseInt(priceMin.value)
    const inputMaxValue = parseInt(priceMax.value)
    const progress = document.querySelector('.filter-price-slider-progress')
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
      console.log("checked")
      console.log(e.target.value)
      if(!this.$store.state.filter.category.includes(e.target.value)){
        const filter = this.$store.state.filter
        filter.category.push(e.target.value)
        console.log("filterArr", filter)
        this.$store.commit('SET_FILTER', filter)

      }
    } else {
      console.log("unchecked")
       if(this.$store.state.filter.category.includes(e.target.value)){
        const filter = this.$store.state.filter
        filter.category.splice(filter.category.findIndex(category=> category == e.target.value), 1)
        this.$store.commit('SET_FILTER', filter)
       }
    }
  }, 
  handleFilterSubcategory(e){
    if(e.target.checked){
      console.log("checked")
      console.log(e.target.value)
      if(!this.$store.state.filter.subcategory.includes(e.target.value)){
        const filter = this.$store.state.filter
        filter.subcategory.push(e.target.value)
        this.$store.commit('SET_FILTER', filter)
      }
    } else {
      console.log("unchecked")
       if(this.$store.state.filter.subcategory.includes(e.target.value)){
        const filter = this.$store.state.filter
        filter.subcategory.splice(filter.subcategory.findIndex(subcategory=> subcategory == e.target.value), 1)
        this.$store.commit('SET_FILTER', filter)
       }
    }
  },
  handleFilterPrice(){
    if(document.querySelector('input[name="priceFrom"]').value >= this.minPrice || document.querySelector('input[name="priceTo"]').value <= this.maxPrice){
      console.log("handleFilterPrice")
      const filter = this.$store.state.filter
      filter.priceFrom = document.querySelector('input[name="priceFrom"]').value
      filter.priceTo = document.querySelector('input[name="priceTo"]').value
      this.$store.commit('SET_FILTER', filter)
    }
  },
  toggleMobileFilters(){
    this.isMobileFiltersOpen = !this.isMobileFiltersOpen
  }
},
  
  watch: {
    isMobileFiltersOpen(){
      this.isMobileFiltersOpen ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll')
    },
    $route(){
      this.$store.commit('SET_FILTERED_PRODUCTS', [])
      this.setValuesForFilters()
    },
    '$store.state.sortedProducts'(){
      console.log('sortedProducts')
      this.$store.state.sortedProducts.length ? this.$store.commit('showProducts', this.$store.state.sortedProducts) : this.$store.state.filteredProducts.length ? this.$store.commit('showProducts', this.$store.state.filteredProducts) : this.$store.commit('showProducts', this.$store.state.showedProducts)
    },
    '$store.state.filteredProducts'(){
      console.log('filteredProducts')
      this.$store.state.sortedProducts.length ? this.$store.commit('showProducts', this.$store.state.sortedProducts) : this.$store.state.filteredProducts.length ? this.$store.commit('showProducts', this.$store.state.filteredProducts) : this.$store.commit('showProducts', this.$store.state.showedProducts)
    },
    '$store.state.showedProducts'(){
      console.log('showedProducts')
      !this.$store.state.filteredProducts.length && !this.$store.state.sortedProducts.length ? this.$store.commit('showProducts', this.$store.state.showedProducts) : ''
    },
    '$store.state.filter': {
      handler(){
        /* if(this.filter.category.length || this.filter.subcategory.length || this.filter.priceFrom || this.filter.priceTo){
          this.$store.dispatch('filter', this.filter)
        } */
        this.$store.dispatch('filter', this.$store.state.filter)
      },
      deep: true
    },
  },
  mounted(){
      this.$store.commit('showProducts', this.$store.state.showedProducts)
      this.setValuesForFilters()
      this.priceFilterSliderRange()
  }
}
</script>

<template>
  <div class="wrapp-shadow" :class="{shadow: isMobileFiltersOpen}"></div>
  <div class="filter-icon-wrapper" @click="toggleMobileFilters"><img src="@/images/filter-icon.png"/></div>
  <div class="filter-area-wrapper" :class="{'mobile-filters-bar' : isMobileFiltersOpen}">
    <span class="close-mobile-filters-icon" @click="toggleMobileFilters">✕</span>
    <div class="usedFilters" @click="deleteUsedFilters" v-if="$store.state.filteredProducts.length"><my-button>Cбросить все фильтры</my-button></div>
    <h2>Фильтры</h2>
    <div class="filter-price">
          <div class="filter-input-price-wrapper">
            <input class="filter-input-price input-min" type="number" name="priceFrom" @change="handleFilterPrice" @input="priceFilterInput" :value="minPrice" :min="minPrice"/>
              <div class="input-divider">-</div>
            <input class="filter-input-price input-max" type="number" name="priceTo" @change="handleFilterPrice" @input="priceFilterInput" :value="maxPrice" :max="maxPrice"/>
            <my-button @click="handleFilterPrice">ОК</my-button>
          </div>
        <div class="filter-price-range-wrapper">
            <div class="filter-price-slider">
              <div class="filter-price-slider-progress"></div>
            </div>
            <div class="price-toggle-wrapper">
              <input name="priceFromRange" type="range" class="ranges-filter range-min" :min="minPrice" :max="maxPrice" :value="minPrice" @input="priceFilterSliderRange"/>
              <input name="priceToRange" type="range" class=" ranges-filter range-max" :min="minPrice" :max="maxPrice" :value="maxPrice" @input="priceFilterSliderRange"/>
            </div>
        </div>
    </div>
    <div class="filter-categories-wrapper">
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
    <div class="filter-subcategories-wrapper">
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
.wrapp-shadow{
  display: none;
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
.shadow{
  position: absolute;
  display:flex;
  width:100%;
  height:100%;
  justify-content:center;
  align-items:center;
  background:rgba(0,0,0,.5);
  z-index:100;
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
    z-index: 100;
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
</style>