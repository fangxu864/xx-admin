import xxTitle from '../../components/xx-title/xx-title.vue';

export default {
    data: function () {
        return {
            tableData: [],
            multipleSelection: [],
            showLoading: false,

            total: 1,
            page: 1,
            pageSize: 10,
            status: 1 //出售中产品传1
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
        this.getData();
    },

    methods: {

        getData() {
            var _this = this;
            PFT.Util.Ajax("/Backend/Product/getProduct", {
                type: "POST",
                params: {
                    page: _this.page,
                    pageSize: _this.pageSize,
                    status: _this.status,
                },
                loading: function () {
                    _this.showLoading = true;
                },
                complete: function () {
                    _this.showLoading = false;
                },
                success: function (res) {
                    if (res.code == 200) {
                        _this.tableData = res.data.list;
                        _this.total = Number(res.data.cnt);
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

        /**
         * 点击分页器
         * 
         * @param {any} curPage 
         */
        onPageChange: function (curPage) {
            this.page = curPage;
            this.getData();
        },


        /**
         * 编辑
         * 
         * @param {any} id 
         */
        handleEdit(id) {
            this.$router.push('/proedit/' + id);
        },

        xiajia(id) {
            var _this = this;
            this.$confirm("是否下架该产品？", "提示", {
                callback: function (result) {
                    if (result == "confirm") {
                        PFT.Util.Ajax("/Backend/Product/setProductStatus", {
                            type: "POST",
                            params: {
                                status: 0,
                                id: id
                            },
                            loading: function () {
                                // _this.showLoading = true;
                            },
                            complete: function () {
                                // _this.showLoading = false;
                            },
                            success: function (res) {
                                if (res.code == 200) {
                                    _this.getData();
                                } else {
                                    _this.$message({
                                        showClose: true,
                                        message: res.msg || "操作成功",
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
            })

        },


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
        },



    }
}