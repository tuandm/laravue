<template>
  <div class="icons-container">
    <p class="warn-content" v-show="false">
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html"
        target="_blank"
      >Add and use</a>
    </p>
    <div class="icons-wrapper">
      <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
        <el-tab-pane label="Icon Fonts" name="IC">
          <icon-font/>
        </el-tab-pane>

        <el-tab-pane label="Element UI Icons" name="EL">
          <element-u-i/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import IconFont from './components/IconFont';
import ElementUI from './components/ElementUi';

export default {
  name: 'Icons',
  components: { IconFont, ElementUI },
  data() {
    return {
      activeName: 'IC',
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;
}
</style>
