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
                name: 'linxin发射点发射点发'
            }
        },
        computed:{
            username(){
                // let username = localStorage.getItem('ms_username');
                // return username ? username : this.name;

                return '管理员';
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped lang="scss">
@import './header.scss';
</style>
