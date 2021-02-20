<template>
    <div>
        {{msg}}
        <div v-if="!islogin">
            <van-button type="danger" @click="entryGoodsToDb">录入商品</van-button> 
        </div>
        <div class="wrapDiv cle">
            <van-tabs v-model="tabActive" animated>
                <van-tab   v-for="(item,index) in goodsCategoryData" 
                 :title=item.name :key=index>
                   <h1>{{item.describe}}</h1>
                </van-tab>   
            
            </van-tabs>
        </div>
        <!--录入商品-->
        <div v-if="isEntryGoods" class="goodsEntry cle">
            <div v-for="n in inputCount">
                <entryGoods
                @pushGoodsInfo = 'pushGoodsInfoFn'
                @isVoidFalse = 'isVoidFalseFn'
                />
            </div>
            <van-button type="danger" @click="addEmptyInput">+</van-button>
            <van-button type="danger" @click="submitGoods">提交</van-button>
            <van-button type="danger" @click="cancelGoodsFn">取消</van-button>
        </div>

          <div class="entryGoodsDivBg" v-if="isEntryGoodsDivBg"></div>
        <footerBar></footerBar>
    </div>
</template>

<script>
import axios from "axios";
import API_LIST from '@/APILIST.config';
import footerBar from './footerBar';
import entryGoods from './entryGoods';
export default {
  components: { footerBar,entryGoods },
    name : 'goodsType',
    data(){
        return {
            islogin : true,
            msg: '商品分类页面',
            goodsCategoryData : [],
            tabActive : 0,
            isEntryGoods: false,
            //商品对象数组
            goodsInfoArr : [

            ],
            //用于产生空白框
            inputCount : 1,
            //判断当前待输入的框是否填满
            isFull : false,
            isEntryGoodsDivBg : false
        }
    },
    created(){
        if (localStorage.userName) {
            this.$notify(localStorage.userName+'您已经登录了');
            this.islogin = false;
            this.msg = '商品分类页 ' + localStorage.userName
        }
        this.getGoodsCategoryFn();

    },
    component : {footerBar},
    methods : {
        getGoodsCategoryFn(){
            axios.get(API_LIST.getGoodsCategory)
            .then(
                _d => {
                this.goodsCategoryData = _d.data;
                }
            )
        },
        entryGoodsToDb(){
            this.isEntryGoods = true;
            this.isEntryGoodsDivBg = true;
      
        },
        //增加一个商品输入框
        addEmptyInput(){
        if (this.isFull === true) {
            this.inputCount++;
        }else {
        this.$dialog.alert({
                        message : '未输入完成'
                    })
        }
        this.isFull = false;
        

        },
        //向商品对象数组添加商品数据
        pushGoodsInfoFn(_goodsInfoObj){
        let _is = true;
    
        for (let i = 0 ; i < this.goodsInfoArr.length ; i++) {
            //判断商品名称是否重复
            if (this.goodsInfoArr[i].name === _goodsInfoObj.name) {
            _is = false;
            break;

            }
        }
        if (_is) {
            this.goodsInfoArr.push(_goodsInfoObj);
        }else {
            this.$dialog.alert({
            message : '商品重名了'
            })
        }
        this.isFull = true;

        },

        //当前框未输入满
        isVoidFalseFn(){
        this.isFull = false;
        },
        //向数据库提交商品
        submitGoods(){
        axios.post(API_LIST.submit_goods,this.goodsInfoArr)
            .then(
                _d => {
                this.$dialog.alert({
                            message : _d.data.regInfo
                        }).then(
                        () => {
                            this.goodsInfoArr = [];
                            this.isEntryGoods = false;
                            //提交结束后更新页面，获得商品大类
                            this.getGoodsCategoryFn();
                            this.isEntryGoodsDivBg = false;
                        }
                        )
                }
            )

        },
        //取消商品输入框
        cancelGoodsFn() {
            this.isEntryGoods = false;
            this.isEntryGoodsDivBg = false;
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
</style>