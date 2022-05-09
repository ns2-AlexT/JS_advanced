Vue.component('minCart', {
    data() {
        return {
            basket_items: [],
            showCart: false,
        }
    },
    methods: {
        showBasketMain() {
            this.showCart = false;
            this.$parent.isShowProduct = false;
            this.$parent.isVisibleCart = true;
        },
    },
    mounted() {
        this.basket_items = this.$root.$refs.basketBlockList.basket_items;
        console.log(this.basket_items);
    },
    updated() {
        this.basket_items = this.$root.$refs.basketBlockList.basket_items;
        console.log(this.basket_items);
    },
    template: `
        <div>
            <a class="btn-cart" @click="showCart = !showCart" ><img src="img/basket.svg"></a>
            <div class="cart-block" v-show="showCart">
                <p v-if="!basket_items.length">Корзина пуста</p>
                 <div v-for="basket in basket_items">
                    <div class="cart-item">
                        <div class="product-bio">
                            <div class="product-desc">
                                <p class="product-title">{{basket.product_name}}</p>
                                <p class="product-quantity">{{basket.quantity}}</p>
                                <p class="product-single-price">{{basket.price}}</p>
                            </div>
                        </div>
                        <div class="right-block">
                            <p class="product-price">{{basket.quantity*basket.price}}₽</p>
                        </div>
                    </div>
                  
                 </div>
            <button class="top_buttion" @click="showBasketMain">Перейти в корзину</button>  
            </div>            
        </div>`
});

