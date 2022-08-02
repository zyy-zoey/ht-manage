<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="roleManageList" border stripe>
        <el-table-column type="expand" label="#">
          <template slot-scope="scope">
            <el-row
              id="firstRow"
              :class="['bdbottom', index === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item, index) in scope.row.children"
              :key="item.id"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag>{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限 与 三级权限 -->
              <el-col :span="19">
                <!-- 二级权限 -->
                <el-row
                  :class="[index1 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item1, index1) in item.children"
                  :key="item1.id"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{ item1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="item2 in item1.children"
                      :key="item2.id"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" :index="indexMethod">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="roleTreeList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList } from '@/api/users'
import { delRoleRight, getRoleTree, postRightRole } from '@/api/roles'
export default {
  created () {
    this.getRoleList()
  },
  data () {
    return {
      roleManageList: [],
      setRightDialogVisible: false,
      // 树状结构的列表
      roleTreeList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点id数组
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: ''
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    async getRoleList () {
      const res = await getRoleList()
      // console.log(res)
      this.roleManageList = res.data.data
    },
    // 根据id删除对应权限
    async removeRightById (role, rightId) {
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除')
      }
      const res1 = await delRoleRight(role, rightId)
      // console.log(res1)
      if (res1.status !== 200) {
        return this.$message.error('删除权限失败！')
      }
      this.$message.success('删除权限成功')
      // 重新获取列表，会在删除成功后关闭展开框，
      // this.getRoleList()
      // 所以，重新赋值即可
      role.children = res1.data.data
    },
    // 树形结构
    async showSetRightDialog (role) {
      this.roleId = role.id
      // console.log('role', this.roleId)
      // 在对话框展开前获取所有权限的数据
      const res2 = await getRoleTree()
      // console.log('tree', res2)
      if (res2.status !== 200) {
        return this.$message.error('获取权限失败！')
      }
      this.roleTreeList = res2.data.data

      // 递归获取三级节点的id
      this.getLeafKeys(role, this.defKeys)
      // 展开对话框
      this.setRightDialogVisible = true
    },
    // 通过递归，获取角色下所有三级权限的id,并保存到 defKeys 数组中
    // node 当前需要判断的对象的节点，要保存到的数组
    getLeafKeys (node, arr) {
      // 判断当前节点是否是三级权限节点 判断条件：是否包含children属性，包含了就不是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      // 通过递归
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭时间
    setRightDialogClosed () {
      // 权限置空
      this.defKeys = []
    },
    // 权限授权
    async allotRights () {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // console.log('keys', keys)
      const idStr = keys.join(',')
      const res3 = await postRightRole(this.roleId, { rids: idStr })
      // console.log(res3)
      if (res3.status !== 200) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      this.getRoleList()
      this.setRightDialogVisible = false
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
}
.el-table {
  margin: 20px 0;
  font-size: 12px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
#firstRow {
  margin: 20px 50px;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
