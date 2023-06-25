<template>
  <div class="home">
    <SwiperCom></SwiperCom>
    <el-card   class="zxt-card" shadow="always" :body-style="{ padding: '0px' }">
      <!-- 折线图 -->
  <div ref="echarts1" style="height:300px;"> </div>
</el-card>

<el-row :span="12">
  <el-col :span="11">
    <el-card  class="zzt-card" shadow="always" :body-style="{ padding: '0px' }">
      <!-- 柱状图 -->
      <div ref="echarts2" style="height:350px;"></div>
    </el-card>
  </el-col>

  <el-col :span="11">
    <el-card  class="bzt-card" shadow="always" :body-style="{ padding: '0px' }">
      <!-- 饼状图 -->
      <div ref="echarts3" style="height:340px;"> </div>
    </el-card>
  </el-col>
</el-row>

  </div>
</template>

<script>

import * as echarts from 'echarts'
import { getData } from '../api'
import router from '../router'

import SwiperCom from '@/components/SwiperCom.vue'

export default {
  name: 'HomeView',
  components: {
    SwiperCom
  },
  data () {
    return {
      tableData: []
    }
  },

  mounted () {
    getData().then(({ data }) => {
      console.log(data.data)
      // 折线图
      // 基于准备好的dom,初始化echarts实例（因为初始化时需要获取当前的DOM)
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图表的配置项和数据
      const echarts1Option = {}
      // 处理数据xAxis
      const { orderData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data: xAxis
      }
      echarts1Option.xAxis = xAxisData
      echarts1Option.yAxis = {}
      echarts1Option.legend = xAxisData
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echarts1Option)
      // 'click'事件是点击图像（折线图的节点、柱状图的柱形时完成跳转
      echarts1.on('click', function () {
        router.push({ path: '/tree' })
      })

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      const { userData } = data.data
      // echarts2.series = []
      const echarts2Option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        // 图例
        legend: {
          /* orient: 'vertical',
          top: 'center', */

        },
        xAxis: {
          data: userData.map(item => item.date)
          // 轴线的相关配置：例如轴线两端的箭头，轴线的样式等
          /* axisLine: {
            symbol: 'arrow',
            lineStyle: {
              type: 'dashed'
              // ...
            }
          } */
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: userData.map(item => item.new)
          },
          {
            type: 'bar',
            data: userData.map(item => item.active)
          }

        ]

      }
      console.log(echarts2Option)
      echarts2.setOption(echarts2Option)
      echarts2.on('click', function () {
        router.push({ path: '/video' })
      })

      // 饼图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const { videoData } = data.data

      const echarts3Option = {
        legend: {
          data: videoData
        },
        series: [
          {
            type: 'pie',
            data: videoData
          }]
      }

      // console.log(echarts3Option)
      echarts3.setOption(echarts3Option)
      echarts3.on('click', function () {
        router.push({ path: '/some' })
      })

      // 处理点击事件并且跳转到相应的搜索页面
      /* echarts3.on('click', function(params) {
  window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
}); */

      /* chart.on('mouseover', { seriesName: 'uuu' }, function() {
  // series name 为 'uuu' 的系列中的图形元素被 'mouseover' 时，此方法被回调。
}); */
    })
  }

}
</script>
<style>
.zxt-card {
    width: 100%;
    height: 300px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .zzt-card {
    width: 100%;
    height: 350px;
    margin-right: 80px;
  }
  .bzt-card {
    width: 100%;
    height: 350px;
    margin-left: 75px;
  }

</style>
