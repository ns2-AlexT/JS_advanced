Vue.component('goodsBlockList', {
        props: ['stat', 'stat_2'],
        data() {
            return {
                IsVisibleGood: false,
                currentList: [],
                goodsItem: [],
                catalog: '/api/products',
                error: false,
            }
        },
        methods: {
            // addProduct(good) {
            //     let find = this.basket_items.find(el => el.id_product === good.id_product);
            //     if (find) {
            //         this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
            //         find.quantity++;
            //     } else {
            //         let new_good = Object.assign({quantity: 1}, good);
            //         this.$parent.postJson('/api/cart', new_good)
            //             .then(data => {
            //                 if (data.result === 1) {
            //                     this.basket_items.push(new_good);
            //                 }
            //             });
            //     }
            // },
            // delProduct(basket_item) {
            //     let find = this.basket_items.find(el => el.id_product === basket_item.id_product);
            //     if (find) {
            //         let basket_item_idx = this.basket_items.findIndex(i => i.id_product === basket_item.id_product);
            //         this.$parent.delJson(`/api/cart/${find.id_product}`, {idx: basket_item_idx});
            //         this.basket_items.splice(basket_item_idx, basket_item_idx);
            //     }
            // },
        },
        mounted() {
            // send request to server and refresh data of goods in basket
            this.$parent.getJson(`${this.catalog}`)
                .then(data => {
                        if (data) {
                            this.goodsItem = data;
                            this.IsVisibleGood = true;
                            this.currentList = this.goodsItem;
                        } else {
                            this.goodsItem = 'No items found';
                            this.IsVisibleGood = false;
                            this.currentList = this.goodsItem;
                        }
                    }
                );
        },
        template:
        // render HTML-block to main index file
            `
              <!-- block of items from server -->
        <div>
        <div v-if="!stat && !stat_2" class="container_for_goods" style="justify-content: center">
            <div v-if="IsVisibleGood" class="text_middle"> Products
                <div v-for="good in currentList" :key="good.id_product">
                    <div class="block_of_good">
                            <h5 class="card-title"> {{ good.product_name }}</h5>
                            <p>price: {{ good.price }} </p>
                            <button class="top_buttion" data-id="good.id_product"
                                    @click="$root.$refs.productBlock.showProduct(good)">Open
                            </button>
                    </div>
                </div>
            </div>
            <div v-else class="text_middle"> {{goodsItem}}</div>
        </div>
        </div>    
            `
    }
)