<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <!-- <transition name="el-fade-in" mode="out-in"> -->
                <router-view></router-view>
            <!-- </transition> -->
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
