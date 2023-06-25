<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @click="clickMenu"
      background-color="#909399"
      text-color="#fff"
      active-text-color="#ffd04b">
      <h3>百宝箱</h3>
      <el-menu-item v-for="item in functionData" :index="item.name" :key="item.name" @click="clickMenu(item)">

        <span slot="title">{{ item.label }}</span>
      </el-menu-item>

    </el-menu>

</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    functionData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return { }
  },
  methods: {
    clickMenu (item) {
      console.log(item.name)
      this.$router.push(item.path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.el-menu-vertical-demo{
  width:20vw;
  height: 100vh;

h3{
  text-align: center;
  font-size: 30px;
  color: #fff;
 }
}

</style>
