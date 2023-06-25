<template>
  <div class="tree">
    <h1>This is an tree page</h1>
    <MyTree :data.sync="data"
            :fileDrop="fileDrop"
            :diectoryDrop="diectoryDrop"
            :delete="deleteFn"
            :rname="rname">
          </MyTree>
  </div>
</template>

<script>

import { getTreeData } from '../api'
import MyTree from '@/components/MyTree.vue'

export default {
  name: 'TreeView',
  components: {
    MyTree
  },
  data () {
    return {
      data: [],
      fileDrop: [
        { text: 'rm', value: '删除文件' }
      ],
      diectoryDrop: [
        { text: 'rn', value: '修改名字' },
        { text: 'rm', value: '删除文件夹' }
      ]

    }
  },
  mounted () {
    getTreeData().then(({ data }) => {
      // console.log(data.data)
      const { parent, child } = data.data
      this.data = [...parent, ...child]
      // console.log(data)
    })
  },
  methods: {
    rname (id, newName) {

    },
    deleteFn (id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
    }
  }

}
</script>
<style>

</style>
