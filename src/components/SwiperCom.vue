<template>
  <div class="block">

    <el-carousel height="280px" arrow="always">
      <el-carousel-item v-for="(item,i) in imgs" :key="i">  <!-- key只能传字符串或数字 -->
        <img :src="item.pic" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'SwiperCom',
  data () {
    return {
      imgs: [
        { pic: require('../assets/swiper11.jpg') },
        { pic: require('../assets/swiper22.jpg') },
        { pic: require('../assets/swiper33.jpg') }
      ],
      screenWidth: 0 // 浏览器宽度

    }
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)实现计算高度
      this.bannerHeight = 400 / 1920 * this.screenWidth
    }

  },
  mounted () {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth // window.innerWidth获取浏览器可视区域的宽度，也就是页面的宽度
    this.setSize()
    // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth
      this.setSize()
    }
  }
}
</script>

<style>

  img{
    width:100%;
    height:100%;

 }
</style>
