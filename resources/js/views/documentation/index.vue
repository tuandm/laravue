<template>
  <div class="app-container documentation-container">
    <a class="document-btn" target="_blank" href="https://laravel.com/docs/5.8">{{ $t('documentation.laravel') }}</a>
    <a class="document-btn" target="_blank" href="https://vuejs.org/">VueJS</a>
    <a class="document-btn" target="_blank" href="https://github.com/tuandm/laravue/">{{ $t('documentation.github') }}</a>
    <dropdown-menu :items="articleList" style="float:left;margin-left:50px;" title="Components" />
  </div>
</template>
<script>
import DropdownMenu from '@/components/Share/DropdownMenu';

export default {
  name: 'Documentation',
  components: { DropdownMenu },
  data() {
    return {
      articleList: [
        { title: 'Laravel Envoy', href: 'https://laravel.com/docs/5.8/envoy' },
        { title: 'Vuex', href: 'https://vuex.vuejs.org/' },
        { title: 'Vue Router', href: 'https://router.vuejs.org/' },
        { title: 'laravue-core', href: 'https://github.com/tuandm/laravue-core' },
        { title: 'vue-admin-template', href: 'https://github.com/PanJiaChen/vue-admin-template' },
        { title: 'Axios', href: 'https://github.com/axios/axios' },
      ],
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.documentation-container {
  margin: 50px;
  .document-btn {
    float: left;
    margin-left: 50px;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
