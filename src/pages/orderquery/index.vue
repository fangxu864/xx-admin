<template>
    <div class="login-wrap white">
        <xx-title title="订单查询"></xx-title>
        <div class="filter-box">
            <span>开始时间：</span>
            <el-date-picker v-model="btime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
            <span>结束时间：</span>
            <el-date-picker v-model="etime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
            <el-button type="primary" @click="search">查询</el-button>
        </div>
        <div class="table-box">
            <el-table v-loading="showLoading" element-loading-text="拼命加载中" :data="tableData" style="width: 100%">
                <!-- <el-table-column prop="id" label="ID" width="180">
                </el-table-column> -->
                <el-table-column prop="order" label="订单号" width="180">
                </el-table-column>
                <el-table-column prop="time" label="时间">
                </el-table-column>
                <el-table-column prop="describe" label="描述">
                </el-table-column>
                <el-table-column prop="num" label="数量">
                </el-table-column>
                <el-table-column prop="status" label="订单状态">
                </el-table-column>
                <el-table-column prop="name" label="收货人姓名" width="180">
                </el-table-column>
                <el-table-column prop="mobile" label="手机">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="uid" label="会员ID">
                </el-table-column>
            </el-table>
        </div>
        <div class="pag-box">
            <el-pagination background layout="prev, pager, next" :total="1000">
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

