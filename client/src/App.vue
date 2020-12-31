<template>
  <div class="tld-header">
    <el-image src="./public/img/logo/logo.png"/>
    <my-menu/>
  </div>
  <router-view/>
</template>

<script>
import myMenu from "./components/layout/menu/myMenu.vue";

export default {
  name: 'App',
  components: {
    myMenu
  }
}
</script>
