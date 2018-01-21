登录：
地址：http://www.fzseafood.cn/Backend/Index/login
参数：
account=账号
password=密码

订单查询：
地址：http://www.fzseafood.cn/Backend/Index/orderList
参数：
bime=起始时间
etime=结束时间


发布产品：
地址：http://www.fzseafood.cn/Backend/Product/setProduct
参数：
id=表Id，编辑产品的时候传
name =产品名称
price=价格
description=描述
images=图片地址
type=产品类型:1=生鲜类,2=加工食品类,3=鱼干类
status=产品状态:0=下架，1=正常，2=删除

获取产品：
地址：地址：http://www.fzseafood.cn/Backend/Product/getProduct
参数：
page=页码
pageSie=数量


设置产品状态：
地址：地址：http://www.fzseafood.cn/Backend/Product/setProductStatus 
参数：
Id=产品ID
status=产品状态:0=下架，1=正常，2=删除
