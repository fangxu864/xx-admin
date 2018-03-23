<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <!-- <transition name="el-fade-in" mode="out-in"> -->
                
            <div class="g-content">
                <router-view></router-view>
            </div>
               
            <!-- </transition> -->
            <div class="g-footer">
                <p>fzseafood.cn All Rights Reserved. 闽ICP备 18005562号</p>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vHead, vSidebar
        }
    }
</script>
<style lang="scss" scoped>
    @import "./home.scss";
</style>
