<template>
<!-- max不知道什么时候能拿到 但最终肯定能得到一个真正的max -->
<!-- 使用watch属性监听父组件传递过来的max  不管watch会被触发几次 但是最后一次肯定是合法的数值 -->
    <div class="mui-numbox" data-numbox-min='1' >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="countChanged"/>
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
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    
    },
    props:["max"],
    watch:{
        //使用jsapi 来监听 设置numbox的最大值
        'max':function(newVal,oldVal){
            mui(Selector).numbox().setOption('max',newVal)
        }
    }
}
</script>

<style>

</style>
