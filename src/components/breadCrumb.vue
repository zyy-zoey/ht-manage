<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 预设一个首面包屑 -->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <!-- 循环遍历面包屑列表 -->
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, index) in breadList"
        :key="index"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      breadList: []
    }
  },
  methods: {
    getBreadcrumb () {
      // console.log(this.$route.matched) // 联系上下文
      if (Object.keys(this.$route.matched[0].meta).length > 0) {
        this.breadList = this.$route.matched
      } else {
        this.breadList = []
      }
    }
  },
  computed: {},
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
