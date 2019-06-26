<template>
  <div class="tab-icon-wrapper">
    <div
      v-for="item of iconsMap"
      :key="item"
      @click="handleClipboard(generateIconCode(item),$event)"
    >
      <el-tooltip placement="top">
        <div slot="content">
          {{ generateIconCode(item) }}
        </div>
        <div class="icon-item">
          <svg-icon :icon-class="item" class-name="disabled" />
          <span>{{ item }}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import icons from './require-icons';
import clipboard from '@/utils/clipboard';

export default {
  name: 'IconFont',
  data() {
    return {
      iconsMap: icons,
    };
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`;
    },
    handleClipboard(text, event) {
      clipboard(text, event);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tab-icon-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 4fr);
  justify-items: stretch;
  justify-content: space-around;
  grid-auto-flow: row;

  .icon-item {
    margin: 20px;
    height: 110px;
    text-align: center;
    width: 110px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 24px;
    margin-top: 10px;
  }
  .disabled {
    pointer-events: none;
  }
}
</style>
