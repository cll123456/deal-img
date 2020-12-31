<template>
  <div>
    home
  </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

export default {
  name: "home",
  setup() {
    const router = useRouter();
    const fileValueRef = ref('')
    // 确定修改图片，图片上传
    const changeFile = (e) => {

    }
    const sureUpload = () => {
      router.push('/detail')
    }

    return {
      sureUpload,
      changeFile,
      fileValue: fileValueRef
    }
  }
}
</script>

<style scoped>

</style>
