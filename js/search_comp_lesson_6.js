Vue.component('search-block', {
    props: ['search'],
    data() {
        return {
            catalog: '/catalogData.json',
            good_filtered: [],
            all_goods: [],
        }
    },
    methods: {
        // method of filtering of goods from server
        filterGoods(search) {
            if (search) {
                console.log(search)
                const regexp = new RegExp(search, 'i');
                this.good_filtered = this.$parent.currentList.filter(product => regexp.test(product.product_name));
                // send filtered data to the parent
                this.$parent.currentList = this.good_filtered;
            } else {
                // send all data from server to the parent
                this.$parent.currentList = this.all_goods;
            }
        },
    },
    mounted() {
        // send request to server and refresh data of goods
        this.$parent.getJson(`${this.catalog}`)
            .then(data => {
                this.all_goods = data;
            });
    },
    updated(){
        console.log(search);
    },
    template: `
        <button @click="filterGoods(search)"> Search</button>
    `
}
)

