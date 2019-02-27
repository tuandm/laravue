<template>
  <div class="tab-icon-wrapper">
    <div
      v-for="item of iconsMap"
      :key="item"
      @click="handleClipboard(generateIconCode(item),$event)"
    >
      <el-tooltip placement="top">
        <div slot="content">{{ generateIconCode(item) }}</div>
        <div class="icon-item">
          <i :class="item"></i>
          <span>{{ item }}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard';

const iconList = [
  'el-icon-info',
  'el-icon-error',
  'el-icon-success',
  'el-icon-warning',
  'el-icon-question',
  'el-icon-back',
  'el-icon-arrow-left',
  'el-icon-arrow-down',
  'el-icon-arrow-right',
  'el-icon-arrow-up',
  'el-icon-caret-left',
  'el-icon-caret-bottom',
  'el-icon-caret-top',
  'el-icon-caret-right',
  'el-icon-d-arrow-left',
  'el-icon-d-arrow-right',
  'el-icon-minus',
  'el-icon-plus',
  'el-icon-remove',
  'el-icon-circle-plus',
  'el-icon-remove-outline',
  'el-icon-circle-plus-outline',
  'el-icon-close',
  'el-icon-check',
  'el-icon-circle-close',
  'el-icon-circle-check',
  'el-icon-circle-close-outline',
  'el-icon-circle-check-outline',
  'el-icon-zoom-out',
  'el-icon-zoom-in',
  'el-icon-d-caret',
  'el-icon-sort',
  'el-icon-sort-down',
  'el-icon-sort-up',
  'el-icon-tickets',
  'el-icon-document',
  'el-icon-goods',
  'el-icon-sold-out',
  'el-icon-news',
  'el-icon-message',
  'el-icon-date',
  'el-icon-printer',
  'el-icon-time',
  'el-icon-bell',
  'el-icon-mobile-phone',
  'el-icon-service',
  'el-icon-view',
  'el-icon-menu',
  'el-icon-more',
  'el-icon-more-outline',
  'el-icon-star-on',
  'el-icon-star-off',
  'el-icon-location',
  'el-icon-location-outline',
  'el-icon-phone',
  'el-icon-phone-outline',
  'el-icon-picture',
  'el-icon-picture-outline',
  'el-icon-delete',
  'el-icon-search',
  'el-icon-edit',
  'el-icon-edit-outline',
  'el-icon-rank',
  'el-icon-refresh',
  'el-icon-share',
  'el-icon-setting',
  'el-icon-upload',
  'el-icon-upload2',
  'el-icon-download',
  'el-icon-loading',
];

export default {
  name: 'ElementUi',
  data() {
    return {
      iconsMap: iconList,
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
