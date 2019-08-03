<template>
  <div class="app-container">
    <div class="description">
      Laravue provides two directives <el-tag class="permission-tag" size="small">
        v-role
      </el-tag> and <el-tag class="permission-tag" size="small">
        v-permission
      </el-tag>. Please see the belw example here for details
    </div>
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-role="['admin']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">admin</el-tag> can see this
        </span>
        <el-tag v-role="['admin']" class="permission-sourceCode" type="info">
          v-role="['admin']"
        </el-tag>
      </div>
      <div>
        <span v-role="['manager']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">manager</el-tag> can see this
        </span>
        <el-tag v-role="['manager']" class="permission-sourceCode" type="info">
          v-role="['manager']"
        </el-tag>
      </div>
      <div>
        <span v-role="['editor']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag v-role="['editor']" class="permission-sourceCode" type="info">
          v-role="['editor']"
        </el-tag>
      </div>
      <div>
        <span v-role="['user']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">user</el-tag> can see this
        </span>
        <el-tag v-role="['user']" class="permission-sourceCode" type="info">
          v-role="['user']"
        </el-tag>
      </div>
      <div>
        <span v-role="['visitor']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">visitor</el-tag> can see this
        </span>
        <el-tag v-role="['visitor']" class="permission-sourceCode" type="info">
          v-role="['visitor']"
        </el-tag>
      </div>

      <div>
        <span v-role="['admin','editor']" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">admin</el-tag> and
          <el-tag class="permission-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag v-role="['admin','editor']" class="permission-sourceCode" type="info">
          v-role="['admin','editor']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['manage user']" class="permission-alert">
          You can see this if you have <el-tag class="permission-tag" size="small">manage user</el-tag> permission
        </span>
        <el-tag v-permission="['manage user']" class="permission-sourceCode" type="info">
          v-permission="['manage user']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['manage user']" v-role="['admin']" class="permission-alert">
          You can see this if you are <el-tag class="permission-tag" size="small">admin</el-tag> <strong>AND</strong> you have <el-tag class="permission-tag" size="small">manage user</el-tag> permission
        </span>
        <el-tag v-permission="['manage user']" class="permission-sourceCode" type="info">
          v-permission="['manage user']" v-role="['admin']"
        </el-tag>
      </div>
    </div>

    <div :key="'checkPermission'+key" style="margin-top:60px;">
      <code>
        {{ $t('permission.tips') }}
        <br> e.g.
      </code>

      <el-tabs type="border-card" style="width:550px;">
        <el-tab-pane v-if="checkRole(['admin'])" label="Admin">
          Admin can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkRole(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkRole(['manager'])" label="Manager">
          Manager can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkRole(['manager'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkRole(['editor'])" label="Editor">
          Editor can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkRole(['editor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkRole(['user'])" label="User">
          User can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkRole(['user'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkRole(['visitor'])" label="Visitor">
          Visitor can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkRole(['visitor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkRole(['admin','editor'])" label="Admin-OR-Editor">
          Both admin or editor can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkRole(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission'; // Permission directive (v-permission)
import role from '@/directive/role'; // Permission directive (v-role)
import checkPermission from '@/utils/permission'; // Permission checking
import checkRole from '@/utils/role'; // Role checking
import SwitchRoles from './components/SwitchRoles';

export default {
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { permission, role },
  data() {
    return {
      key: 1, // In order to re-initialize the command each time switching permissions
    };
  },
  methods: {
    checkPermission,
    checkRole,
    handleRolesChange() {
      this.key++;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 600px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  /deep/ .permission-sourceCode {
    margin-left: 15px;
  }
  /deep/ .permission-tag {
    background-color: #ecf5ff;
  }
  .description {
    margin-bottom: 15px;
  }
}
</style>
