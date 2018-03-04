import xxTitle from '../../components/xx-title/xx-title.vue';

export default {
    data: function () {
        return {
            form: {
                notice: "" //公告
            }
        }

    },
    components: {
        "xxTitle": xxTitle
    },

    created() {
        document.title = "编辑公告";
        if (localStorage.getItem("logState") !== "login") {
            this.$router.push('/login');
        }
        this.getData();
    },

    methods: {

        getData() {
            var _this = this;
            var loading = null;
            PFT.Util.Ajax("/Backend/Index/getNotice", {
                type: "POST",
                params: {
                    page: _this.page,
                    pageSize: _this.pageSize,
                    status: _this.status,
                },
                loading: function () {
                    loading = _this.$loading({
                        lock: true,
                        text: '数据获取中..',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                },
                complete: function () {
                    loading.close();
                },
                success: function (res) {
                    if (res.code == 200) {
                        _this.form.notice = res.data;
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
         * 保存公告内容
         */
        saveNotice() {
            var _this = this;
            var loading;
            PFT.Util.Ajax("/Backend/Index/notice", {
                type: "POST",
                params: {
                    notice: _this.form.notice || ""
                },
                loading: function () {
                    loading = _this.$loading({
                        lock: true,
                        text: '保存中..',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                },
                complete: function () {
                    loading.close();
                },
                success: function (res) {
                    if (res.code == 200) {
                        _this.$message({
                            showClose: true,
                            message: res.msg || "保存成功",
                            type: 'success'
                        });
                    } else {
                        _this.$message({
                            showClose: true,
                            message: res.msg || "保存失败，请重试",
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