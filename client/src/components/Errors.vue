<template>
  <div class="dlg-center dlg-error--container">
    <h3>
      <slot></slot>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'Errors'
};
</script>

<style lang="scss" scoped>
@import "style/page.scss";

.dlg-error--container {
  height: calc(100vh - 60px);
  width: 100vw;

  h3 {
    color: #f40;
  }
}

</style>
