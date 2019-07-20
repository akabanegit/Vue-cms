<template>
    <div class="goods-list">
            <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id"
                     tag="div">
                <img :src="item.img_url" alt="">
                <h1 class="title">{{ item.title }}</h1>
                <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex:1,//分页的页数
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList()
        
    },
    methods:{
         getGoodsList() {
      this.$http.get("api/getgoods?pageindex="+this.pageIndex).then(function(result) {
        // console.log(result.body);
        if (result.body.status === 0) {
          //手动拼接出一个全部节点
          this.goodslist = this.goodslist.concat(result.body.message);
          
        }
      });
    },
    getMore(){
        this.pageIndex++
        this.getGoodsList()
    }
    }
}
</script>

<style lang="scss" scoped>
      .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border:1px solid #ccc;
            margin: 4px 0;
            padding: 1px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height:293px; 
        img{
            width: 100%;

        }
        .title{
            font-size: 14px
        }
        .info{
            background-color: #ddd;
            p{
                margin:0;
                padding: 5px;
            }
            .price{
                .now{
                    color:red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 15px
                }
            }
            .sell{
                display:flex;
                justify-content: space-between;
                font-size: 12px
            }
        }
        }
        
      }
</style>

