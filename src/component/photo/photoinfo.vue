<template>
    <div class="photo-container">
        <h3>{{photoinfolist.title}}</h3>
        <p  class="subtitle">
            <span>发表时间:{{photoinfolist.add_time|dataFormat}}</span>
            <span>点击:{{photoinfolist.click}}次</span>
        </p>
        <hr>


        <!-- 缩略图区域 -->
        <!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" @click="$preview.open(index,list)" :key="item.src"> -->

                <!--
            缩略图区域
            预览缩略图续安装插件: npm i vue-preview -s
            $preview.open
        -->
        <div class="thumbs">
            <!-- 最新缩略图版插件和之前不一样，看这里
             https://blog.csdn.net/qq_36742720/article/details/83270636
             -->
            <vue-preview :slides="list"></vue-preview>
        </div>


        <!-- 图片内容区域 -->
        <div id="content" v-html="photoinfolist.content"></div>

        <!-- 放置现成的评论子组件 -->
        <cmt-box></cmt-box>
    </div>
        
</template>

<script>
//1.导入评论子组件
import comment from '../subcomponent/comment.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,
            photoinfolist:[],
            list:[]
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/"+this.id).then(function(result) {
        // console.log(result.body);
        if (result.body.status === 0) {
          //手动拼接出一个全部节点
          this.photoinfolist = result.body.message[0];
          console.log(result.body.message)
        }
      });
    },
    getThumbs(){
        //获取缩略图
        this.$http.get("api/getthumimages/"+this.id).then(
            function(result){
                //循环每个图片数据 补全图片的宽和高
                result.body.message.forEach(item =>{
                    item.w=600;
                    item.h=400;
                    item.msrc = item.src;
                }
                
                )
                this.list=result.body.message
            }
        )
    }
},
    components:{
        'cmt-box':comment
    }
}    
</script>

<style lang="scss" scoped>
.photo-container{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px
    }
    .content{
        font-size: 13px;
    }

}

</style>

<style lang="scss" scoped>
    .photoinfo-container {
        .suoluetu {
            .my-gallery{
                display: flex;
                flex-wrap: wrap;
            }
            figure {
                width: 60px;
                height: 80px;
                margin: 10px;
                box-shadow: 0 0 8px #999;
                img {
                    width: 50%;
                    height: 50%;
                }
            }
        }
    }
</style>