<template>
  <div class="hello">
    <van-nav-bar
        :title=msg
        left-text="返回"
        right-text="清空购物车"
        left-arrow
        @click-left="onClickLeft"
        @click-right="cartEmptyFn"
    />
    
    <div class="goodsDiv" v-for="item in cartArr">
			<label> <img :src=item._goodsImg /> </label>
			<h2> {{item._goodsName}} ， 数量 {{item._num}}，单价{{item._price}}  </h2>
			<!-- async-change=true必须是异步，否则将计算点击之前的值 -->
			<van-stepper v-model="item['_num']" 
				:async-change=true
				@plus="addBtnFn"
                @minus="minusBtnFn"
				/>
	</div>

    <van-submit-bar :price=allGoodsPrice*100 :button-text=submitInfo @submit="onSubmit" />
  
  </div>

  
</template>

<script>
import axios from "axios";
import API_LIST from '@/APILIST.config';
import {Toast} from 'vant';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "cart",
  data() {
    return {
    msg: "购物车",
    cartArr : [],
    allGoodsNum : 0,
    allGoodsPrice : 0,
    submitInfo : ''
    };
  },
  components : {},
  created(){
    if (localStorage.userInfo) {
      this.islogin = false;
      this.msg = '购物车 ';
      this.cartArr = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
      //计算商品总数
      this.countAllGoodsNum();
      this.countAllGoodsPrice();
      //将cartArr 传入vuex
      this.addToVuex(this.cartArr);

    }

  },
   computed : {
     //从cart.js中映射来的数据
     ...mapGetters(['shopCartList'])

    },
  methods: {
      //映射事件
      ...mapActions(['addToVuex']),
      //返回首页按钮
      onClickLeft(){
          localStorage.setItem('inxState', 0);
          this.$router.push({
              path : '/'
          });
      },
      //增加商品数量
      addBtnFn() {
          this.countAllGoodsNum();
          this.countAllGoodsPrice();

      },
      minusBtnFn() {
          this.countAllGoodsNum();
          this.countAllGoodsPrice();

      },

      //清空购物车
      cartEmptyFn(){
          localStorage.removeItem('cartInfo');
          this.cartArr = [];
          this.countAllGoodsNum();
          this.countAllGoodsPrice();

      },
      //计算商品总数
      countAllGoodsNum() {
          this.allGoodsNum = 0;
          for (let i = 0 ; i < this.cartArr.length ; i++) {
              this.allGoodsNum += this.cartArr[i]._num;
          }
          this.submitInfo = '去结账('+this.allGoodsNum + ')';

      },
      countAllGoodsPrice(){
          this.allGoodsPrice = 0;
          for (let i = 0 ; i < this.cartArr.length ; i++) {
              this.allGoodsPrice += this.cartArr[i]._num * this.cartArr[i]._price;
          }


      },
      onSubmit(){
          this.$dialog.alert({
            message : '商品总数为'+this.allGoodsNum+'，总计'+this.allGoodsPrice+'元'
          }).then(()=>{
              Toast('支付成功')
          })
      }


  }
}
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
    	.goodsDiv{
		width: 95%;margin:5px auto;clear: both;
	}
	.goodsDiv label{
		float: left;width: 100px;height: 100px;
		overflow: hidden;border:1px solid #ddd;border-radius: 10px;
	}
	.goodsDiv label img{
		width: 100px;height: 100px;
	}
	.goodsDiv h2{font-size: 22px;}
</style>