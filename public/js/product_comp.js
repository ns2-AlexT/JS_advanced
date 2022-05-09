Vue.component('productBlock', {
    props: ['isshow'],
    data() {
        return {
            // IsVisibleGood: false,
            currentItem: '', // goodsItem: [],
            // catalog: '/api/products',
            error: false,
        }
    }, methods: {
        showProduct(good) {
            console.log('inside');
            this.currentItem = good;
            this.$parent.isShowProduct = true;
        },
        hideProduct(){
            this.$parent.isShowProduct = false;
            this.$parent.isVisibleCart = false;
        },
    }, mounted() {
    },
    template: // render HTML-block to main index file
        `
        <!-- block of item -->
        <div>
          <div v-if="isshow" class="container_for_goods" style="justify-content: center">
            <div class="text_middle">
            <br>
                            <h5 class="card-title"> {{ currentItem.product_name }}</h5>
                            <p>price: {{ currentItem.price }} </p>
                            
                            <button class="top_buttion" data-id="currentItem.id_product"
                                    @click="$root.$refs.basketBlockList.addProduct(currentItem)">Add to basket
                            </button>
                            <button class="top_buttion" data-id="currentItem.id_product"
                                    @click="hideProduct"t>Back to catalog
                            </button>
             </div>               
            </div>
        </div>    
            `
})