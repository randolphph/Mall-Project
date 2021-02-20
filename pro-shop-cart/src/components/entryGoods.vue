<template>
	<div class="wrapDiv">
        <input type="text"
            class="goodsEntry"
            placeholder="输入名称"
            v-model="name"
            @blur="nameBlurFn"
        >
        <input
            type="text"
            class="goodsEntry"
            placeholder="输入价格"
            v-model="price"
            @blur="priceBlurFn"
        >
        <input
            type="text"
            class="goodsEntry"
            placeholder="输入描述"
            v-model="describe"
            @blur="describeBlurFn"
        >
        <input
            type="text"
            class="goodsEntry"
            placeholder="输入图片"
            v-model="img"
            @blur="imgBlurFn"
        >
    </div>
</template>

<script>
export default{
	name:'entryGoods',
	data(){
		return {
			name : '',
            price : '',
            describe : '',
            img : '',
            itemGoodsInfo : {
                name : '',
                price : '',
                describe : '',
                img : ''
            }
		}
	},
    methods : {
        nameBlurFn() {
            this.itemGoodsInfo.name = this.name;
            this.inputCheckFn();
        },
        priceBlurFn() {
            this.itemGoodsInfo.price = this.price;
            this.inputCheckFn();
        },
        describeBlurFn() {
            this.itemGoodsInfo.describe = this.describe;
            this.inputCheckFn();
        },
        imgBlurFn() {
            this.itemGoodsInfo.img = this.img;
            this.inputCheckFn();
        },
        inputCheckFn() {
            for (let i in this.itemGoodsInfo) {
                if (this.itemGoodsInfo[i] === '') {
                    this.$emit('isVoidFalse');
                    return;
                }
            }
            this.$emit('pushGoodsInfo',this.itemGoodsInfo);

        }
    }

}
</script>


<style type="text/css">
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
		      .goodsEntry{
		        float: left;width: 30%;margin:10px;
		        border-radius: 10px;border:1px solid #999;
		        line-height: 30px;text-align: center;
		        font-size: 16px;
		      }
</style>