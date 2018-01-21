import xxTitle from '../../components/xx-title/xx-title.vue';

export default {
    data: function () {
        return {
            
        }
    },

    components: {
        "xxTitle": xxTitle
    },

    created() {
        document.title = "订单查询";
    },

    methods: {

    }
}