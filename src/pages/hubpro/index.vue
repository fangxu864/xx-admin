<template>
  <div class="login-wrap white">
    <xx-title title="仓库中产品"></xx-title>

    <div class="content-box">
      <el-table v-loading="showLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="商品名称">
        </el-table-column>
        <el-table-column prop="images" label="商品图">
          <template slot-scope="scope">
            <img class="row-img" :src="scope.row.images" alt="商品图">
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <span>{{scope.row.price}}/{{scope.row.price_type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="产品类型">
        </el-table-column>
        <el-table-column prop="description" label="描述" width="200px">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="width:200px;">{{scope.row.description}}</p>
              <div slot="reference" class="name-wrapper">
                <div class="ellipsis--l3">{{scope.row.description}}</div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" @click="shangjia(scope.row.id)">上架</el-button>
            <el-button size="mini" @click="deletePro(scope.row.id)">删除</el-button>
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

