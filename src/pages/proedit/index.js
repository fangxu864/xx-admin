import xxTitle from '../../components/xx-title/xx-title.vue';
var Crop = require('../../components/upload-crop/index.js');
import miniImg from '../../components/mini-img/index.vue';

export default {

    editProId: "",

    data: function () {
        return {
            navTitle: "产品编辑",
            imgSrcArr: [],
            btnText: "确认保存",
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                price: "", //价格
                sec_price: "", //最高价格
                price_type: "" //价格单位
            },
            rules: {
                name: [{
                        required: true,
                        message: '请输入商品名称',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在 1 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                price: [{
                        required: true,
                        message: '请输入最低价格',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '价格必须为数字值'
                    }
                ],
                sec_price: [{
                        required: true,
                        message: '请输入最高价格',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '价格必须为数字值'
                    }
                ],
                price_type: [{
                    required: true,
                    message: '请输入价格单位',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '请选择产品类型',
                    trigger: 'change'
                }],
                description: [{
                        required: true,
                        message: '请输入产品描述',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 100,
                        message: '长度在 5 到 100 个字符',
                        trigger: 'blur'
                    }
                ]
            }

        }
    },

    components: {
        "xxTitle": xxTitle,
        "miniImg": miniImg
    },

    created() {
        document.title = "产品编辑";

        console.log(this.$route.params)

        //产品编辑
        if (this.$route.params.id != undefined) {
            this.editProId = this.$route.params.id;
            this.getProInfoWhenEdit();
        };

        if (localStorage.getItem("logState") !== "login") {
            this.$router.push('/login');
        }
    },

    methods: {



        crop() {
            var _this = this;
            console.log(1212);
            Crop.show({
                cropBoxWidth: 600, //裁剪区域的高度      非必须，默认600
                cropBoxHeight: 500, // 裁剪区域的宽度    非必须，默认400 
                outImgWidth: 400, //生成图片的宽度（px）  非必须，默认0  此时裁剪比例可随意调节
                outImgHeight: 400, //生成图片的高度（px） 非必须，默认0
                pathAndFileName: "", //上传到七牛的key(路径和文件名); 非必须，默认传到"pftcropimages/" 文件名随机
                success: function (imgAddressArr) { //裁剪上传成功返回的图片地址数组  
                    _this.imgSrcArr.push(imgAddressArr[0]);
                },
                fail: function (data) { //裁剪上传失败返回的信息
                    console.log({
                        code: 201,
                        msg: "用户取消了操作"
                    })
                }
            });
        },


        deleteImg(index) {
            this.imgSrcArr.splice(index, 1);
        },
        changeImg(index) {
            var _this = this;
            Crop.show({
                cropBoxWidth: 600, //裁剪区域的高度      非必须，默认600
                cropBoxHeight: 500, // 裁剪区域的宽度    非必须，默认400 
                outImgWidth: 400, //生成图片的宽度（px）  非必须，默认0  此时裁剪比例可随意调节
                outImgHeight: 400, //生成图片的高度（px） 非必须，默认0
                pathAndFileName: "", //上传到七牛的key(路径和文件名); 非必须，默认传到"pftcropimages/" 文件名随机
                success: function (imgAddressArr) { //裁剪上传成功返回的图片地址数组  
                    _this.imgSrcArr.splice(index, 1, imgAddressArr[0]);
                },
                fail: function (data) { //裁剪上传失败返回的信息
                    console.log({
                        code: 201,
                        msg: "用户取消了操作"
                    })
                }
            });
        },

        publish() {
            var _this = this;
            this.$refs["publisForm"].validate((valid) => {

                if (_this.imgSrcArr.length < 1) {
                    _this.$message({
                        showClose: true,
                        message: "请至少上传一张图片",
                        type: 'warning'
                    });
                    return false;
                }

                var params = {
                    name: _this.form.name,
                    price: _this.form.price,
                    sec_price: _this.form.sec_price,
                    price_type: _this.form.price_type,
                    description: _this.form.description,
                    images: _this.imgSrcArr[0],
                    type: _this.form.type
                }

                if (_this.editProId) {
                    params["id"] = _this.editProId;
                }

                PFT.Util.Ajax("/Backend/Product/setProduct", {
                    type: "POST",
                    params: params,
                    loading: function () {
                        _this.showLoading = true;
                    },
                    complete: function () {
                        _this.showLoading = false;
                    },
                    success: function (res) {
                        if (res.code == 200) {
                            _this.$message({
                                showClose: true,
                                message: res.msg || "编辑成功",
                                type: 'success'
                            });

                            if (_this.editProId) {
                                _this.$router.push('/salepro');
                            }

                            //重置
                            _this.$refs["publisForm"].resetFields();
                            _this.imgSrcArr = [];
                        } else {
                            _this.$message({
                                showClose: true,
                                message: res.msg || "登录失败",
                                type: 'error'
                            });
                        }
                    },
                    tiemout: function () {
                        _this.$message({
                            showClose: true,
                            message: PFT.AJAX_TIMEOUT_TEXT,
                            type: 'error'
                        });
                    },
                    serverError: function () {
                        _this.$message({
                            showClose: true,
                            message: PFT.AJAX_ERROR_TEXT,
                            type: 'error'
                        });
                    }
                });


            })

        },


        /**
         * 如果是编辑产品的时候要获取信息
         * 
         */
        getProInfoWhenEdit() {
            var _this = this;
            PFT.Util.Ajax("/Backend/Product/getProduct", {
                type: "POST",
                params: {
                    id: _this.editProId
                },
                loading: function () {
                    // _this.showLoading = true;
                },
                complete: function () {
                    // _this.showLoading = false;
                },
                success: function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        res.data.list[0].price = Number(res.data.list[0].price);
                        _this.form = res.data.list[0];
                        _this.imgSrcArr = [res.data.list[0]["images"]]
                    } else {
                        _this.$message({
                            showClose: true,
                            message: res.msg || "查询出错了",
                            type: 'error'
                        });
                    }
                },
                tiemout: function () {
                    _this.$message({
                        showClose: true,
                        message: PFT.AJAX_TIMEOUT_TEXT,
                        type: 'error'
                    });
                },
                serverError: function () {

                    _this.$message({
                        showClose: true,
                        message: PFT.AJAX_ERROR_TEXT,
                        type: 'error'
                    });
                }
            });
        }

    }
}