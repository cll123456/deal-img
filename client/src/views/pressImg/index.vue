<template>
  <div class="dlg-pressImg">
    <div class="dlg-pressImg--container">
      <h1>在线图片压缩、减少图片大小</h1>
      <p>
        <el-button type="primary" @click="sureUpload(`pressImg`)" :loading="hasChooseFileLoading">
          <i class="el-icon-upload el-icon--left"></i> 上传压缩的图片
        </el-button>
        <file-upload
            :file-id="`pressImg`"
            @handFile="pressFileUpload"
            :file-type="`image/jpeg,image/jpg,image/png,image/svg`"
            :is-multiple="false"/>
      </p>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import FileUpload from "../../components/busCom/fileUpload/FileUpload.vue";
import {uploadFile} from "../../api/fileApi.js";

export default {
  name: "index",
  components: {FileUpload},
  setup() {
    const router = useRouter();
    // 是否加载文件上传
    const hasChooseFileLoadingRef = ref(false);

    // 点击选择文件
    const sureUpload = (id) => {
      document.querySelector(`#${id}`).click();
      hasChooseFileLoadingRef.value = true;
    }
    // 文件上传的业务逻辑
    const fileUpload = async (files) => {
      const formData = new FormData();
      formData.append('img', files[0]);
      const fileRe = await uploadFile(formData);
      console.log(fileRe, '------')
      hasChooseFileLoadingRef.value = false;
    }

    return {
      sureUpload,
      pressFileUpload: fileUpload,
      hasChooseFileLoading: hasChooseFileLoadingRef,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/utils.scss";

.dlg-pressImg {
  @include exclude-header-style;

  &--container {
    @include img-upd-style;


    h1 {
      @include img-title-style;
    }
  }
}
</style>
