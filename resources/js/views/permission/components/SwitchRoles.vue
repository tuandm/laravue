<template>
  <div>
    <div style="margin-bottom:15px;">
      {{ $t('permission.roles') }}: {{ roles }}
    </div>
    <div style="margin-bottom:15px;">
      {{ $t('permission.switchRoles') }}:
    </div>
    <div>
      <el-radio-group v-model="switchRoles" v-loading="loading">
        <el-radio-button label="admin" />
        <el-radio-button label="manager" />
        <el-radio-button label="editor" />
        <el-radio-button label="user" />
        <el-radio-button label="visitor" />
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import RoleResource from '@/api/role';
const roleResource = new RoleResource();
export default {
  data() {
    return {
      avaiableRoles: [],
      loading: false,
      list: [],
    };
  },
  computed: {
    roles() {
      return this.$store.getters.roles;
    },
    switchRoles: {
      get() {
        return this.roles[0];
      },
      set(val) {
        const found = this.list.find(role => role.name === val);
        this.$store.dispatch('user/changeRoles', found).then(() => {
          this.$emit('change');
        });
      },
    },
  },
  created() {
    this.getRoles();
  },
  methods: {
    async getRoles() {
      this.loading = true;
      const { data } = await roleResource.list({});
      this.list = data;
      this.list.forEach((role, index) => {
        role['index'] = index + 1;
        role['description'] = this.$t('roles.description.' + role.name);
      });
      this.loading = false;
    },
  },
};
</script>

