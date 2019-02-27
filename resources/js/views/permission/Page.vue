<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div>
      <code>
        {{ $t('permission.pageDescription') }}
      </code>
    </div>
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles';

export default {
  name: 'PagePermission',
  components: { SwitchRoles },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() });
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  code {
    margin-top: 20px;
  }
}
</style>
