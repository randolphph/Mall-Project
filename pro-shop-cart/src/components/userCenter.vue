<template>
  <div class="hello">
    <van-nav-bar
        :title=msg
        left-text="返回"
        right-text='退出登录'
        @click-left="backHomefn"
        @click-right='logOut'
        left-arrow
    />
    <div class="userImgDiv">
        <h1>欢迎：{{userName}}</h1>
        <p>{{userInfo.describe}}</p>
    </div>
    <footerBar></footerBar>
  </div>

  
</template>

<script>
import axios from "axios";
import API_LIST from '@/APILIST.config';
import {Toast} from 'vant';
import footerBar from './footerBar';

export default {
  name: "userCenter",
  data() {
    return {
    msg: "用户中心",
    cartArr : [],
    userName : '',
    //用户信息对象
    userInfo : {}
    };
  },
  components : {footerBar},
  created(){
    if (localStorage.userInfo) {
      this.userInfo = JSON.parse(localStorage.userInfo);
      this.$notify(this.userInfo.username+'您已经登录了');
      this.islogin = false;
      this.cartArr = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
      this.userName = this.userInfo.username;

    }
  },
  methods: {
      backHomefn(){
          localStorage.setItem('inxState', 0);
          this.$router.push({
              path : '/'
          })
      },
      logOut(){
          localStorage.userInfo = '';
          this.$dialog.alert({
					message: '您已经退出登录！'
				}).then(()=>{
                    this.backHomefn();
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
      .userImgDiv{
      		float: left;overflow: hidden;
      		position: relative;border-radius: 10px;margin:10px;
      }
      .userImgDiv img{
      		position: absolute;top: 0;left: -20px;
      		width: 260px;
      }
      .userInfoDiv{
      		font-size: 14px;float: left;text-align: left;
      }
</style>