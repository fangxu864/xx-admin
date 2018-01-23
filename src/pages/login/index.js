export default {
    data: function(){
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            showLoading: false
        }
    },

    created() {
      
        document.title = "登陆页";
        if (localStorage.getItem("isLogin")) {
            history.go(-1);
        }
        
    },

    methods: {
        submitForm(formName) {
            const _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {

                    PFT.Util.Ajax("/Backend/Index/login", {
                        type: "POST",
                        params: {},
                        loading: function () {
                            _this.showLoading = true;
                        },
                        complete: function () {
                            _this.showLoading = false;
                        },
                        success: function (res) {
                            if (res.code == 200) {
                                localStorage.setItem('ms_username',_this.ruleForm.username);
                                localStorage.setItem('isLogin',true);
                                _this.$router.push('/orderquery');
                            } else {
                                _this.$message({
                                    showClose: true,
                                    message: res.msg || "登录失败",
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

                    
                   
                } else {
                    _this.$message({
                        showClose: true,
                        message: '请输入正确的用户名密码',
                        type: 'error'
                    });
                    return false;
                }
            });

            
        }
    }
}