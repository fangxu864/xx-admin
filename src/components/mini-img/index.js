export default {
    props: {
        src: {
            type: String,
            default: "标题"
        },
        index: {
            type: Number,
            default: 0
        }
    },

    methods: {
        onChange(e) {
            this.$emit("changeImg", this.index)
        },
        onDelete(e) {
            this.$emit("deleteImg", this.index)
        }

    }
}