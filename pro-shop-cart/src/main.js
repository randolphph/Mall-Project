// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Button,NavBar,Field,Dialog,Notify,Tab,Tabs,
  Tabbar, TabbarItem,GoodsAction, GoodsActionIcon, GoodsActionButton,
  Sku,Stepper,SubmitBar
} from 'vant'

Vue.use(Button).use(NavBar).use(Field).use(Dialog).use(Notify)
    .use(Tab).use(Tabs).use(Tabbar).use(TabbarItem)
    .use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon)
    .use(Sku).use(Stepper).use(SubmitBar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
