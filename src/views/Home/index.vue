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
          <el-button @click="deltoken">退出</el-button>
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
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="this.$route.path"
          >
            <el-submenu
              :index="item.path"
              v-for="item in firstList"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{ item.authName }}</span>
              </template>
              <el-menu-item
                :index="item1.path"
                v-for="item1 in item.children"
                :key="item1.id"
                ><i>{{ item1.authName }}</i></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <breadCrumb></breadCrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenus } from '@/api/home'
import breadCrumb from '@/components/breadCrumb.vue'
export default {
  async created () {
    try {
      const res = await getMenus()
      console.log('home res', res)
      this.firstList = res.data.data
      console.log(this.firstList)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      isCollapse: false,
      firstList: ''
    }
  },
  methods: {
    deltoken () {
      this.$store.commit('setToken', '')
      this.$router.back()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { breadCrumb }
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
