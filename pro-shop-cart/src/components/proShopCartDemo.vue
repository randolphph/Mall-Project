<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div v-if="islogin">
        <van-button type="danger" @click="loginBtn">登录</van-button>
        <van-button type="danger" @click="registerBtn">注册</van-button>
    </div>

    <div v-if="!islogin">
      <van-button type="danger" @click="cancelLoginBtn">退出登录</van-button>
    </div>
    
    <div style='display:none'>
      <div class="wrapDiv">
        <input type="text" ref="inputRef"  class="leftDiv" placeholder="请输入" />
      <div class="rightDiv">
          {{get_Data}}
      </div>
      </div>
      <van-button type="danger" @click="sendData">发送数据</van-button>
      <van-button type="danger" @click="getData">获得数据</van-button>
    </div>

    <div style="height:440px;overflow-y:scroll">
      <div v-for="itemObj in goodsObj " class="wrapDiv cle goodsList">
        <h1 class="goodsTitle">{{itemObj.name}}</h1>
        <li v-for="item in itemObj.goodsList_aa" @click="switchToGoodsProduct(item)">
          <label> <img :src=item.img /> </label>
          {{item.name}} / ¥{{item.price}}
        </li>

        <li v-for="item in itemObj.goodsList_bb">
          <label> <img :src=item.img /> </label>
          {{item.name}} / ¥{{item.price}}
        </li>

        <li v-for="item in itemObj.goodsList_cc">
          <label> <img :src=item.img /> </label>
          {{item.name}} / ¥{{item.price}}
        </li>

        <li v-for="item in itemObj.goodsList_dd">
          <label> <img :src=item.img /> </label>
          {{item.name}} / ¥{{item.price}}
        </li>

      </div>
    </div>

    <footerBar></footerBar>
  
  </div>

  
</template>

<script>
import axios from "axios";
import API_LIST from '@/APILIST.config';
import entryGoods from './entryGoods';
import footerBar from './footerBar';

export default {
  name: "proShopCartDemo",
  data() {
    return {
    msg: "商城",
    send_Data: "你好",
    get_Data : '',
    islogin : true,
    //所有商品对象分类以及数据
    goodsObj : [],
    //header标签组
    tabActive : 0,
    };
  },
  components : {entryGoods,footerBar},
  created(){
    if (localStorage.userName) {
      this.$notify(localStorage.userName+'您已经登录了');
      this.islogin = false;
      this.msg = '首页 ' + localStorage.userName;
      this.getGoodsCategoryFn();
    }
  },
  methods: {
    //去往商品详情页
    switchToGoodsProduct(_goods) {
      this.$router.push({
        path : '/goodsProduct',
        query : {_goodsObjId : _goods._id,
                 _collectionName : _goods.category
                }
      })

    },
    //向中间件发送
    sendData() {
      axios.get(API_LIST.node_a, {
        params: { _xx: this.$refs.inputRef.value },
      });
    },
    //获得所有商品的品类以及商品信息
    getGoodsCategoryFn(){
      axios.get(API_LIST.getGoodsCategory)
           .then(
             (_d) => {
               this.goodsObj = _d.data;
             }
           )

    },
    
    //接收中间件信息
    getData() {
      axios.get(API_LIST.node_b)
            .then(
              (_d) => {
                console.log(_d);
                this.get_Data = _d.data[0].name; 

              }
            )
    },
    //登录
    loginBtn(){
      this.$router.push({path : '/userLogin'})

    },
    //注册
    registerBtn() {
      this.$router.push({path:'/register'});
    },
    //退出登录
    cancelLoginBtn() {
      localStorage.userName = '';
      this.$notify('您已经退出登录');
      this.islogin = true;

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
</style>
