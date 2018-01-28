<template>
  <div class="login-wrap white">
    <xx-title title="出售中产品"></xx-title>

    <div class="content-box">
      <el-table v-loading="showLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="商品名称">
        </el-table-column>
        <el-table-column prop="images" label="商品图">
          <template slot-scope="scope">
            <img class="row-img" :src="scope.row.images" alt="商品图">
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格(每kg)">
        </el-table-column>
        <el-table-column prop="type" label="产品类型">
        </el-table-column>
        <el-table-column prop="description" label="描述" width="200px">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" @click="xiajia(scope.row.id)">下架</el-button>
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

