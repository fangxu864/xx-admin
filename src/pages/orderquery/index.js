import xxTitle from '../../components/xx-title/xx-title.vue';

export default {
    data: function () {
        return {
            showLoading: false,
            date: "",
            btime: "",
            etime:"",
            tableData: []

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
    },

    methods: {

        search() {
            var _this = this;
            PFT.Util.Ajax("/Backend/Index/orderList", {
                type: "POST",
                params: {
                    btime: _this.btime,
                    etime: _this.etime,
                },
                loading: function () {
                    _this.showLoading = true;
                },
                complete: function () {
                    _this.showLoading = false;
                },
                success: function (res) {
                    if (res.code == 200) {

                        // 0=待确认、1=已确认、2=已发货，3=已取消
                        var config = {
                            "0": "待确认",
                            "1": "已确认",
                            "2": "已发货",
                            "3": "已取消"
                        }

                        $.each(res.data, function (index, item) {
                            item.time = new Date(Number(item.time + "000")).format("yyyy-MM-dd hh:mm:ss");
                            item.status = config[item.status];
                        })
                        _this.tableData = res.data;
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
        }

    }
}