<template>
  <div class="shop-container">
    <!-- 商品列表区域 -->
    <div class="goodsList" v-for="(item,i) in goodsList" :key="item.id">
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">{{item.sell_price}}</span>
                <shopcarNumbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid=item.id></shopcarNumbox>
                <!-- i删除goodsList中数据 item删除car中数据-->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
            
					</div>
				</div>
			</div>
    </div>



    <!-- 商品结算区域 -->
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>总计(不含运费)</p>
              <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
            </div>
            <div class="right">
              <mt-button type="danger">去结算</mt-button>
            </div>
					</div>
				</div>
			</div>
    </div>
</template>

<script>
import shopcarNumbox from './subcomponent/shopcar_numberbox.vue'
export default {
    data(){
      return{
        goodsList:[]
      }
    },
    components:{
      shopcarNumbox
    },
    created(){
      this.getGoodList()
    },
    methods:{
        getGoodList(){
          //1.获取store中所有商品的id 然后拼接出一个逗号分隔的字符串
          var idArr=[]
          this.$store.state.car.forEach(item=>idArr.push(item.id))
          //如果购物车中没有数据 则直接返回
          if(idArr.length<=0){
            return;
          }
          this.$http.get('api/goods/getshopcarlist/'+idArr.join(","))
          .then(function (result) {
              // console.log(result.body);
                  if(result.body.status===0){
                  this.goodsList=result.body.message;
                  
                  }
          })
        },
        remove(id,index){
          //点击删除 把商品从store中传递的id删除 同时把当前组件中的goodslist中对应要删除的那个商品
          this.goodsList.splice(index,1)
          this.$store.commit("removeFormCar",id)
        },
        selectedChanged(id,val){
          this.$store.commit("updateGoodsSelected",{id,select:val})
        }
    }



}
</script>



<style lang="scss" scoped>
.shop-container{
  background-color: #eee;
  overflow: hidden;
   .goodsList{
  .mui-card-content-inner{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  img{
    width: 60px;
    height: 60px;
  }
  h1{
    font-size: 13px;
  }
  .info{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    .price{
      color: red;
    }
  }
}
.jiesuan{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .red{
    color: red;
    font-weight: bold;
  }
}
}

</style>
