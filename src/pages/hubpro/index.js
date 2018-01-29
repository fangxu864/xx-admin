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
            status: 0
        }

    },

    components: {
        "xxTitle": xxTitle
    },

    created() {
        document.title = "仓库中产品";
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

                        var config = {
                            1: "生鲜类",
                            2: "加工食品类",
                            3: "鱼干类",
                        }

                        $.each(res.data.list, function (index, item) {
                            item.type = config[res.data.list[index].type];
                        })

                        _this.tableData = res.data.list;
                        _this.total = Number(res.data.cnt);
                    } else {
                        _this.tableData = [];
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


        shangjia(id) {
            var _this = this;
            this.$confirm("是否上架该产品？", "提示", {
                callback: function (result) {
                    if (result == "confirm") {
                        PFT.Util.Ajax("/Backend/Product/setProductStatus", {
                            type: "POST",
                            params: {
                                status: 1,
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

        deletePro(id) {
            var _this = this;
            this.$confirm("删除后不可恢复，是否删除该产品？", "提示", {
                callback: function (result) {
                    if (result == "confirm") {
                        PFT.Util.Ajax("/Backend/Product/setProductStatus", {
                            type: "POST",
                            params: {
                                status: 2,
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