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
    <el-submenu index="/qrcode">
      <template #title>生成二维码</template>
      <el-menu-item index="/qrcode">普通二维码</el-menu-item>
      <el-menu-item index="/logoQrCode">带logo二维码</el-menu-item>
    </el-submenu>
    <el-submenu index="">
      <template #title>更多</template>
      <el-menu-item index="/">敬请期待</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>


export default {
  name: "MyMenu",
  setup() {
    const curRout = '/' + window.location.href.split('/').pop();
    return {
      activeIndex: curRout === '/' ? '/home' : curRout,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
