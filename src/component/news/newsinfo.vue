<template>
    <div class="newsinfo-container">

        <h3 class="title">{{newsinfoList.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsinfoList.add_time|dataFormat}}</span>
            <span>点击:{{newsinfoList.click}}次</span>
        </p>
        <hr>
    <div class="content" v-html="newsinfoList.content"></div>

    <!-- 评论区域 -->
    <comment-box :id="this.id"></comment-box>
    </div>

</template>

<script>
import comment from '../subcomponent/comment.vue'
export default {
    data(){
            return{
                id:this.$route.params.id, //将url上的id调用下来
                newsinfoList:{}
            }
        },
    created(){
            this.getnewsinfo()
            },
        methods:{
            getnewsinfo(){
                this.$http.get('api/getnew/'+this.id)
                .then(function (result) {
                    // console.log(result.body);
                        if(result.body.status===0){
                        this.newsinfoList=result.body.message[0];
                        
                        }
                        else{
                            Toast("获取新闻详情失败！")
                        }
                    
                })
            }
        },
    components:{
        'comment-box':comment
    }
}
</script>

<style lang="scss" >
.newsinfo-container{
    padding:0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin:15px 0;
        color:red;
    }
    .subtitle{
        font-size: 13px;
        color:blue;
        display: flex;
        justify-content:space-between
    }
    .content{
        img{
            width: 100%
        }
    }
}
</style>
