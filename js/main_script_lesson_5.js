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
                return fetch(`${mainUrl + url}`)
                    .then(result => result.json())
                    .catch(error => {
                        this.$root.$refs.err.addError(error.message);
                    })
            },
            // get all goods from server
            getItem() {
                this.getJson(`/catalogData.json`).then(data => {
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
        },
        // fill goods from server on start app
        mounted() {
            this.getItem();
        },
    }
)
