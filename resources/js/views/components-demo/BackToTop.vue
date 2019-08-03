<template>
  <div class="components-container">
    <code>{{ $t('components.backToTopTips1') }}</code>
    <code>{{ $t('components.backToTopTips2') }}</code>
    <div class="placeholder-container">
      <ul>
        <li v-for="n in 150" :key="n">
          Placeholder
        </li>
      </ul>
    </div>
    <!--<el-tooltip> to show the helptext -->
    <el-tooltip placement="top" content="tooltip">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop';

export default {
  name: 'BackToTopDemo',
  components: { BackToTop },
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // Please keep consistent with height to center vertically
        background: '#e7eaf1', // The background color of the button
      },
    };
  },
};
</script>

<style scoped lang="scss">
.placeholder-container {
  ul {
    li {
      margin: 10px;
      list-style-type: none;
    }
  }
}
</style>
