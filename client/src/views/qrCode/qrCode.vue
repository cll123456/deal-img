<template>
  <div class="dlg-qrcode">
    <div class="dlg-qrcode--container dlg-width">
      <h1>在线生成二维码</h1>
      <p>
        <el-row :gutter="30">
          <el-col :span="16">
            <el-card shadow="always">
              <el-form label-width="120px">
                <el-form-item label="二维码的文本">
                  <el-input v-model="form.text"></el-input>
                </el-form-item>
                <el-form-item label="二维码的大小">
                  <el-slider
                      v-model="form.size"
                      :min="100"
                      :max="150"
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
              <div>
                <qrcode-vue value="1" :size="form.size" level="H"></qrcode-vue>
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

export default {
  name: "qrCode",
  components: {
    QrcodeVue,
  },
  setup() {
    const formRef = ref({
      text: '',
      margin: 0,
      size: 100,
      mainColor: '#000',
      subColor: '#fff'
    });
    return {
      form: formRef,
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
      height: 220px;

      .el-row {
        height: 100%;
      }
    }
  }
}
</style>
