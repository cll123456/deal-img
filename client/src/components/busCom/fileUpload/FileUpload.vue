<template>
  <input
      :id="fileId"
      type="file"
      @change="$emit('handFile', {files: $event.target.files, event: $event})"
      :accept="fileType"
      :multiple="isMultiple"
      v-show="false"/>
</template>

<script>
export default {
  name: "FileUpload",
  props: {
    fileId: String, // 传入的文件id
    fileType: String, // 接收的文件类型
    // 是否接收多个文件
    isMultiple: {
      default: false,
      type: Boolean
    }
  },
  emits:['handFile']
}
</script>

<style scoped>

</style>
