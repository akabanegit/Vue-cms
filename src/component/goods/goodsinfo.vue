<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
        

        <!-- 商品轮播图区域 -->
        <div class="mui-content">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunboList" :isfull="false"></swiper>
					</div>
				</div>
		</div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsInfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>￥{{goodsInfo.market_price}}</del>&nbsp;销售价:{{goodsInfo.sell_price}}<span class="now_price"></span>
                        </p>
                        <p>购买数量:<numbox :max="goodsInfo.stock_quantity" @getcount="getSelectCount"></numbox></p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="add_goods">加入购物车</mt-button>
					</div>
				</div>
				
		</div>
        <!-- 如何实现加入购物车时候拿到选择的数量 -->
        <!-- 由于涉及到父子组件的嵌套 所以无法直接在该页面中获取到选中的数量值 -->
        <!-- 涉及子组件向父组件传值 使用事件调用机制 -->
        <!-- 事件调用本质：父向子传递方法 子调用这个方法 同时把数据当做参数 传递给这个方法 -->
        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{goodsInfo.goods_no}}</p>
						<p>库存情况:{{goodsInfo.stock_quantity}}件</p>
						<p>上架时间:{{goodsInfo.add_time|dataFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
                    
                    <mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
                </div>
		</div>

    </div>
</template>

<script>
//导入轮播图组件
import swiper from "../subcomponent/swiper.vue"
import numbox from "./goodsinfo_numbox.vue"
export default {
    data(){
        return{
            id:this.$route.params.id,//将路有参数id挂载到id上
            lunboList:[],
            goodsInfo:[],
            ballflag:false,
            selectCount:1,//保存用户选中的商品数量 默认为1
        }
    },
    created(){
        this.getLunbotu(),
        this.getInfo()

    },
    methods:{
        getLunbotu(){
            
        //获取缩略图
        this.$http.get("api/getthumimages/"+this.id).then(
            function(result){
            result.body.message.forEach(item=>{
                    item.img=item.src
                })
                this.lunboList=result.body.message
            }
        )
    
        },
        getInfo(){
            this.$http.get("api/goods/getinfo/"+this.id).then(
            function(result){
                //先循环轮播图数组每一项 为item增加img属性 因为轮播图组件zhi认识item。img
               
                this.goodsInfo=result.body.message[0]
            }
        )
        },
        getDesc(id){
            //编程式导航 到图文介绍页面
            this.$router.push({name:"goodsdesc",params:{id}})
        },
        getComment(id){
            //编程式导航 到图文介绍页面
            this.$router.push({name:"goodscomment",params:{id}})
        },
        add_goods(){
            //添加到购物车
            this.ballflag=!this.ballflag;

        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){

            //小球动画优化
            //1.本质原因 把小球最终位移位置 已经局限在某个固定值
            //2.应该根据不同情况 动态计算这个坐标值
            //3.经过分析 先得到徽标的横纵坐标 再得到小球的横纵坐标 然后 x y值求差 结果就是要位移的距离
            //4.如何获取位置坐标 dom.getBoundingClientReect

            //获取小球的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect()
            //徽标位置  在DOM世界里和组件没有关系
            const badgePosition = document.getElementById("badge").getBoundingClientRect()
            
            const xDist=badgePosition.left-ballPosition.left
            const yDist=badgePosition.top-ballPosition.top

            el.offsetWidth;
            el.style.transform=`translate(${xDist}px,${yDist}px)`
            el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)"
            done()
        },
        afterEnter(){
            this.ballflag=!this.ballflag;
        },
        getSelectCount(count){
            //当子组件把选中的数量传递给父组件时
            this.selectCount=count
            // console.log(this.selectCount)
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
    }
    .now_price{
        color: red;
        font-size: 14px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top:394px;
        left:140px;
        
    }
</style>

