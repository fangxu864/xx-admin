<template>
<div class="login-wrap white">
    <xx-title title="订单查询"></xx-title>
    <div class="filter-box">
        <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="table-box">
        <el-table
            v-loading="showLoading"
            element-loading-text="拼命加载中"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </div>

    <div class="pag-box">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>
</div>
</template>


<script>
import indexJS from "./index.js";
export default indexJS;
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

