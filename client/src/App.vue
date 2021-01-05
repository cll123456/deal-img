<template>
  <div class="tld-header">
    <img src="/img/logo/logo.png"/>
    <my-menu/>
  </div>
  <router-view/>
</template>

<script>
import myMenu from "./components/layout/myMenu/MyMenu.vue";

export default {
  name: 'App',
  components: {
    myMenu: myMenu
  }
}
</script>

<style lang="scss" scoped>
.tld-header {
  background-color: $dlg-header--bgColor;
  display: flex;
  width: 100%;
  height: 60px;

  img {
    height: 59px;
    width: auto;
    padding-left: 100px;
    border-bottom: 1px solid $dlg-subLine--color;
    cursor: pointer;
  }

  .el-menu {
    flex-grow: 1;
  }
}
</style>
