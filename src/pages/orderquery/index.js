import xxTitle from '../../components/xx-title/xx-title.vue';

export default {
    data: function () {
        return {
            showLoading: false,
            date: "",
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            },{
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            },{
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]

        }
    },

    components: {
        "xxTitle": xxTitle
    },


    created() {
        document.title = "订单查询";
    },

    methods: {

        search() {
            console.log(this.date)
            var _this = this;
            if (!this.date) {
                _this.$message({
                    showClose: true,
                    message: "请选择日期时间",
                    type: 'warning'
                });
            } else {
                PFT.Util.Ajax("/Backend/Index/orderList", {
                    type: "POST",
                    params: {
                        btime: _this.date[0],
                        etime: _this.date[1],
                    },
                    loading: function () {
                        _this.showLoading = true;
                    },
                    complete: function () {
                        _this.showLoading = false;
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
            }
        }

    }
}