<template>
  <div class="dlg-logoQrcode">
    <div class="dlg-logoQrcode--container dlg-width">
      <h1>在线生成花里胡哨二维码</h1>
      <p>
        <el-row :gutter="30">
          <el-col :span="16">
            <el-card shadow="always">
              <el-tabs v-model="activeName" @tab-click="changeTab">
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
                      <el-radio-group v-model="form.shape" @change="changeQrcode">
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
                <el-tab-pane label="logo添加文字" name="text">
                  <el-form label-width="120px">
                    <el-form-item label="logo文本内容">
                      <el-input
                          v-model="form.logoText"
                          placeholder="请输入二维码中间要展示的文字"
                          clearable
                          @input="changeQrcode"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="文本大小">
                      <el-slider
                          v-model="form.logoTextSize"
                          :min="10"
                          :max="100"
                          @change="changeQrcode"
                          show-input
                      ></el-slider>
                    </el-form-item>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item label="文本字体">
                          <el-select size="small"
                                     v-model="form.logoTextFam"
                                     @change="changeQrcode"
                                     placeholder="请选择">
                            <el-option
                                v-for="item in fontFamilyOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="文本颜色">
                          <el-color-picker
                              v-model="form.logoTextColor"
                              color-format="hex"
                              @change="changeQrcode"
                          ></el-color-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="注意文字样式">
                      <el-input
                          type="textarea"
                          :rows="3"
                          readonly
                          resize="none"
                          value="logo是文字和图片二选一的。二维码的容错率尽量使用最高，二维码的文本大小是根据二维码的排布进行自动规划，如果存在剩余空间，按设置的最大进行排放。">
                      </el-input>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="logo添加图片" name="img">
                  <el-form label-width="120px">
                    <el-form-item label="上传logo">
                      <el-button v-if="!!!imgSrc"
                                 type="primary"
                                 @click="sureUpload(`logoImg`)"
                                 size="small">上传
                        <i class="el-icon-upload el-icon--right"></i></el-button>
                      <img v-show="!!imgSrc"
                           id="logoImges"
                           :src="imgSrc" alt="logo"
                           :height="form.logoImgSize"
                           :width="form.logoImgSize"
                           :style="{
                             display: 'inline-block',
                              verticalAlign: 'middle',
                              marginRight: '5px'
                           }"
                      >
                      <el-button size="mini" type="danger" v-show="!!imgSrc" class="el-icon-circle-close deleteImg"
                                 title="删除图片"
                                 @click="deleteImg">
                        删除图片
                      </el-button>
                      <file-upload
                          :file-id="`logoImg`"
                          @handFile="handleLogoFile"
                          :file-type="`image/jpeg,image/jpg,image/png`"
                          :is-multiple="false"
                      />
                    </el-form-item>
                    <el-form-item label="图片大小">
                      <el-slider
                          v-model="form.logoImgSize"
                          :min="30"
                          :max="100"
                          @change="changeQrcode"
                          show-input
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="注意上传">
                      <el-input
                          type="textarea"
                          :rows="4"
                          readonly
                          resize="none"
                          value="logo图片请上传png或者jpg的图片，后台会自动压缩图片的大小。logo是文字和图片二选一的。二维码的容错率尽量使用最高，二维码的图片大小是根据二维码的排布进行自动规划，如果存在剩余空间，按设置的最大进行排放。生成后请尽快下载，后台30min内会自动删除图片。">
                      </el-input>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always">
              <div class="logoQrcode-container dlg-center">
                <div id="logoQrcode"></div>
              </div>
              <div class="btn dlg-center">
                <el-button type="primary" @click="downloadLogoQrcode"> 下载二维码</el-button>
                <el-button @click="resetLogoQrCode">
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
import {logoQrCodeBaseJson, levelOptions, fontFamilyOptions} from "./qrcodeConfig.js";
import {cloneValue} from "../../../util/objUtil.js";
import {generateQRCode} from "../composition/logoQrCode.js";
import {downloadQrcode, getImgUrl, imgStandard, sureUpload, uploadFileAndPress} from "../../../util/fileUtils.js";
import FileUpload from "../../components/busCom/fileUpload/FileUpload.vue";
import {tip} from "../../../util/messageUtils.js";

export default {
  name: "logoQrCode",
  components: {FileUpload},
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
    // 重置数据
    const resetLogoQrCode = () => {
      formRef.value = cloneValue(logoQrCodeBaseJson);
      changeQrcode();
    };
    // logo的
    const imgSrcRef = ref('');
    // 上传文件
    const handleLogoFile = async (files) => {
      if (!imgStandard(files)) return;
      try {
        const res = await uploadFileAndPress(files);
        imgSrcRef.value = getImgUrl(res);
        // 赋值logoimg
        formRef.value.logoImg = document.getElementById('logoImges');
        // 生成二维码
        const timer = setTimeout(() => {
          changeQrcode();
          clearTimeout(timer);
        }, 2000)
      } catch (e) {
      }
    }
    // 改变tab
    const changeTab = (e) => {
      if (activeNameRef.value === 'text') {
        tip('warning','二维码logo的图片将会被清空！');
        formRef.value.logoImg = '';
        imgSrcRef.value = null;
        formRef.value.logoText = 'QRCODE';
      } else if (activeNameRef.value === 'img') {
        tip('warning','二维码logo的文字将会被清空!');
        formRef.value.logoText = '';
      }
      changeQrcode();
    }
    // 删除图片
    const deleteImg = () => {
      formRef.value.logoImg = '';
      imgSrcRef.value = null;
      changeQrcode()
    }
    return {
      activeName: activeNameRef,
      form: formRef,
      levelOptions,
      fontFamilyOptions,
      changeQrcode,
      chooseColor,
      downloadLogoQrcode: () => downloadQrcode('.logoQrcode-container'),
      sureUpload: (id) => sureUpload(id),
      resetLogoQrCode,
      imgSrc: imgSrcRef,
      handleLogoFile,
      changeTab,
      deleteImg,
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

    .deleteImg {

    }
  }
}
</style>
