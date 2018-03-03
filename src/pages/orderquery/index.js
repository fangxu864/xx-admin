import xxTitle from '../../components/xx-title/xx-title.vue';

export default {
    data: function () {
        return {
            showLoading: false,
            date: "",
            btime: "",
            etime: "",
            tableData: [],
            pageSize: 10,
            page: 1, //当前页数
            total: 1 //总页数
        }
    },

    components: {
        "xxTitle": xxTitle
    },


    created() {
        document.title = "订单查询";
        let nowDate = new Date().format("yyyy-MM-dd");
        this.btime = nowDate;
        this.etime = nowDate;
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
                    page: _this.page,
                    pageSize: _this.pageSize
                },
                loading: function () {
                    _this.showLoading = true;
                },
                complete: function () {
                    _this.showLoading = false;
                },
                success: function (res) {
                    if (res && res.code == 200) {
                        // 0=待确认、1=已确认、2=已发货，3=已取消
                        var config = {
                            "0": "待确认",
                            "1": "已确认",
                            "2": "已发货",
                            "3": "已取消"
                        }
                        $.each(res.data.list, function (index, item) {
                            item.time = new Date(Number(item.time + "000")).format("yyyy-MM-dd hh:mm:ss");
                            item.status = config[item.status];
                        })
                        _this.tableData = res.data.list;
                        _this.total = Number(res.data.cnt);
                    } else {
                        _this.$message({
                            showClose: true,
                            message: res && res.msg ? res.msg : "查询出错了",
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

        onPageChange: function (curPage) {
            this.page = curPage;
            this.search();
        },

        //导出excel
        outExcel: function () {
            var _this = this;
            var param = {
                btime: _this.btime,
                etime: _this.etime,
                page: _this.page,
                pageSize: _this.pageSize
            }
            let url = "/Backend/Index/orderList?excel=1&" + $.param(param);
            this.Excel(url);
        },

        Excel: function (downloadUrl) {
            var iframeName = "iframe" + new Date().getTime();
            $("body").append(' <iframe style="display: none" name="' + iframeName + '"></iframe>');
            window.open(downloadUrl, iframeName);
        },

        /**
         * 修改订单状态
         * 
         * @param {String} status  0=待确认,1=已确认,2=已发货,3=已取消
         */
        changeStatus(status) {
            var _this = this;

            var stautsArr = status.split("_");

            PFT.Util.Ajax("/Backend/Index/setOrder", {
                type: "POST",
                params: {
                    order: stautsArr[1],
                    status: stautsArr[0]
                },
                loading: function () {
                    // _this.showLoading = true;
                },
                complete: function () {
                    // _this.showLoading = false;
                },
                success: function (res) {
                    if (res && res.code == 200) {
                        _this.$message({
                            showClose: true,
                            message: "更改状态成功！",
                            type: 'success'
                        });
                        _this.search();
                    } else {
                        _this.$message({
                            showClose: true,
                            message: res.msg || "更改状态失败，请重试",
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