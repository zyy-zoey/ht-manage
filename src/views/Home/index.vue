<template>
  <div>
    <el-container class="container">
      <el-header>
        <div class="left-logo">
          <img
            src="http://liufusong.top/hm-admin/img/heima.b5a855ee.png"
            alt=""
            style="width: 61px; height: 56px"
          />
          <span>biubiubiu后台管理系统</span>
        </div>
        <el-row>
          <el-button>退出</el-button>
        </el-row>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <el-radio-group v-model="isCollapse">
            <button
              @click="isCollapse = !isCollapse"
              :class="isCollapse ? 'short' : 'long'"
            >
              | | |
            </button>
          </el-radio-group>
          <el-menu
            background-color="#373d41"
            text-color="#fff"
            unique-opened
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-logo {
      display: flex;
      align-items: center;
      span {
        color: #fff;
        font-size: 22px;
        margin-left: 10px;
      }
    }
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu {
  border-right: none;
}
.long {
  width: 200px;
  height: 40px;
  border: none;
  background-color: #ff69b4;
  color: #fff;
  font-size: 18px;
}
.short {
  width: 64px;
  height: 40px;
  border: none;
  background-color: #ff69b4;
  color: #fff;
  font-size: 18px;
}
</style>
