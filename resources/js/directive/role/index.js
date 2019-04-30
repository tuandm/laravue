import role from './role';

const install = function(Vue) {
  Vue.directive('role', role);
};

if (window.Vue) {
  window['role'] = role;
  Vue.use(install); // eslint-disable-line
}

role.install = install;
export default role;
