 <template>
  <el-tree :data="allData"
  default-expand-all
  :expand-on-click-node="false"
  :render-content="renderContent">
  </el-tree>

</template>

<script>

import { getTreeData } from '../api'

export default {
  name: 'MyTree',
  props: {
    delete: Function,
    data: {
      type: Array,
      default: () => []
    },
    fileDrop: Array,
    diectoryDrop: Array
  },
  data () {
    return {
      allData: [],
      currentId: '',
      currentContent: ''
    }
  },
  methods: {
    isParent (data) {
      return data.type === 'parent'
    },
    handleRename (data) {
      // console.log(data)
      this.currentContent = data.name
      this.currentId = data.id
    },
    remove (id) {
      let list = this.allData
      console.log(list)
      list = list.filter(l => l.id !== id)
      console.log(list)
      this.allData = list
      this.$emit('update:data', list)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    handleRemove (data) {
      // console.log(data)
      this.$confirm(`此操作将永久删除该文件, ${data.name} 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete
          ? this.delete(data.id).then(() => {
            this.remove(data.id)
          })
          : this.remove(data.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCommand (data, value) {
      // console.log(data)
      // console.log(value)
      if (value === 'rn') {
        this.handleRename(data)
      } else if (value === 'rm') {
        this.handleRemove(data)
      }
    },
    cannel () {
      this.currentId = ''
    },
    ok (data) {
      console.log(data)
      const list = this.allData
      const item = list.find(l => l.id === data.id)
      item.name = this.currentContent
      // console.log(item.name)
      console.log(list)
      // this.allData = list
      console.log(this.allData)
      this.currentId = ''
      this.$emit('update:data', list)

      this.$message({
        type: 'success',
        message: '修改成功!'
      })
    },
    handleInput (v) {
      this.currentContent = v
    },

    renderContent (h, { node, data, store }) {
      const list = this.isParent(data) ? this.diectoryDrop : this.fileDrop
      return (<div style="width:100%">

          <span class="custom-tree-node">
            <span style="padding-left:30px;font-size:16px">{node.label}</span>
            <div class="icon" style="height:10px">
              {
                this.isParent(data)
                  ? node.expanded
                    ? <i class="el-icon-folder-opened" style="position: relative;top: -21px;"></i>
                    : <i class="el-icon-folder" style="position: relative;top: -21px;"></i>
                  : <i class="el-icon-document" style="position: relative;top: -21px;"></i>
              }
             {
                data.id === this.currentId
                  ? <el-input value={this.currentContent} on-input={this.handleInput}></el-input>
                  : null }
              {

                data.id !== this.currentId
                  ? <el-dropdown placement="bottom-start"
               trigger="click"
               on-command={this.handleCommand.bind(this, data)}
               style="position: relative;right: -130px;top: -21px;">
  <span class="el-dropdown-link">
  <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown" style=" float:right">
    {list.map(item => (
      <el-dropdown-item command={item.text}>{item.value}</el-dropdown-item>
    ))}
  </el-dropdown-menu>
</el-dropdown>
                  : <span style={{ float: 'right' }} >
                    <el-button type="text" on-click={this.ok.bind(this, data)}>确认</el-button>
                    <el-button type="text" on-click={this.cannel}>取消</el-button>
                  </span>

              }
            </div>
          </span>
          </div>
      )
    }

  },

  mounted () {
    // const AllData = this.data
    getTreeData().then(({ data }) => {
      const { parent, child } = data.data
      // console.log(parent)
      parent.forEach(p => { p.type = 'parent' })
      const AllData = [...parent, ...child]
      const treeMapList = AllData.reduce((memo, current) => {
        current.label = current.name
        memo[current.id] = current
        return memo
      }, {})

      const result = AllData.reduce((arr, current) => {
        const pid = current.pid
        const parent = treeMapList[pid]
        if (parent) {
          parent.children ? parent.children.push(current) : parent.children = [current]
        } else if (pid === 0) {
          arr.push(current)
        }
        return arr
      }, [])
      this.allData = result
      // console.log(result)
    })
  }

}

</script>

<style scoped>
.el-tree {

    width:50%;
}
.el-dropdown{
    float:right
}

</style>
