<template>
    <div class="mui-numbox" data-numbox-min='1' >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" ref="numbox" @change="countChanged" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        <!-- 分析 父组件时候传递给子组件 -->
        <!--  -->
    </div>
</template>

<script>
import mui from "../../lib/mui-master/examples/hello-mui/js/mui.js";
export default {
    mounted(){
        //初始化数字选择框组件
        mui(".mui-numbox").numbox()
        
    },
    methods:{
        countChanged(){
            //每当数值量改变 把最新的数量同步到store中 覆盖之前得数量值
            this.$store.commit("updateGoodsInfo",{id:this.goodsid,count:this.$refs.numbox.value})
        }
    
    },
    props:["initcount","goodsid"]
    
}
</script>

<style>

</style>
