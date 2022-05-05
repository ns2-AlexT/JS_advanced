const mainUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue(
    {
        el: '#app',
        data: {
            currentList: [],
            goodsItem: [],
            isVisibleCart: false,
            IsVisibleGood: false,
            searchLine: '',
        },
        methods: {
            // request to sever and return data
            getJson(url) {
                // return fetch(`${mainUrl + url}`)
                return fetch(url)
                    .then(result => result.json())
                    .catch(error => {
                        this.$root.$refs.err.addError(error.message);
                    })
            },
            // add good or quantity to basket
            putJson(url, data) {
                return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                    .catch(error => {
                        this.$root.$refs.err.addError(error.message);
                    });
            },
            // del good to basket
            delJson(url, data) {
                return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                    .catch(error => {
                        this.$root.$refs.err.addError(error.message);
                    });
            },

            // add good to basket
            postJson(url, data) {
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                    .catch(error => {
                        this.$root.$refs.err.addError(error.message);
                    });
            },
            // get all goods from server
            getItem() {
                this.getJson('/api/products').then(data => {
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
            }
            ,
        },
        // fill goods from server on start app
        mounted() {
            this.getItem();
        },
    }
)