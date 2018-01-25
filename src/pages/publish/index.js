import xxTitle from '../../components/xx-title/xx-title.vue';
var Crop = require('../../components/upload-crop/index.js');
import miniImg from '../../components/mini-img/index.vue';

export default {
    data: function () {
        return {
            imgSrcArr: [
                "http://images.pft12301.cc/pftcropimages/1516550601875633612.png",
                "http://images.pft12301.cc/pftcropimages/1516550608853903389.png",
                "http://images.pft12301.cc/pftcropimages/1516550632951853452.png"
            ],
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [{
                        required: true,
                        message: '请输入商品名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                price: [{
                        required: true,
                        message: '请输入价格',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: '价格必须为数字值'
                    }
                ],
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
        document.title = "订单查询";
        if (localStorage.getItem("logState") !== "login") {
            this.$router.push('/login');
        }
    },

    methods: {

        crop() {
            console.log(1212);
            Crop.show({
                cropBoxWidth: 600, //裁剪区域的高度      非必须，默认600
                cropBoxHeight: 500, // 裁剪区域的宽度    非必须，默认400 
                outImgWidth: 200, //生成图片的宽度（px）  非必须，默认0  此时裁剪比例可随意调节
                outImgHeight: 100, //生成图片的高度（px） 非必须，默认0
                pathAndFileName: "", //上传到七牛的key(路径和文件名); 非必须，默认传到"pftcropimages/" 文件名随机
                success: function (imgAddressArr) { //裁剪上传成功返回的图片地址数组  
                    console.log(imgAddressArr)
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
                outImgWidth: 200, //生成图片的宽度（px）  非必须，默认0  此时裁剪比例可随意调节
                outImgHeight: 100, //生成图片的高度（px） 非必须，默认0
                pathAndFileName: "", //上传到七牛的key(路径和文件名); 非必须，默认传到"pftcropimages/" 文件名随机
                success: function (imgAddressArr) { //裁剪上传成功返回的图片地址数组  
                    console.log(imgAddressArr)
                    _this.imgSrcArr.splice(index, 1, imgAddressArr[0]);
                },
                fail: function (data) { //裁剪上传失败返回的信息
                    console.log({
                        code: 201,
                        msg: "用户取消了操作"
                    })
                }
            });

            // this.imgSrcArr.splice(index, 1);
        }

    }
}