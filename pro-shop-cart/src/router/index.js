import Vue from 'vue'
import Router from 'vue-router'
import proShopCartDemo from '@/components/proShopCartDemo'
import register from '@/components/register'
import userLogin from '@/components/userLogin'
import goodsType from '@/components/goodsType'
import goodsProduct from '@/components/goodsProduct'
import cart from '@/components/cart'
import userCenter from '@/components/userCenter'
Vue.use(Router)

const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'proShopCartDemo',
      component: proShopCartDemo
    },
    {
      path : '/register',
      name : 'register',
      component : register
    },
    {
      path : '/userLogin',
      name : 'userLogin',
      component : userLogin
    },
    {
      path : '/goodsType',
      name : 'goodsType',
      component : goodsType
    },
    {
      path : '/goodsProduct',
      name : 'goodsProduct',
      component : goodsProduct
    },
    {
      path : '/cart',
      name : 'cart',
      component : cart
    },
    {
      path : '/userCenter',
      name : 'userCenter',
      component : userCenter
    }
  ]
})
