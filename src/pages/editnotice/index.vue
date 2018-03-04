<template>
  <div class="login-wrap white">
    <xx-title title="编辑公告"></xx-title>

    <div class="content-box">
      <el-form ref="editnoticeForm" :model="form" label-width="100px">
        <el-form-item label="公告内容">
          <el-input type="textarea" v-model="form.notice" :autosize="{ minRows: 3, maxRows: 10}"></el-input>
          <div class="tips">内容为空表示关闭公告</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveNotice">保存</el-button>
        </el-form-item>
      </el-form>
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

