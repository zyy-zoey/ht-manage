<template>
  <div>
    <el-card class="box-card">
      <div class="top">
        <el-input
          placeholder="请输入内容"
          v-model="obj.query"
          clearable
          class="top_input"
          @clear="getUsers"
        >
          <!-- 可通过 slot 来指定在 input 中前置prepend或者后置append内容。 -->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUsers"
          ></el-button>
        </el-input>
        <el-button
          type="primary"
          @click="
            addDialogVisible = true;
            isEdit = false;
          "
          >添加用户</el-button
        >
      </div>
      <div class="content">
        <el-table :data="userList" style="width: 100%" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="userStateChange(scope.row)"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <!-- 编辑 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showRoleDialog(scope.row)"
              >
              </el-button>
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="del(scope.row.id)"
              ></el-button>
              <!-- 用户角色 -->
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="roolRoleShow(scope.row)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="obj.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="obj.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户 编辑用户 -->
    <el-dialog
      :title="isEdit ? '编辑用户' : '添加用户'"
      :visible.sync="addDialogVisible"
      @close="reset"
    >
      <!-- 经典三层 -->
      <el-form ref="myForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="form.username" v-if="isEdit"></el-input>
          <el-input v-model="form.username" v-else></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClick">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配用户角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      @close="setRoleDialogClosed"
    >
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色：{{ userInfo.role_name }}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleIndo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, delRole, userState, addRole, editRole, getRoleList, roolRole } from '@/api/users'
export default {
  created () {
    this.getUsers()
  },
  data () {
    // 验证邮箱规则
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regEmail.test(value)) {
        // 合法
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    // 验证手机号规则
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^(?:(?:\+|00)86)?1\d{10}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      input: '',
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0,
      // userShowPop: false,
      addDialogVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', tigger: 'blur' },
          { min: 3, max: 10, message: '用户名在3-10个字符之间', tigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', tigger: 'blur' },
          { min: 6, max: 15, message: '用户名在6-15个字符之间', tigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入密码', tigger: 'blur' },
          { validator: checkEmail, tigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入密码', tigger: 'blur' },
          { validator: checkMobile, tigger: 'blur' }
        ]
      },
      // 编辑
      isEdit: false,
      // 用户角色分配
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所以角色的数据列表
      roleList: [],
      // 选中角色的id值
      selectedRoleId: ''
    }
  },
  methods: {
    // ...mapActions(['menu/getUsers']),
    handleSizeChange (pagesize) {
      this.obj.pagesize = pagesize
      this.getUsers()
    },
    handleCurrentChange (pagenum) {
      this.obj.pagenum = pagenum
      this.getUsers()
    },
    // 用户信息
    async getUsers () {
      const res1 = await getUsers(this.obj)
      // console.log('用户列表', res1)
      this.userList = res1.data.data.users
      this.total = res1.data.data.total
      // console.log(this.userList)
      // console.log(this.total)
    },
    // 删除用户
    del (id) {
      this.$confirm('确定要删除这一行吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delRole(id)
        // 如果删除当前这一页的最后一个数据，导致数据长度为0  就应该跑到前一页 并且在页数大于1的时候
        if (this.userList.length === 0 && this.obj.pagenum > 1) {
          this.obj.pagenum--
        }
        this.getUsers()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 更新用户状态
    async userStateChange (userInfo) {
      // console.log(userInfo)
      const res = await userState(userInfo.id, userInfo.mg_state)
      // console.log(res)
      if (res.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('设置状态失败')
      }
      this.$message.success('设置状态成功')
      this.getUsers()
    },
    // 表单校验规则
    onClick () {
      this.$refs.myForm.validate(async bool => {
        // console.log(bool)
        if (!bool) return this.$message.error('表单数据非法')
        // console.log('发送ajax')
        // 添加数据
        if (this.isEdit) {
          // 编辑用户的添加
          const res3 = await editRole(this.form)
          if (res3.status !== 200) {
            this.$message.error('编辑用户失败')
          } else {
            this.$message.success('编辑用户成功')
          }
        } else {
          // 新用户的添加
          const res2 = await addRole(this.form)
          if (res2.status !== 200) {
            this.$message.error('新增用户失败')
          } else {
            this.$message.success('新增用户成功')
          }
        }
        // 刷新列表
        this.getUsers()
        // 关闭对话框
        this.addDialogVisible = false
      })
    },
    // 对话框关闭 重置表单
    reset () {
      // 表单重置
      this.$refs.myForm.resetFields()
    },
    // 编辑 显示已有数据到表单
    showRoleDialog (row) {
      this.isEdit = true
      this.addDialogVisible = true
      this.form = { ...row }
    },
    // 分配用户角色
    async roolRoleShow (userInfo) {
      this.userInfo = userInfo
      console.log(userInfo)
      // console.log(this.userInfo)
      // 在展示对话框时前 就获取所有角色列表
      const res4 = await getRoleList()
      // console.log(res4)
      this.roleList = res4.data.data
      // console.log(this.roleList)
      // 显示对话框
      this.setRoleDialogVisible = true
    },
    // 提交更改的角色
    async saveRoleIndo () {
      if (!this.selectedRoleId) return this.$message.error('未选择要分配的角色')
      const res5 = await roolRole(this.userInfo.id, { rid: this.selectedRoleId })
      // console.log('555', res5)
      if (res5.status !== 200) return this.$message.error('更新用户角色失败')
      this.$message.success('更新用户角色成功')
      this.getUsers()
      this.setRoleDialogVisible = false
    },
    // 监听对话框的关闭事件
    setRoleDialogClosed () {
      this.selectedRoleId = ''
      this.userInfo = {}
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
