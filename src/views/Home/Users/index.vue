<template>
  <div>
    <el-card class="box-card">
      <div class="top">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable
          class="top_input"
        >
          <!-- 可通过 slot 来指定在 input 中前置prepend或者后置append内容。 -->
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary">添加用户</el-button>
      </div>
      <div class="content">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column
            type="index"
            label="#"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="photo" label="电话"> </el-table-column>
          <el-table-column prop="role" label="角色"> </el-table-column>
          <el-table-column prop="state" label="状态">
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#fff"
            >
            </el-switch>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
            ></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      input: '',
      currentPage4: 0,
      value: true,
      tableData: [
        {
          name: '小一',
          photo: '13548965689',
          role: 'admin',
          state: 'true',
          operation: '增删改查'
        },
        {
          name: 'erer',
          photo: '12345678936',
          role: '管理员',
          state: 'false',
          operation: '增删改查'
        }
      ]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    indexMethod (index) {
      return index + 1
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
  .top {
    display: flex;
    .top_input {
      width: 35%;
      margin-right: 25px;
    }
  }
}
.content {
  margin: 20px 0;
}
</style>
