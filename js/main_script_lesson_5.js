const mainUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue(
    {
        el: '#app',
        data: {
            currentList: [],
            basketItem: [],
            goodsItem: [],
            isVisibleCart: false,
            IsVisibleGood: false,
            filteredItem: false,
            searchLine: '',
        },
        methods: {
            getJson(url) {
                return fetch(url ? url : `${mainUrl + url}`)
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error);
                    })
            },
            checkBasketItem() {
                if (this.basketItem) {
                }
            },
            filterGoods(searchLine) {
                if (searchLine) {
                    const regexp = new RegExp(searchLine, 'i');
                    this.filteredItem = this.goodsItem.filter(product => regexp.test(product.product_name));
                    console.log(this.filteredItem);
                    this.currentList = this.filteredItem;
                } else {
                    this.currentList = this.goodsItem;
                }
            },
            getItem() {
                this.getJson(`${mainUrl}/catalogData.json`).then(data => {
                    if (data) {
                        this.goodsItem = data;
                        this.IsVisibleGood = true;
                        this.currentList = this.goodsItem;
                    } else {
                        this.goodsItem = 'No items found';
                        this.IsVisibleGood = false;
                        this.currentList = this.goodsItem;
                    }
                });
            },
            getBasket() {
                this.getJson(`${mainUrl}/getBasket.json`).then(data => {
                    if (data) {
                        this.basketItem = data['contents'];
                    }
                });
            },
        },
        mounted() {
            this.getBasket();
            this.getItem();
        },
        updated() {
            // this.getItem();
        }
    }
)