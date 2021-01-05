<template>
  <el-menu
      :default-active="activeIndex"
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="#e9ecf6"
      active-text-color="#2b42a9">
    <el-menu-item index="/home">图片加水印</el-menu-item>
    <el-menu-item index="/pressImg">图片压缩</el-menu-item>
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
  name: "MyMenu",
  setup() {
    return {
      activeIndex: '/' + window.location.href.split('/').pop(),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
