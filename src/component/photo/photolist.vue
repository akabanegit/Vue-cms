<template>
  <div>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item' ,item.id==0 ? 'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
        <h1 class="info-title">{{item.title}}</h1>
        <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui-master/examples/hello-mui/js/mui.js";


export default {
  data() {
    return {
      cates: [],//分类列表
      list:[]//图片列表
    };
  },
  mounted() {
    //当组件中的DOM结构被渲染好 并被放到页面上
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
  },
  created() {
    this.getAllCategory(),
    //默认进入页面,就主动请求页面 所有图片
    this.getPhotoList(0)
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(function(result) {
        // console.log(result.body);
        if (result.body.status === 0) {
          //手动拼接出一个全部节点
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
          
        }
      });
    },
    getPhotoList(cateId) {//根据分类id获取图片列表
      this.$http.get("api/getimages/"+cateId).then(function(result) {
        // console.log(result.body);
        if (result.body.status === 0) {
          this.list = result.body.message;
          
        }
      });
    }

  }
};
</script>

<style lang="scss" scoped>
// .mui-scroll{
//     transform: translate(1s)
// }
* {
  touch-action: pan-y;
}
.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
    position: relative;
    background-color: #ccc;
    box-shadow: 0 0 9px #999;
    img{
        width: 100%;
        vertical-align: middle;
    }
    margin-bottom: 10px;
    text-align: center;
    img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        } 
    .info{
        color: white;
        .info-title{
            font-size: 14px
        };
        .info-body{
            font-size: 13px
        }
        position: absolute;
        bottom:0;
        background-color: rgba(0,0,0,0.4);
        max-height: 84px;
    }      
    }

}

</style>
