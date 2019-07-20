<template>
  <div class="home-container">
      <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>


    
    <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newlist">
		                    <img src="../img/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../img/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../img/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../img/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../img/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../img/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
		</div>
  </div>
</template>

<script>
import swiper from "./subcomponent/swiper.vue"

    export default{
        data(){
            return{
                lunbotuList:[]
            }
        },
        created(){
            this.getlunbotu()
            },
        methods:{
            getlunbotu(){
                this.$http.get('api/getlunbo')
                .then(function (result) {
                    // console.log(result.body);
                    
                        this.lunbotuList=result.body.message;
                    
                })
            }
        },
        components:{
            swiper
        }

    }
</script>


<style lang="scss" scoped>
// .mint-swipe{
//     height: 200px;
//     img{
//         // width: 100%;
//         height: 100%;
//     }
// }

.mui-grid-view.mui-grid-9 {
    background-color: white;
    border-top:none;
    img{
        width: 60px;
        height: 60px;
    };


}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border:none;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 13px;
}
</style>
