<template>
  <div class="tab-icon-wrapper">
    <div
      v-for="item of icons"
      :key="item"
      @click="handleClipboard(generateIconCode(item),$event)"
    >
      <el-tooltip placement="top">
        <div slot="content">
          {{ generateIconCode(item) }}
        </div>
        <div class="icon-item">
          <i :class="item" />
          <span>{{ item }}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard';
import icons from './require-icons';

export default {
  name: 'ElementUi',
  data() {
    return {
      icons: icons,
    };
  },
  methods: {
    generateIconCode(symbol) {
      return `<i class="${symbol}"></i>`;
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
  grid-template-columns: 25% 25% 25% 25%;
  justify-items: stretch;
  justify-content: space-around;
  grid-template-columns: repeat(6, 4fr);

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
    margin-top: 10px;
    font-size: 12px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
