<template>
  <div class="hello">
    <van-nav-bar
        :title=msg
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="goodsImgWrap ">
        <img :src=goodsImg>
    </div>
    <h1>{{goodsName}} {{goodsDescribe}} ¥{{goodsPrice}}</h1>

    <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        :quota-used=0
        :hide-stock="sku.hide_stock"
        :message-config={}
        @add-cart='addToCartFn'
    />

    <!--底栏-->
    <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot @click="onHelpFn" />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge=cartGoods_mini_num @click="switchToCartFn" />
        <van-goods-action-button type="warning" text="加入购物车" @click="openBuyPage" />
        <van-goods-action-button type="danger" text="立即购买" @click="openBuyPage" />
    </van-goods-action>
  
  </div>

  
</template>

<script>
import axios from "axios";
import API_LIST from '@/APILIST.config';

export default {
  name: "goodsProduct",
  data() {
    return {
    msg: "详情页面",
    goodsName : '',
    goodsImg : '',
    goodsDescribe : '',
    goodsPrice : '',
    cartGoods_mini_num : 0,
    show : false,
    goods : {},
    goodsId : 0,
    sku:{
				  tree: [
				    {
				      k: '颜色', // skuKeyName：规格类目名称
				      v: [
				        {
				          id: '30349', // skuValueId：规格值 id
				          name: '红色', // skuValueName：规格值名称
				          imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
				        },
				        {
				          id: '1215',
				          name: '蓝色',
				          imgUrl: 'https://img.yzcdn.cn/2.jpg'
				        }
				      ],
				      k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
				    }
				  ],
				  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
				  list: [
				    {
				      id: 2259, // skuId，下单时后端需要
				      price: 100, // 价格（单位分）
				      s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
				      s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
				      s3: '0', // 最多包含3个规格值，为0表示不存在该规格
				      stock_num: 110 // 当前 sku 组合对应的库存
				    }
				  ],
				  price: '', // 默认价格（单位元）
				  stock_num: 227, // 商品总库存
				  hide_stock: false // 是否隐藏剩余库存
		}

    };
  },
  components : {},
  created(){
    if (localStorage.userName) {
      this.$notify(localStorage.userName+'您已经登录了');
      this.islogin = false;
      this.msg = '详情页 ' + localStorage.userName;

      //获取首页传过来的商品id
      let goodsId = this.$route.query._goodsObjId;
      let collectionName = this.$route.query._collectionName;
      this.getGoodsInfoByIdFn(goodsId,collectionName);
    }

      //计算购物车中商品的数量
      this.countGoodsNum()
  },
  methods: {
      //返回首页按钮
      onClickLeft(){
          this.$router.go(-1);
      },

      //去到购物车页面
      switchToCartFn(){
          this.$router.push({
              path : '/cart'
          })

      },
      //客服按钮
      onHelpFn(){
         this.$dialog.alert({
            message : ' 客服忙'
          })
      },

      //打开购买详情页
      openBuyPage() {
          this.show = true;
      },
      //购买完成提交到购物车
      addToCartFn(_d) {
          //是否有相同的商品
          let isTrue = false;
          let _temObj = {
              _id : _d.goodsId,
              _price : this.goodsPrice,
              _num : _d.selectedNum,
              _goodsName : this.goodsName,
              _goodsImg : this.goodsImg
          }

          let _cartData = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
          for (let i = 0 ; i < _cartData.length; i++) {
              if (_cartData[i]._id === _temObj._id) {
                  _cartData[i]._num += _temObj._num;
                  isTrue = true;
                  break;
              }
          }

          if (isTrue === false) {
              _cartData.push(_temObj);
          }
          localStorage.cartInfo = JSON.stringify(_cartData);

          this.$dialog.alert({
            message : '加入购物车成功'
          }).then(()=>{
            this.show = false;
          })

           //计算购物车中商品的数量
          this.countGoodsNum()
      },

      //计算购物车中商品的数量
      countGoodsNum(){
         let temp = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
         let _n = 0;
         for (let i = 0 ; i < temp.length ; i++) {
           _n += temp[i]._num;
         }
         this.cartGoods_mini_num = _n;
        
      },

      //用商品id查询数据库得到商品信息
      getGoodsInfoByIdFn(id,name){
          axios.get(API_LIST.getGoodsInfoById,{
              params : {
                  id : id,
                  collectionName : name
              }
          })
                .then(
                    (_d) => {
                        this.goodsName = _d.data.name;
                        this.goodsPrice = _d.data.price;
                        this.goodsImg = _d.data.img;
                        this.goodsDescribe = _d.data.describe;
                        //给到购买组件的信息
                        this.goods.picture= _d.data.img; 
                        this.sku.price = _d.data.price;
                        this.goodsId = _d.data._id;

                    }
                )
      }
   


  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 h1, h2 {
        font-weight: normal;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        display: inline-block;
        margin: 0 10px;
      }
      a {
        color: #42b983;
      }
      .cle:after{
        content: '.';
        overflow: hidden;
        visibility: hidden;
        height: 0;
        display: block;
        clear: both;
      }
      .wrapDiv{
        width: 80%;overflow: hidden;border: 1px solid #666;
        background: #eee;border-radius: 10px;
        margin:10px auto;
      }
      .wrapDiv p.tip{
        font-size: 22px;text-align: center;padding: 0;margin:5px 0;color: #666;
      }
      .leftDiv{
        float: left;width: 60%;margin:10px;
        border-radius: 10px;border:1px solid #999;
        padding:10px;line-height: 30px;text-align: center;
        font-size: 22px;
      }
      .rightDiv{
        float: right;width: 20%;margin:10px;
        border-radius: 10px;border:1px solid #999;
        padding:10px;line-height: 30px;text-align: center;
        font-size: 22px;
      }
      .sliderDiv{
        width: 80%;margin:10px auto;
      }
      .sliderDiv img{width:100%;height:188px;}

       .goodsEntry{
        width: 80%; position: absolute;top: 10%;left: 50%;margin-left: -42%;
	    z-index: 112;padding:10px;background:#ddd;
        border-radius: 10px;border:1px solid #999;
        line-height: 30px;text-align: center;
        font-size: 16px;
      }
      .entryGoodsDivBg{
	            width: 100%;height: 100%;background: #000;opacity: 0.3;
	            z-index: 111;position: absolute;top: 0;left: 0;
	      }

      .goodsCategory{clear: both;margin: 10px 0;}
      .goodsCategory li{float: left; }
      .goodsCategory li img{
            width: 50px;height: 50px;border-radius: 10px;
            border:1px solid #666;
          }
      .goodsList{}
      .goodsList li{
          float: left;width: 49%;
          overflow: hidden;margin:0 0 10px 0;
        }
      .goodsList li label{
            width: 100px;height: 115px;display: block;overflow: hidden;
            margin:0 auto;padding:0;text-align: center;position: relative;
            border:1px solid #666;
      }
      .goodsList li img{
        height: 100%;
        position: absolute;top: -5px;left: 0;
        clear: both;display: block;margin:5px auto;padding:0;
      }
      .goodsList h1.goodsTitle{
           clear: both;margin:5px auto;font-size: 22px;border-radius: 5px;
           background: #5d5d5d;width: 50%;color: #fff;padding:3px 0;
      }
      .goodsImgWrap{
		width: 100%;height: 350px;overflow: hidden;margin:0 auto;
	    }
	.goodsImgWrap img{ width: 100%;height: 350px; }
</style>
