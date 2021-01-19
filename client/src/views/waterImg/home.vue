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
            :file-type="`image/jpeg,image/jpg,image/png`"
            :is-multiple="false"/>
      </p>
    </div>
    <div class="dlg-home--imgList dlg-width">
      <el-card shadow="always">
        <el-form ref="imgForm" :model="form" label-width="120px" inline>
          <el-form-item label="水印文本内容">
            <el-input v-model="form.txtCont"
                      placeholder="请输入水印文字的内容"
                      @input="getTextWaterImg"
                      size="small"
                      clearable/>
          </el-form-item>
          <el-form-item label="全图水印">
            <el-select v-model="form.textFullImg" @change="getTextWaterImg" size="small">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文本字体">
            <el-select size="small"
                       @change="getTextWaterImg"
                       v-model="form.textFam"
                       placeholder="请选择">
              <el-option
                  v-for="item in fontFamilyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文本大小">
            <el-slider
                v-model="form.txtSize"
                :min="10"
                :max="150"
                show-input
                @change="getTextWaterImg"
            ></el-slider>
          </el-form-item>
          <el-form-item label="文本旋转角度">
            <el-slider
                @change="getTextWaterImg"
                v-model="form.txtAngle"
                :min="-45"
                :max="45"
                show-input
            ></el-slider>
          </el-form-item>
          <el-form-item label="文本颜色">
            <el-color-picker
                @change="getTextWaterImg"
                v-model="form.textColor"
                show-alpha
                :predefine="predefineColors"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="水平方向的距离">
            <el-slider
                v-model="form.horTxtMargin"
                :min="10"
                :max="form.maxHorMargin"
                show-input
                @change="getTextWaterImg"
            ></el-slider>
          </el-form-item>
          <el-form-item label="垂直方向的距离">
            <el-slider
                v-model="form.verTxtMargin"
                :min="10"
                :max="form.maxVerMargin"
                show-input
                @change="getTextWaterImg"
            ></el-slider>
          </el-form-item>
          <el-form-item label="操作">
            <el-button type="primary" @click="downloadImg" size="small"> 下载图片</el-button>
            <el-button @click="resetImg" size="small">
              重置图片
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div>
      <div class="img-container dlg-center">
        <div id="imgCanvas" class="imgCanvas"></div>
      </div>
    </div>
    <div class="dlg-home--remark">
      <p>备注1：请上传jpg,jpeg,或者png的图片，图片大小在100MB之内</p>
      <p>备注2：图片会调用后台自动进行压缩，防止图片过大.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</p>
      <p>备注3：完成水印后请尽快下载，30min后原图片自动删除.&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</p>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import FileUpload from "../../components/busCom/fileUpload/FileUpload.vue";
import {downloadQrcode, getImgUrl, imgStandard, uploadFileAndPress} from "../../../util/fileUtils.js";
import {cloneValue} from "../../../util/objUtil.js";
import {textWaterImg, predefineColors} from "./imgConfig.js";
import {fontFamilyOptions} from "../qrCode/qrcodeConfig.js";
import {tip} from "../../../util/messageUtils.js";
import {waterTextImg} from "../composition/imgTextWater.js";

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
    // 是否上传了文件,默认没有上传文件，兼容el-slider的change初始化调用问题
    let hasUpload = false;
    // 文件上传的业务逻辑
    const homeFileUpload = async (files) => {
      if (!imgStandard(files)) return;
      hasChooseFileLoadingRef.value = true;
      try {
        // 先进行上传压缩文件操作，拿到文件的地址
        const res = await uploadFileAndPress(files);
        formRef.value.textImgSrc = getImgUrl(res);
        hasChooseFileLoadingRef.value = false;
        getTextWaterImg();
        hasUpload = true;
      } catch (e) {
        hasChooseFileLoadingRef.value = false;
      }
    }

    // 获取水印图片
    const getTextWaterImg = () => {
      if (hasUpload && !formRef.value.textImgSrc) {
        tip('warning', '请先上传图片，在调节文字的选项！');
        return
      }
      waterTextImg(formRef, 'imgCanvas');
    }
    /**
     * 重置图片
     */
    const resetImg = () => {
      formRef.value = ref(cloneValue(textWaterImg));
      getTextWaterImg();
    }

    const formRef = ref(cloneValue(textWaterImg));
    return {
      sureUpload,
      homeFileUpload,
      hasChooseFileLoading: hasChooseFileLoadingRef,
      downloadImg: () => downloadQrcode('.imgCanvas', '水印图片'),
      resetImg,
      getTextWaterImg,
      form: formRef,
      predefineColors,
      fontFamilyOptions,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/utils.scss";
@import "style/page.scss";

.dlg-home {
  @include exclude-header-style;


  &--container {
    @include img-upd-style;


    h1 {
      @include img-title-style;
    }
  }

  &--imgList {
    padding-bottom: 60px;

    .el-slider {
      width: 250px;
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
}

</style>
