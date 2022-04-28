Vue.component('err', {
        data() {
            return {
                statusOfError: '',
            }
        },
        methods: {
            addError(err){
                this.statusOfError = err;
            },
        },
        mounted() {
        },

        template:
            // render HTML-block to main index file
            `
            <div>
                <p> Error from server : {{ statusOfError }} </p>
            </div>
            `
    }
)