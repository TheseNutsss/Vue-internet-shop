export default {
    state: {
        comparelist: []
    },
    mutations:{
        SET_COMPARELIST(context, products){
            products = JSON.parse(products)
            const comparelist = []
            products.forEach(compareProduct => {
                this.state.products.forEach(product => {
                    if(compareProduct === product.id){
                        product.compare = true
                        comparelist.push(product)
                    }
                })
            });
            this.state.comparelist = comparelist
        },
        UPDATE_COMPARELIST(context, compareProduct){
            console.log('UPDATE_COMPARELIST')
            this.state.products.forEach(product => {
                compareProduct === product.id ? product.compare = !product.compare : ''
            })
        },
        CLEAR_COMPARELIST(context){
            this.state.products.forEach(product=> product.compare ? product.compare = false : '')
        }
    },
    actions:{
        addToComparelist(context, product){
            if(localStorage.getItem('comparelist')){
                //Сравнение уже есть
                const comparelist = JSON.parse(localStorage.getItem('comparelist'))
                if(comparelist.includes(product)){
                    //удаляем из сравнений
                    comparelist.splice(comparelist.findIndex(compareProduct=> compareProduct == product), 1)
                    if(comparelist.length){
                        context.commit('UPDATE_COMPARELIST', product)
                        localStorage.setItem('comparelist', JSON.stringify(comparelist))
                        context.commit('SET_COMPARELIST', JSON.stringify(comparelist))
                    } else {
                        context.commit('CLEAR_COMPARELIST')
                        localStorage.removeItem('comparelist')
                        context.commit('SET_COMPARELIST', JSON.stringify([]))
                    }
                } else {
                    //добавляем
                    comparelist.push(product)
                    localStorage.setItem('comparelist', JSON.stringify(comparelist))
                    context.commit('UPDATE_COMPARELIST', product)
                    context.commit('SET_COMPARELIST', JSON.stringify(comparelist))
                }
            } else {
                //Первое добавление в избранное
                console.log('Первое добавление в избранное')
                localStorage.setItem('comparelist', JSON.stringify([product]))
                context.commit('SET_COMPARELIST', JSON.stringify([product]))
            }
            //this.state.products.forEach(product => product.wishlist ? console.log(product): '')
        }
    }
}