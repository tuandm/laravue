import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';

NProgress.configure({ showSpinner: true });// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) {
    // Admin should have all permissions
    return true;
  }

  if (!permissionRoles) {
    return true;
  }

  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // Start the progress bar
  if (getToken()) {
    if (to.path === '/login') {
      // Skip login page for logged users
      next({ path: '/' });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // Get user information
          const roles = [res.data.role];
          // next()
          store.dispatch('GenerateRoutes', { roles }).then(() => { // Get all routers based on current role
            router.addRoutes(store.getters.addRouters);
            next({ ...to, replace: true }); // Just to make sure addRoutes is done ,set the replace: true so the navigation will not leave a history record
          });
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again');
            next({ path: '/' });
          });
        });
      } else {
        // Double check permission role
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }});
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`); // Redirect to login page if for unauthorized users
      NProgress.done();
    }
  }
});

// After router hooks are resolved, finish progress bar
router.afterEach(() => {
  NProgress.done();
});
