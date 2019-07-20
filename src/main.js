import Vue from 'vue'

// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter 
Vue.use(VueRouter)
//3.导入自己的router.js模块
import router from './router.js'

//每次进入网站 肯定先调用main  先从本地存储中调用car
var car=JSON.parse(localStorage.getItem('car'||'[]'))
//导入vuex包  Vuex的使用
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
  state:{
      //在组件中通过this.$store.state.数值 来调取数据
        // 数值：..
        car:car//将购物车商品的数据 用一个数组存储起来 
        //在car数组里面 存储一些商品对象 设计{id：商品的id,count:要购买的数量，price:商品的单价，selected：false}
  },
  mutations:{
    // 如果要操作store中的state值 只能通过调用mutation提供的方法 才能操作对应的数组
    // 不推荐直接操作this.$store.state.数值
    addToCar(state,goodsinfos){
      //如果购物车中已经有对应的商品了 只需更新数量
      //如果没有 则直接把商品数据 push到car中

      //假设没有找到对应的商品
      var flag=false
      
      state.car.some(item=>{
        if(item.id ==goodsinfos.id){
          item.count +=parseInt(goodsinfos.count)
          flag=true
          return true
        }
      })

      if(!flag){
        state.car.push(goodsinfos)
      }

      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfos){
      //修改购物车中加减修改商品数量值
      state.car.some(item=>{
        if(item.id==goodsinfos.id){
          item.count=parseInt(goodsinfos.count)
          return true
        }
      })
      //当修改完最新的数量  把最新的购物车数据 保存到本地
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFormCar(state,id){
      //根据id 从store中的购物车中删除对应的那条商品数据
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1)
          return true
        }
      })
      //将删除完毕后的最新的购物车数据同步到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.select=info.select
        }
      }),
      localStorage.setItem('car',JSON.stringify(state.car))
    }

    // 注意 如果子组件需要调用mutation中的方法 只能使用this.$store.commit('方法')
    // 参数1:state 参数2：commit传送过来的值
  },
    getters:{
      // 这里getters只负责对外提供数据 不负责修改数据  给元数据做了一层宝座 提供给调用者
      // 其次 跟computed比较像 只要state中数据发生变化 且getters正好引用这个数据 就会触发getters重新求值
      //相当于计算属性 也相当于filters
      getAllCount(state){
        var c=0
        if(state.car){
        state.car.forEach(item=>{
          c+=item.count
        })
        return c
      }},
      getGoodsCount(state){
        var o={}
        state.car.forEach(item=>{
          o[item.id]=item.count
        })
        return o
      },
      getGoodsSelected(state){
        var o={}
        state.car.forEach(item=>{
          o[item.id]=item.select
        })
        return o
      },
      getGoodsCountAndAmount(state){
        var o={
          count:0,//勾选的数量
          amount:0,//勾选的总价
        }
        state.car.forEach(item=>{
          if(item.select==true){
            o.count=o.count+item.count
            o.amount=o.amount+item.preice*item.count
          }
          
        })
        return o
      }
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
// // defalut install
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
// import { stat } from 'fs';
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
