<template>
  <div class="hello">
    <!--搜索框-->
    <van-search
    v-model="searchValue"
    show-action
    label="商品"
    placeholder="请输入搜索关键词"
    @search="onSearch"
    >
      <template #action>
          <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <!--轮播图-->
    <van-swipe :autoplay="1000" class="sliderDiv">
      <van-swipe-item v-for="(image, index) in sliderImages" :key="index">
      <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <van-tabs  sticky v-for="(itemObj,index) in goodsObj " class="wrapDiv cle goodsList" :key="index">
      <van-tab :key="index" :title=itemObj.name>
          <li v-for="(item,index) in itemObj.goodsList_aa" @click="switchToGoodsProduct(item)" :key="index">
            <label> <img :src=item.img /> </label>
            {{item.name}} / ¥{{item.price}}
          </li>

          <li v-for="(item,index) in itemObj.goodsList_bb" :key="index" @click="switchToGoodsProduct(item)">
            <label> <img :src=item.img /> </label>
            {{item.name}} / ¥{{item.price}}
          </li>

          <li v-for="(item,index) in itemObj.goodsList_cc" :key="index" @click="switchToGoodsProduct(item)">
            <label> <img :src=item.img /> </label>
            {{item.name}} / ¥{{item.price}}
          </li>

          <li v-for="(item,index) in itemObj.goodsList_dd" :key="index" @click="switchToGoodsProduct(item)">
            <label> <img :src=item.img /> </label>
            {{item.name}} / ¥{{item.price}}
          </li>
      
      </van-tab>
    </van-tabs>

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
    send_Data: "你好",
    get_Data : '',
    //所有商品对象分类以及数据
    goodsObj : [],
    //header标签组
    tabActive : 0,
    //用户信息对象
    userInfo : {},
    searchValue : '',
    //轮播图
    sliderImages : []
    };
  },
  components : {entryGoods,footerBar},
  created(){
    axios.get(API_LIST.getImgUrls)
          .then((_d)=>{
            this.sliderImages = _d.data.urls;
          })
    if (localStorage.userInfo) {
      this.userInfo = JSON.parse(localStorage.userInfo);
      this.$notify(this.userInfo.username+'您已经登录了');
      this.islogin = false;
    }
    this.getGoodsCategoryFn();
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
    //搜索框
    onSearch(){
      let _v = this.searchValue;
      if (_v === '' || _v === undefined) {
        this.$notify('查询结果不能为空');
      } else {
        this.$notify('查不到')
        //axios.get(API_LIST.node_a,{
        //   params : {_xx : _v}
        // }).then(()=>{
        //   this.$notify('查不到')
        // })
      }

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
      .sliderDiv{
        width: 90%;margin:10px auto;
        }
      .sliderDiv img{width:100%;height:188px;}
</style>
