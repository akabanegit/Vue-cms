# 首页制作
1.制作header区域，使用mint-UI组件。
    注意：这里使用了全局导入,因为官网说明如果要按需导入需修改.babel文件。

2.制作底部tabbar区域，使用的是MUI，导入方式需要去找MUI的css文件，import css文件夹，MUI的图表在example文件夹中寻找。在制作购物车小图标时，要注意是否添加了额外的样式表css，然后在入口文件内import添加。


3.在中间区域防止一个router-view组件




## tabbar路由建立
入口文件注册路由 

设置路由 `router-link`

设置路由高亮，通过修改router
`linkActiveClass:'mui-active'//覆盖默认路由高亮的类`

## 新建路由组件
1.新建组件.vue文件

2.导入对应的路由组件,修改router.js路由中的路由规则

3.建立路由区域 router-view


## 轮播图
1.利用mintui 中mt-swipe标签 注意：高度问题

## 加载首页轮播图数据
1.获取数据 利用vue-resource 注意：业务逻辑中data

2.使用vue-resource this.$http.get获取数据 api接口:http://www.liulongbin.top:3005/api/getlunbo

3.获取到的数据要保存到data身上

4.使用v-for循环渲染每个mt-swipe-item

## 九宫格的改造过程
1.style样式的修改

2.注意是 lang="scss" 不是sass 

##组件切换动画
1.router-view


## 新闻资讯 页面制作
1.绘制页面
2.router-resource获取数据
3.渲染真实数据  注意 图片src需要绑定属性vue特效   `:src`

4.发表时间的修改 使用Vue中的过滤器


## 实现新闻资讯列表 点击跳转到新闻详情
1.把列表中的每一项改造为router-link a改造为rl
2.同时在跳转时候提供唯一的新闻标识符
3.创建新闻详情的组件页面 newsinfo.vue
4.在路由模块中 将路由模块注册 注意:在注册的时候 path路径要加:id


## 实现新闻资讯详情的页面布局和数据渲染


## 单独封装一个comment.vue评论子组件
1.先创建一个单独的comment.vue组件模板
2.需要使用的comment组件的页面中 手动导入coment组件
import comment from './comment.vue'
3.在父组件中 使用components属性  将刚才导入comment组件 注册为自己的子组件
4.将注册子组件的时候 注册名称 以标签形式  在页面引用即可



## 获取所有的评论数据
1.父组件向子组件传值
2.props使用 属性的传值
3.getComment()

## 时间点击加载更多评论的功能
1.为加载更多按钮 绑定点击事件 pageIndex+1 请求下一页数据 再渲染
2.注意 获取新数据时候 不能覆盖老数据 要对老数据和新数据进行拼接 
数组的方法concat()

## 发表评论
1.把文本框做双向数据绑定
2.发表评论绑定事件
3.校验评论内容是否为空 如果为空 则提示Toast用户 不能为空
4.通过vue-resource把评论发送请求 把评论内容提交给服务器
5.当发表评论ok后 重新刷新列表后 以查看最新评论
+如果调用getComment方法重新刷新列表 可能只能得到最后一页的评论 前面几页获取不到
+换一种方法：当评论成功后 服务器返回status===0后手动拼接一个最新的评论对象 然后调用一个数组的unshift方法 把最新的评论追加到data中的comment的开头 


## 改造图片分享 按钮链接修改为router-link 并显示对应的组件页面

## 绘制图片列表 组件页面结构并美化样式
1.制作顶部的滑动条 (注意mui样式表中 mui-fullscreen类需要删去 需要增加js逻辑)
2.制作底部的图片列表
3.滑动条无法正常滑动  通过检查官方文档 发现这是js组件 需要初始化
+导入mui.js
+调用官方提供的方式去初始化

4.在导入mui.js时候 出现报错 无法被webpack打包 出现冲突 严格模式无法使用
+解决方案 ：1.把webpack的严格模式禁用 
+增加了警告 删去警告通过修改style *{touch-action: pan-y};
5.刚进入图片分享页面的时候 滑动条无法正常工作 
+如果要初始化滑动条 必须要等DOM元素加载到页面完毕 所有把初始化代码挂载到mounted()生命周期函数上
+由于mui-tab-item冲突问题 导致无法切换app中的组件 使用修改mui-tab-item的样式名称来解决 mui-tab-item修改为mui-tab-item-llb

6.获取所有分类数据名 并渲染数据列表


## 制作图片列表
1.图片列表需要懒加载技术 mint-ui中的laze-load
2.渲染图片列表数据
注： 首次加载放置getPhotoList(0)于created生命周期函数中
然后再点击加载函数@click=''

## 实现图片的懒加载和样式美化

## 实现了点击图片 跳转到图片详情页面
1.在改造li成router-link时候 使用tag属性指向 li

## 实现 详情页面的布局和美化 同时获取数据渲染页面


## 实现图片详情中 缩略图的功能
1.使用插件 vue-preview的缩略图插件
2.获取所有图片列表 然后使用v-for渲染
3.注意 img标签上的class不能去掉
4.每个数组对象中 要有w h


## 绘制商品列表页面结构 并美化


## 编程式导航

## 绘制商品详情页面结构
1.抽离轮播图组件 新建轮播图子组件swiper
2.商品详情轮播图图片宽度100% 高度自适应 设置 :class="'full'=isfull"
3.scoped 添加与否 影响goodsdesc中的img  我多添加了一个公用style
4.购物车动画绘制  小球动画绘制
5.vue  @click @changed @getcount 各种事件！！ 
6.父组件向子组件传值  子组件向父组件传值 两种不同情况所使用的的方法

## vuex的使用
1.vuex 是vue 配套的公共数据管理工具 可以把一些共享的数据 保存到vuex 方便整个程序中的任何组件直接获取或修改我们的公共数据
2.用来替代 .父组件向子组件传值  子组件向父组件传值  嵌套组件传值
3.vuex是为了保存组件之间共享数据诞生 如果组件间有要共享的数据 可以直接挂载到vuex中 不必通过父子组件传值 如果
不需要共享 这些不需要共享的私有数据 没有必要放到vuex中
props 和data  和vuex的区别
4.vuex是一个全局的共享数据存储区域 就相当于一个数据仓库
5.操作数据需要让仓库自己操作 重点！！！！！！！


### vuex总结
1.state中数据不能直接修改 如果修改需要通过mutations
2.如果组件想直接从state上获取数据 需要this.$store.state.***
3.如果组件想要修改数据 必须使用mutations听得方法  需要通过
this.$store.commit('方法的名字',唯一的参数)
3.如果store上的state的数据 在对外提供的是 需要做一层包装 推荐使用getters
 $store.getters.***

 当更新car之后 把car数组存储到本地 localStorage中


 ## getters的使用
 1.如何从购物车中获取商品数量
 2.先创建一个空对象 循环购物车所有商品数据 吧当前循环这条商品的id当做对象属性名
 count值作为属性值 例如{"88":3,"89":4}
 3.利用vuex getters计算属性 创建新对象  再引用getters
 4.再从父组件传递值给子组件


 # 本项目难点在于购物车的逻辑
1.什么时候用mutations（往store放数据）  什么时候用getters(从store取数据)
2.ES6的foreach  some的使用
3.vux中的car是作为中转站

## 购物车总价的计算


## 返回按钮 
1.利用watch来实现路由的监听



## 自己所想的需求
1.搜索功能能找到对应的商品页面 输入商品名称 点击搜索 跳转到商品页面组件