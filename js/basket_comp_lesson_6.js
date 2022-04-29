Vue.component('basket-block-list', {
        props: ['stat'],
        data() {
            return {
                basket_items: [],
                catalog: '/getBasket.json',
                error: false,
            }
        },
        methods: {},
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
                            <a href="#" class="del_buttion" data-id="${this.id}">X</a>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>    
            `
    }
)