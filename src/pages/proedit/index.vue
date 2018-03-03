<template>
    <div class="login-wrap white">
        <xx-title :title="navTitle"></xx-title>
        <div class="publish-box">

            <el-form ref="publisForm" :rules="rules" :model="form" label-width="100px">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="最低价格" prop="price">
                    <el-input v-model.number="form.price"></el-input>
                </el-form-item>
                <el-form-item label="最高价格" prop="sec_price">
                    <el-input v-model.number="form.sec_price"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="price_type">
                    <el-input v-model="form.price_type" placeholder="如：kg/斤/份/条/袋"></el-input>
                </el-form-item>
                <el-form-item label="产品类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择产品类型">
                        <el-option label="生鲜类" value="1"></el-option>
                        <el-option label="加工食品类" value="2"></el-option>
                        <el-option label="鱼干类" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
                </el-form-item>
                <el-form-item label="商品图">
                    <div class="mini-img-wrap">

                        <el-button v-if="imgSrcArr.length < 1" type="primary" v-on:click="crop" plain size="medium">添加</el-button>
                        <span class="img-tips">一张图片，建议小于1M</span>
                    </div>

                    <div class="mini-img-wrap">
                        <mini-img v-for=" (item,index) in imgSrcArr" :key="item" :src="item" :index="index" @deleteImg="deleteImg" @changeImg="changeImg">
                        </mini-img>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="publish">{{btnText}}</el-button>
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

