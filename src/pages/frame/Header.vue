<template>
    <div class="header">
        <div class="logo">海鲜后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">{{username}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: "管理员"
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem('ms_username');
      return username ? username : this.name;

    //   return "管理员";
    }
  },
  methods: {
    handleCommand(command) {
      var _this = this;
      if (command == "loginout") {
        PFT.Util.Ajax("/Backend/Index/loginOut", {
          type: "POST",
          params: {},
          loading: function() {
            // _this.showLoading = true;
          },
          complete: function() {
            // _this.showLoading = false;
          },
          success: function(res) {
            if (res.code == 200) {
              localStorage.removeItem("ms_username");
              localStorage.removeItem("logState");
              _this.$router.push("/login");
            } else {
              _this.$message({
                showClose: true,
                message: res.msg || "退出登录失败",
                type: "error"
              });
            }
          },
          tiemout: function() {
            _this.$message({
              showClose: true,
              message: PFT.AJAX_TIMEOUT_TEXT,
              type: "error"
            });
          },
          serverError: function() {
            _this.$message({
              showClose: true,
              message: PFT.AJAX_ERROR_TEXT,
              type: "error"
            });
          }
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "./header.scss";
</style>
