<template>
    <div class="mini-box" :index="index">
        <div class="img-box">
            <img v-bind:src="src" alt="">
        </div>
        <div class="bottom">
             <el-button plain size="small" @click="onChange">更换</el-button>
             <el-button plain size="small" @click="onDelete">删除</el-button>
        </div>
    </div>
</template>

<script>
    import indexJS from './index.js';
    export default indexJS;
</script>

<style scoped lang="scss">
    @import "./index.scss";
</style>
