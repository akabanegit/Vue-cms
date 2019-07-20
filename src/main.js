import Vue from 'vue'

// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter 
Vue.use(VueRouter)
//3.导入自己的router.js模块
import router from './router.js'

//导入vuex包  Vuex的使用
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vue.Store({
  state:{
      //通过$store.state.数值 来调取数据
  },
  mutation:{

  }

})

//按需导入Mint-UI中的组件
import Mint from 'mint-ui';
//按需引入需要修改.babel文件 如官网所示 所以这里使用了完整引入
import 'mint-ui/lib/style.css'
Vue.use(Mint);

//导入MUI的样式
import './lib/mui-master/examples/hello-mui/css/mui.min.css'
import './lib/mui-master/examples/hello-mui/css/icons-extra.css'


// 
// import axios from 'axios'
// Vue.use(axios)

import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 导入 app 组件
import app from './App.vue'
//全局设置post时候表单数据格式的组织形式
Vue.http.options.emulateJSON=true;


//导入格式化时间的插件
import moment from "moment"
//定义全局的过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
 return moment(dataStr).format(pattern)
})

var vm = new Vue({
  el: '#app',
  render: c => c(app), // render 会把 el 指定的容器中，所有的内容都清空覆盖，所以 不要 把 路由的 router-view 和 router-link 直接写到 el 所控制的元素中
//   router // 4. 将路由对象挂载到 vm 上
  router,
  store //将vuex挂载到 vm实例中
})

// 注意： App 这个组件，是通过 VM 实例的 render 函数，渲染出来的， render 函数如果要渲染 组件， 渲染出来的组件，只能放到 el: '#app' 所指定的 元素中；
// Account 和 GoodsList 组件， 是通过 路由匹配监听到的，所以， 这两个组件，只能展示到 属于 路由的 <router-view></router-view> 中去；
