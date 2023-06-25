<template>
  <div id="app">
    <el-container>
      <el-aside  width="20vw">
    <NavMenu :functionData="functionData"/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </div>
</template>
<script>
import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'App',
  components: {
    NavMenu
  },
  data () {
    return {
      functionData: [
        {
          path: '/home',
          name: 'home',
          label: '组件一'
        },
        {
          path: '/tree',
          name: 'tree',
          label: '组件二'

        },
        {
          path: '/video',
          name: 'video',
          label: '组件三'

        },
        {
          path: '/some',
          name: 'some',
          label: '组件四'
        }

      ]
    }
  }

}
</script>

<style lang="scss">

</style>
