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


    <van-button type="danger" @click="loginFn">登录</van-button>
  </div>


</template>

<script>
import axios from "axios";
import API_LIST from '@/APILIST.config';

export default {
    name : 'register',
    data() {
        return {
            msg : '登录页面',
            userErr : '',
            pswErr : '',
            username : '',
            password : '',
        }
    },
    methods : {
        backHomeFn(){
            this.$router.go(-1);
        },
        loginFn(){
              let _loginObj = {
                username : this.username,
                password : this.password
            }
          
            this.userErr = '';
            this.pswErr = '';
            if (_loginObj.username === '') {
                this.userErr = '用户名为空';
                return false;
            }

            if (_loginObj.password === '') {
                this.pswErr = '密码为空';
                return false;
            }
            axios.post(API_LIST.login_post,_loginObj)
                .then(_d => {
                      this.$dialog.alert({
                        message : '登录成功，欢迎'+_d.data.regInfo.username
                    }).then(
                        () => {
                            if (_d.data.reg_code === 5) {
                                localStorage.userName = _d.data.regInfo.username;
                            }

                            // 注册完成，返回首页
                            this.$router.push({path : '/'})

                        }
                    )
                })

        },

    }
}

 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
