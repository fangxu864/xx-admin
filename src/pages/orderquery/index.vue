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
            <el-button type="primary" @click="outExcel" plain>导出Excel</el-button>
        </div>
        <div class="table-box">
            <el-table v-loading="showLoading" element-loading-text="拼命加载中" :data="tableData" style="width: 100%">
                <!-- <el-table-column prop="id" label="ID" width="180">
                </el-table-column> -->
                <el-table-column prop="order" label="订单号" width="130">
                </el-table-column>
                <el-table-column prop="time" label="时间" width="180">
                </el-table-column>
                <el-table-column prop="num" label="订单信息(物品/数量)">
                    <template slot-scope="scope">
                        <div class="line" v-for="good in scope.row.goods">
                            <p>{{good.name}}
                                <span class="c-warn">{{good.num}}{{good.price_type}}</span>
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="订单状态" width="100">
                </el-table-column>
                <el-table-column prop="money" label="总价钱(元)" width="100">
                </el-table-column>

                <el-table-column label="收货信息">
                    <template slot-scope="scope">
                        <p>收货人：{{scope.row.name}}</p>
                        <p>手机：{{scope.row.mobile}}</p>
                        <p>地址：{{scope.row.address}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="uid" label="会员ID" width="70">
                </el-table-column>
                <el-table-column prop="describe" label="备注" width="160">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p style="width:200px;">{{scope.row.describe}}</p>
                            <div slot="reference" class="name-wrapper">
                                <div class="ellipsis--l3">{{scope.row.describe}}</div>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-dropdown trigger="click" @command="changeStatus">
                            <span class="el-dropdown-link">
                                修改状态
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-bind:command="'0_' + scope.row.order">待确认</el-dropdown-item>
                                <el-dropdown-item v-bind:command="'1_' + scope.row.order">已确认</el-dropdown-item>
                                <el-dropdown-item v-bind:command="'2_' + scope.row.order">已发货</el-dropdown-item>
                                <el-dropdown-item v-bind:command="'3_' + scope.row.order">已取消</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>

                </el-table-column>
            </el-table>
        </div>
        <div class="pag-box" v-if="total > 1">
            <el-pagination background layout="prev, pager, next" @current-change="onPageChange" :total="total" :page-size="pageSize" :current-page="page">
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

