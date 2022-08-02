<template>
  <div>
    <el-card class="box-card">
      <el-table :data="roleList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#" :index="indexMethod">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">等级一</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
              >等级二</el-tag
            >
            <el-tag type="warning" v-else>等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRoleList } from '@/api/rights'
export default {
  created () {
    this.getRoleList()
  },
  data () {
    return {
      roleList: []
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    async getRoleList () {
      const res = await getRoleList()
      console.log(res)
      this.roleList = res.data.data
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.box-card {
  margin: 15px 0;
  .el-table {
    margin: 15px 0;
    font-size: 12px;
  }
}
</style>
