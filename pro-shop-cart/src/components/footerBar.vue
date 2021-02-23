<template>
    <div>
        <van-tabbar v-model="tabbarActive" @change="switchColFn">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="search">分类</van-tabbar-item>
            <van-tabbar-item icon="friends-o">购物车</van-tabbar-item>
            <van-tabbar-item icon="setting-o">{{isLoginTxt}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import axios from "axios";
import API_LIST from '@/APILIST.config';
export default {
    name : 'footerBar',
    data(){
        return {
            //footer标签组
            tabbarActive : 0,
            isLoginTxt : ''
        }
    },
    created(){
        if (localStorage.userInfo) {
            this.isLoginTxt = '我的'
        }else {
            this.isLoginTxt = '未登录'
        }
        
    },
    mounted(){
        this.tabbarActive = Number(localStorage.getItem('inxState'));
    },

    methods : {
        switchColFn () {
            switch(this.tabbarActive) {
                case 0 :
                    localStorage.setItem('inxState', 0);
                    this.$router.push({path : '/'});
                    break;
                case 1 :
                    localStorage.setItem('inxState', 1);
                    this.$router.push({path : '/goodsType'});
                    break;
                case 2 :
                    localStorage.setItem('inxState', 2);
                    this.$router.push({path : '/cart'});
                    break;
                case 3 :
                    this.isLoginFn();
                    break;
            }
        },
        //判断登录情况
        isLoginFn() {
            if (localStorage.userInfo) {
                localStorage.setItem('inxState', 3); 
                this.$router.push({path : '/userCenter'})
            }else {
                this.$router.push({path : '/userLogin'}); 
            }
        }
    }
    
}
</script>

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
</style>