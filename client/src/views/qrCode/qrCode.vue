<template>
  <div class="dlg-qrcode">
    <div class="dlg-qrcode--container">
      <h1>在线生成二维码</h1>
      <p>
        <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            placeholder="请输入二维码里面包含的内容"
            v-model="txt">
        </el-input>
      </p>
    </div>

  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: "detail",
  setup() {
    // 连接的地址，或者文件
    const txtRef = ref('');
    return {
      txt: txtRef
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/utils.scss";
@import "style/common.scss";

.dlg-qrcode {
  @include exclude-header-style;

  &--container {
    @include img-upd-style;


    h1 {
      @include img-title-style;
    }

    p{
      min-width: 500px;
    }
  }

}
</style>
