const app = new Vue(
    {
        el: '#app',
        data: {
            isShowProduct: false,
            isShowCart: false,
            isVisibleCart: false,
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
        },
        // fill goods from server on start app
        mounted() {
        },
    }
)