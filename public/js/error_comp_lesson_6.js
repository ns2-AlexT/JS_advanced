Vue.component('err', {
        data() {
            return {
                statusOfError: '',
                isError: false,
            }
        },
        methods: {
            addError(err){
                this.statusOfError = err;
                this.isError = true;
                }
        },
        mounted() {
        },

        template:
            // render HTML-block to main index file
            `
            <div :style="this.isError ? { 'display': 'block' } : { 'display': 'none' }">
                <div> Error from server : {{ statusOfError }} </div>
            </div>
            `
    }
)