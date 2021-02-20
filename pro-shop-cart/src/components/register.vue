<template>
  <div class="hello">
    <van-nav-bar
        :title=msg
        left-text="返回"
        left-arrow
        @click-left="backHomeFn"
    />
    <van-field
        v-model="username"
        required
        label="用户名"
        placeholder="请输入用户名"
        :error-message='userErr'
    />

    <van-field
        v-model="password"
        required
        type="password"
        label="密码"
        placeholder='请输入密码'
        :error-message='pswErr'
    />

     <van-field
        required
        v-model="password2"
        type="password"
        label="再次输入密码"
        placeholder='请重复输入密码'
        :error-message='pswErr2'
    />

    <van-field
        
        v-model="describe"
        type="text"
        label="个人签名"
        placeholder='请输入'
    />

    <van-button type="danger" @click="registerFn">立即注册</van-button>
    <van-button type="danger" @click="">重置</van-button>
  </div>


</template>

<script>
import axios from "axios";
import API_LIST from '@/APILIST.config';

export default {
    name : 'register',
    data() {
        return {
            msg : '注册页面',
            userErr : '',
            pswErr : '',
            pswErr2 : '',
            username : '',
            password : '',
            password2 : '',
            describe : ''
        }
    },
    methods : {
        backHomeFn(){
            this.$router.go(-1);
        },
        registerFn() {
            let _registerObj = {
                username : this.username,
                password : this.password,
                password2 : this.password2,
                describe : this.describe
            }
          
            this.userErr = '';
            this.pswErr = '';
            this.pswErr2 = '';
            if (_registerObj.username === '') {
                this.userErr = '用户名为空';
                return false;
            }

            if (_registerObj.password === '') {
                this.pswErr = '密码为空';
                return false;
            }

            if (_registerObj.password2 === '') {
                this.pswErr2 = '重复密码为空';
                return false;
            }

            if (_registerObj.password !== _registerObj.password2) {
                this.pswErr2 = '重复密码不一致';
                return false;
            }
            this.register_postFn(_registerObj);
        },

        register_postFn(_registerObj) {
            axios.post(API_LIST.register_post,_registerObj)
                .then(_d => {
                    this.$dialog.alert({
                        message : _d.data.regInfo
                    }).then(
                        // 注册完成，返回首页
                        () => this.$router.push({path : '/'})
                    )
                })
        }
    }
}

 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
