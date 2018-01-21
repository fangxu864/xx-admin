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
            }
        }
    },

    created() {
      
        document.title = "登陆页";
        
    },

    methods: {
        submitForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    localStorage.setItem('ms_username',self.ruleForm.username);
                    self.$router.push('/orderquery');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}