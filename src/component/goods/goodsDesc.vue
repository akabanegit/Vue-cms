<template>
    <div class="goodsdesc-container">
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            info:{},//图文数据
            id:this.$route.params.id
        }
    },
    created(){
        this.getDesc()
    },
    methods:{
        getDesc(){
            this.$http.get("api/goods/getdesc/"+this.id).then(
            function(result){
                this.info=result.body.message[0]
            }
        )
        }
        
    }
}
</script>

<style lang="scss" scoped>
.goodsdesc-container{
    h3{
        font-size: 13px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    padding: 4px;

}
</style>
<style lang="scss">
.goodsdesc-container{
    img{
        width: 100%
    }
}
</style>

