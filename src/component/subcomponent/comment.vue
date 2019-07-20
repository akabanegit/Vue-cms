<template>
<div class="cmt-container">
    
    <hr>
    <textarea placeholder="请输入要评论的内容(最多120字)" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) in commentList" :key="item.id">
            <div class="item-title">
                第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time|dataFormat}}
            </div>
            <div class="item-body">
                {{item.content}}
            </div>
        </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
</div>
</template>

<script>

export default {
        data(){
            return{
                commentList:[],
                pageIndex:1,//默认展示第一页数据，
                msg:"" //评论内容数据
            }
        },
        created(){
            this.getComment()
            },
        methods:{
            getComment(){//获取评论
                this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex)
                .then(function (result) {
                    // console.log(result.body);
                    
                        this.commentList=this.commentList.concat(result.body.message);
                    
                })
            },
            getMore(){
                this.pageIndex=this.pageIndex+1;
                this.getComment()
            },
            postComment(){
                //校验是否为空
                if(this.msg.trim().length===0){
                    return Toast('评论内容不能为空！')
                }
                //发表评论
                //参数一：请求的url地址
                //参数二：提交给服务器的数据对象{content:this.msg}
                //参数三：定义提交时候 表单中的数据的格式 {emulateJson:true}
                this.$http.post("api/postcomment/"+this.id,{content:this.msg.trim()}).then(function(result){
                    if(result.body.status ===0){
                        //拼接出一个评论对象
                        var cmt={
                            user_name:"匿名用户",
                            add_time:Date.now(),
                            content:this.msg.trim()
                        };
                        this.commentList.unshift(cmt);
                        this.msg=""
                    }
                })
            }
        },
        props:["id"]
}

</script>


<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin:0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .item-title{
                line-height: 30px;
                background-color:#ccc;
                
            }
            .item-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}

</style>
