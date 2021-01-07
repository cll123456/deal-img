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
    <!--   上传压缩的图片列表-->
    <section class="dlg-pressImg--list">
      <el-row>
        <el-col :span="8">
          <div class="img-title">微信图片.jpg</div>
          <div class="img-size">22.0MB</div>
        </el-col>
        <el-col :span="8">
          <my-process
              :brd-rs="10"
              :pcs-height="20"
              process-dept="100"
              bg-color="#409eff"
              :show-striped="true"
              :show-act="true"/>
        </el-col>
        <el-col :span="8">
          <div class="img-size">22KB</div>
          <div class="img-download">
            <el-link type="info">下载压缩图</el-link>
          </div>
          <div class="img-reduce--size">-80%</div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import FileUpload from "../../components/busCom/fileUpload/FileUpload.vue";
import {pressImg, uploadFile} from "../../api/fileApi.js";
import MyProcess from "../../components/busCom/myProcess/myProcess.vue";

export default {
  name: "index",
  components: {MyProcess, FileUpload},
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
      formData.append('img', files.files[0]);
      const fileRe = await uploadFile(formData);
      const updUrl = fileRe.data.url;
      const pressRe = await pressImg(updUrl);
      console.log(pressRe)
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

  &--list {
    padding: 12px;
    border: 1px solid #bbcbd0;
    border-radius: 2px;
    background-color: #fff;
    max-width: 960px;
    margin: 0 auto;

    .el-row {
      margin: 4px;
      padding: 0 12.8px;
      background: #f0f0f0;
      border: 1px solid #cfdbde;
      border-radius: 2px;
      font-weight: bold;
      display: flex;
      align-items: center;
      height: 30px;
      color: #363a43;
      font-size: 14px;
      cursor: pointer;

      > .el-col:nth-child(1),
      > .el-col:nth-child(3) {
        display: flex;
        justify-content: space-between;

        .img-size {
          font-weight: normal;
          color: #67C23A;
          padding: 0 20px;
        }
      }
    }
  }
}
</style>
