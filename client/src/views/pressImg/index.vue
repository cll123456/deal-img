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
            :file-type="`image/jpeg,image/jpg,image/png`"
            :is-multiple="false"/>
      </p>
    </div>
    <div class="dlg-pressImg--remark">
      <p>备注1：请上传jpg,jpeg,或者png的图片，图片大小在100MB之内</p>
      <p>备注2：压缩完后请尽快下载，30min后图片自动删除.&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</p>
    </div>

    <!--   上传压缩的图片列表-->
    <section class="dlg-pressImg--list" v-if="imgList.length > 0">
      <el-row v-for="img in imgList">
        <el-col :span="8">
          <div class="img-title" :title="img.fileName">{{ img.fileName }}</div>
          <div class="img-size">{{ img.fileOriSize }}</div>
        </el-col>
        <el-col :span="8">
          <my-process
              :brd-rs="10"
              :pcs-height="20"
              :show-txt="img.hasTxt"
              :txt="img.processTxt"
              :process-dept="img.process"
              :bg-color="img.bgColor"
              :show-striped="img.hasStriped"
              :show-act="img.hasActive"/>
        </el-col>
        <el-col :span="8">
          <div class="img-size"> {{ img.pressFileSize }}</div>
          <div class="img-download">
            <el-link type="info" :href="`/api/download?filePath=${img.url}&fileName=${img.fileName}`">
              {{ img.hasShowDownload ? '下载压缩图' : '' }}
            </el-link>
          </div>
          <div class="img-reduce--size"> {{ img.reduce }}</div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import FileUpload from "../../components/busCom/fileUpload/FileUpload.vue";
import MyProcess from "../../components/busCom/myProcess/myProcess.vue";
import {imgPress} from "../composition/imgPress.js";
import {imgStandard, sureUpload} from "../../../util/fileUtils.js";


export default {
  name: "index",
  components: {MyProcess, FileUpload},
  setup() {
    const router = useRouter();
    // 是否加载文件上传
    const hasChooseFileLoadingRef = ref(false);
    // 导出文件图片上传列表，里面维护一个一个的图片对象
    const imgListRef = ref([]);
    // 文件上传的业务逻辑
    const fileUpload = async (files) => {
      if (!imgStandard(files)) return;
      hasChooseFileLoadingRef.value = true;
      try {
        await imgPress(files, hasChooseFileLoadingRef, imgListRef);
      } catch (e) {
        hasChooseFileLoadingRef.value = false;
      }
    }

    return {
      sureUpload: (id) => sureUpload(id),
      pressFileUpload: fileUpload,
      hasChooseFileLoading: hasChooseFileLoadingRef,
      imgList: imgListRef,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/utils.scss";
@import "style/common.scss";

.dlg-pressImg {
  @include exclude-header-style;

  &--container {
    @include img-upd-style;


    h1 {
      @include img-title-style;
    }
  }

  &--remark {
    font-size: 12px;
    text-align: center;

    p {
      margin: 5px auto;
      color: #f40;
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

        .img-title {
          max-width: 200px;
          @include one-dot();
        }

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
