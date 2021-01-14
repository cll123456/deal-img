<template>
  <div class="dlg-logoQrcode">
    <div class="dlg-logoQrcode--container dlg-width">
      <h1>在线生成花里胡哨二维码</h1>
      <p>
        <el-row :gutter="30">
          <el-col :span="16">
            <el-card shadow="always">
              <el-tabs v-model="activeName">
                <el-tab-pane label="基础选项" name="base">
                  <!-- 生成二维码的表单 -->
                  <el-form ref="logoQrcodeForm" label-width="120px">
                    <el-form-item label="二维码的文本">
                      <el-input
                          v-model="form.text"
                          placeholder="请输入二维码里面的内容"
                          clearable
                          @input="changeQrcode"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="二维码的大小">
                      <el-slider
                          v-model="form.size"
                          :min="100"
                          :max="250"
                          show-input
                          @change="changeQrcode"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="二维码的边框">
                      <el-input-number
                          v-model="form.margin"
                          controls-position="right"
                          :min="0"
                          :max="100"
                          :step="1"
                          @change="changeQrcode"
                      ></el-input-number>
                    </el-form-item>
                    <el-form-item label="容错等级">
                      <el-select v-model="form.level" placeholder="请选择" @change="changeQrcode">
                        <el-option
                            v-for="item in levelOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="注意容错等级">
                      <el-input
                          type="textarea"
                          :rows="2"
                          readonly
                          resize="none"
                          value="容错等级越大，二维码越容易扫描，如果中间添加了logo,请选中容错等级最大的选项，方便二维码的识别">
                      </el-input>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="色彩选项" name="color">
                  <el-form label-width="120px">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item label="二维码点色">
                          <el-color-picker
                              v-model="form.dotColor"
                              color-format="hex"
                              @change="changeQrcode"
                          ></el-color-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="二维码背景色">
                          <el-color-picker
                              v-model="form.bgColor"
                              color-format="hex"
                              @change="changeQrcode"
                          ></el-color-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item label="定位器的外方色">
                          <el-color-picker
                              @change="changeQrcode"
                              v-model="form.posOutColor"
                              color-format="hex"
                          ></el-color-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="定位器的内部色">
                          <el-color-picker
                              @change="changeQrcode"
                              v-model="form.posInnerColor"
                              color-format="hex"
                          ></el-color-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="注意定位器">
                      <el-input
                          type="textarea"
                          :rows="2"
                          readonly
                          resize="none"
                          value="定位器是指二维码的三个4个角的最大的方块的点，作用是定位二维码的方式">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="颜色搭配">
                      <div class="color-examples">
                        <el-button @click="chooseColor('#000','#fff','#000','#000')"
                                   size="small"
                                   type="primary"
                                   plain>
                          经 典
                        </el-button>
                        <el-button @click="chooseColor('#0d86ff','#fff','#ff8080','#0059b3')"
                                   size="small"
                                   type="success"
                                   plain> 搭配一
                        </el-button>
                        <el-button @click="chooseColor('#4169e1','#fff','#cd5c5c','#191970')"
                                   size="small"
                                   type="info"
                                   plain> 搭配二
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="形状选项" name="ship">
                  <el-form label-width="120px">
                    <el-form-item label="码点形状">
                      <el-radio-group v-model="form.shape"  @change="changeQrcode">
                        <el-radio label="none">默认</el-radio>
                        <el-radio label="round">圆角</el-radio>
                        <el-radio label="fusion">熔化</el-radio>
                        <el-radio label="spot">小点点</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="码点形状百分比" v-if="form.shape !== 'none'">
                      <el-slider
                          @change="changeQrcode"
                          :min="0"
                          :max="100"
                          v-model="form.shapePercent"
                          show-input>
                      </el-slider>
                    </el-form-item>
                    <el-form-item label="注意形状选择">
                      <el-input
                          type="textarea"
                          :rows="4"
                          readonly
                          resize="none"
                          value="上面的形状选择，除了默认外，其他的都含有百分比。如果想要使用小点点的样式，请设置背景，方便用于设备的识别。">
                      </el-input>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="logo添加文字" name="text">定时任务补偿</el-tab-pane>
                <el-tab-pane label="logo添加图片" name="img">定时任务补偿</el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always">
              <div class="logoQrcode-container dlg-center">
                <div id="logoQrcode"></div>
              </div>
              <div class="btn dlg-center">
                <el-button type="primary"> 下载二维码</el-button>
                <el-button>
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
import {ref, onMounted} from "vue";
import {logoQrCodeBaseJson, levelOptions} from "./qrcodeConfig.js";
import {cloneValue} from "../../../util/objUtil.js";
import {qrcanvas} from 'qrcanvas';
import {generateQRCode} from "../composition/logoQrCode.js";

export default {
  name: "logoQrCode",
  setup() {
    // 当前的选项
    const activeNameRef = ref('base');
    // form表单
    let formRef = ref(cloneValue(logoQrCodeBaseJson));
    // 改变选项，生成二维码
    const changeQrcode = () => {
      generateQRCode(formRef, 'logoQrcode')
    }
    // 生成二维码
    onMounted(() => {
      changeQrcode()
    })
    // 选择颜色搭配
    const chooseColor = (dotColor, bgColor, posOutColor, posInnerColor) => {
      formRef.value.dotColor = dotColor;
      formRef.value.bgColor = bgColor;
      formRef.value.posOutColor = posOutColor;
      formRef.value.posInnerColor = posInnerColor;
      changeQrcode()
    }

    return {
      activeName: activeNameRef,
      form: formRef,
      levelOptions,
      changeQrcode,
      chooseColor
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/utils.scss";
@import "style/common.scss";
@import "style/page.scss";

.dlg-logoQrcode {
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

        .logoQrcode-container {
          height: 272px;
        }
      }
    }
  }
}
</style>
