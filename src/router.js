import VueRouter from 'vue-router'


//导入对应的路由组件
import HomeContainer from './component/HomeContainer.vue'
import MemberContainer from './component/MemberContainer.vue'
import SearchContainer from './component/SearchContainer.vue'
import ShopcarContainer from './component/ShopcarContainer.vue'
import newlist from './component/news/newlist.vue'
import newsinfo from './component/news/newsinfo.vue'
import photolist from './component/photo/photolist.vue'
import photoinfo from './component/photo/photoinfo.vue'
import goodslist from './component/goods/goodslist.vue'
import goodsinfo from './component/goods/goodsinfo.vue'
import goodsdesc from './component/goods/goodsDesc.vue'
import goodscomment from './component/goods/goodsComment.vue'

var router = new VueRouter({
    routes: [//配置路由规则
      {path:'/',component:HomeContainer},
      {path:'/home',component:HomeContainer},
      {path:'/member',component:MemberContainer},
      {path:'/search',component:SearchContainer},
      {path:'/shopcar',component:ShopcarContainer},
      {path:'/home/newlist',component:newlist},
      {path:'/home/newsinfo/:id',component:newsinfo},
      {path:'/home/photolist',component:photolist},
      {path:'/home/photoinfo/:id',component:photoinfo},
      {path:'/home/goodslist',component:goodslist},
      {path:'/home/goodsinfo/:id',component:goodsinfo},
      {path:'/home/goodsdesc/:id',component:goodsdesc,name:'goodsdesc'},
      {path:'/home/goodscomment/:id',component:goodscomment,name:'goodscomment'},


    ],
    linkActiveClass:'mui-active'//覆盖默认路由高亮的类
  })

  export default router