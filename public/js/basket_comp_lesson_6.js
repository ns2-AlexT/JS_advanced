Vue.component('basketBlockList', {
        props: ['stat'],
        data() {
            return {
                basket_items: [],
                catalog: '/api/basket',
                error: false,
            }
        },
        methods: {
            addProduct(good) {
                let find = this.basket_items.find(el => el.id_product === good.id_product);
                if (find) {
                    this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                    find.quantity++;
                } else {
                    let new_good = Object.assign({quantity: 1}, good);
                    this.$parent.postJson('/api/cart', new_good)
                        .then(data => {
                            if (data.result === 1) {
                                this.basket_items.push(new_good);
                            }
                        });
                }
            },
            delProduct(basket_item) {
                let find = this.basket_items.find(el => el.id_product === basket_item.id_product);
                if (find) {
                    let basket_item_idx = this.basket_items.findIndex(i => i.id_product === basket_item.id_product);
                    this.$parent.delJson(`/api/cart/${find.id_product}`, {idx: basket_item_idx});
                    this.basket_items.splice(basket_item_idx, basket_item_idx);
                }
            },
        },
        mounted() {
            // send request to server and refresh data of goods in basket
            this.$parent.getJson(`${this.catalog}`)
                .then(data => {
                    this.basket_items = data['contents'];
                });
        },
        template:
        // render HTML-block to main index file
            `
        <div>
            <div class="container_for_basket" :style="stat ? { 'display': 'block' } : { 'display': 'none' }">
            <div class="container_for_basket"> Your basket  </div>
                <div v-for="basket_item in basket_items" class="container_for_basket" style="justify-content: center"
                     :key="basket_item.id_product">
                    <div class="block_of_good">
                        <div class="card-body">
                            <h5 class="card-title"> {{ basket_item.product_name }}</h5>
                            <p>price: {{ basket_item.price }}</p>
                            <p>quantity: {{ basket_item.quantity }}</p>
                            <a href="#" class="del_buttion" data-id="${this.id}"  
                            @click="delProduct(basket_item)">X</a>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>    
            `
    }
)