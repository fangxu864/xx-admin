import xxTitle from '../../components/xx-title/xx-title.vue';

export default {
    data: function () {
        return {
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            multipleSelection: []
        }

    },

    components: {
        "xxTitle": xxTitle
    },

    created() {
        document.title = "订单查询";
        if (localStorage.getItem("logState") !== "login") {
            this.$router.push('/login');
        }

        var _this = this;
        PFT.Util.Ajax("/Backend/Product/getProduct", {
            type: "POST",
            params: {},
            loading: function () {
                // _this.showLoading = true;
            },
            complete: function () {
                // _this.showLoading = false;
            },
            success: function (res) {
                if (res.code == 200) {

                } else {
                    _this.$message({
                        showClose: true,
                        message: res.msg || "查询出错了",
                        type: 'error'
                    });
                }
            },
            tiemout: function () {
                _this.$message({
                    showClose: true,
                    message: PFT.AJAX_TIMEOUT_TEXT,
                    type: 'error'
                });
            },
            serverError: function () {
                
                _this.$message({
                    showClose: true,
                    message: PFT.AJAX_ERROR_TEXT,
                    type: 'error'
                });
            }
        });


    },

    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}