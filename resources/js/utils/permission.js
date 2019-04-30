import store from '@/store';

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/Directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const permissions = store.getters && store.getters.permissions;
    const requiredPermissions = value;

    const hasPermission = permissions.some(permission => {
      return requiredPermissions.includes(permission);
    });

    return hasPermission;
  } else {
    console.error(`Need permissions! Like v-permission="['manage permission','edit article']"`);
    return false;
  }
}
