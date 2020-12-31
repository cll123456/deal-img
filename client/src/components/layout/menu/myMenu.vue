<template>
  <el-menu
      :default-active="activeIndex"
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item index="/home">图片加水印</el-menu-item>
    <el-menu-item index="/expressImg">图片压缩</el-menu-item>
    <el-submenu index="">
      <template #title>生成二维码</template>
      <el-menu-item index="qrcode">普通二维码</el-menu-item>
      <el-menu-item index="logoQrCode">带logo二维码</el-menu-item>
    </el-submenu>
    <el-menu-item><a href="https://www.ele.me" target="_blank">更多</a></el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "menu",
  setup() {
    return {
      activeIndex: '/home'
    }
  }
}
</script>

<style scoped>

</style>
