<template>
  <div class="dlg-home">
    <div class="dlg-home--container">
      <h1>在线图片加水印、加水印文字制作</h1>
      <p>
        <el-button type="primary" @click="sureUpload(`homeFileUpd`)" :loading="hasChooseFileLoading">
          <i class="el-icon-upload el-icon--left"></i> 上传加水印的图片
        </el-button>
        <file-upload
            :file-id="`homeFileUpd`"
            @handFile="homeFileUpload"
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

export default {
  name: "home",
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
    const homeFileUpload = (files) => {
      console.log(files, '----')
    }

    return {
      sureUpload,
      homeFileUpload,
      hasChooseFileLoading: hasChooseFileLoadingRef,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/utils.scss";

.dlg-home {
  @include exclude-header-style;

  &--container {
    @include img-upd-style;


    h1 {
      @include img-title-style;
    }
  }
}

</style>
