<template>
  <div class="dlg-qrcode">
    <div class="dlg-qrcode--container dlg-width">
      <h1>在线生成二维码</h1>
      <p>
        <el-row :gutter="30">
          <el-col :span="16">
            <el-card shadow="always">
              <!-- 生成二维码的表单 -->
              <el-form ref="qrcodeForm" :model="form" label-width="120px">
                <el-form-item label="二维码的文本">
                  <el-input
                      v-model="form.text"
                      placeholder="请输入二维码里面的内容"
                      clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="二维码的大小">
                  <el-slider
                      v-model="form.size"
                      :min="100"
                      :max="250"
                      show-input
                  ></el-slider>
                </el-form-item>
                <el-form-item label="二维码的边框">
                  <el-input-number
                      v-model="form.margin"
                      controls-position="right"
                      :min="0"
                      :max="100"
                      :step="1"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="二维码的主色">
                  <el-color-picker
                      v-model="form.mainColor"
                      color-format="hex"
                  ></el-color-picker>
                </el-form-item>
                <el-form-item label="二维码的辅色">
                  <el-color-picker
                      v-model="form.subColor"
                      color-format="hex"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always">
              <div class="qrcode-container dlg-center">
                <qrcode-vue
                    :value="form.text"
                    :size="form.size"
                    level="H"
                    :margin="form.margin"
                    :background="form.subColor"
                    :foreground="form.mainColor"
                ></qrcode-vue>
              </div>
              <div class="btn dlg-center">
                <el-button type="primary" @click="downloadQrcode"> 下载二维码</el-button>
                <el-button @click="resetQrCode">
                  重置二维码
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </p>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import QrcodeVue from "qrcode.vue";
import {qrcodeJson} from "./qrcodeConfig.js";
import {cloneValue} from "../../../util/objUtil.js";
import {downloadImgByLinkA} from "../../../util/fileUtils.js";

export default {
  name: "qrCode",
  components: {
    QrcodeVue,
  },
  setup(props, ctx) {

    // 二维码的表单
    const formRef = ref(cloneValue(qrcodeJson));
    // 重置数据
    const resetQrCode = () => {
      formRef.value = cloneValue(qrcodeJson);
    };
    // 下载二维码
    const downloadQrcode = () => {
      const caDom = document.querySelector('.qrcode-container').querySelector('canvas')
      const imgSrc = caDom.toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
      downloadImgByLinkA(imgSrc, '二维码图片');

    }
    return {
      form: formRef,
      resetQrCode,
      downloadQrcode
    };
  },
};
</script>

<style lang="scss" scoped>
@import "style/utils.scss";
@import "style/common.scss";
@import "style/page.scss";

.dlg-qrcode {
  @include exclude-header-style;

  &--container {
    @include img-upd-style($pad: 50px 0, $ht: 250px);

    h1 {
      @include img-title-style;
    }

    p {
      width: 100%;

      .el-row {
        height: 100%;

        .el-form-item {
          margin-bottom: 17px;
        }

        .qrcode-container {
          height: 272px;
        }
      }
    }
  }
}
</style>
