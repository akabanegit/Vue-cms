<template>
    <div>
        <!-- 谁使用此轮播图组件 谁为我们传递lunbotuList -->
        <!-- 此时lunbotuList是父组件向子组件传值 -->
        <mt-swipe :auto="4000" >
            <mt-swipe-item v-for="item in lunbotuList" :key='item.id'>
            <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:["lunbotuList","isfull"],

}
</script>

<style lang="scss" scoped>
.mint-swipe{
    text-align: center;
    height: 200px;
    img{
        // width: 100%;
        height: 100%;
    }
}
.full{
    width:100%;
}
</style>

