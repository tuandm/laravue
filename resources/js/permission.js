import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) {
    return true // admin permission passed directly
  }

  if (!permissionRoles) {
    return true
  }
  
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login'] // No redirect for login page
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // Get user information
          let data = res.data
          const roles = [res.data.role]
          // next()          
          store.dispatch('GenerateRoutes', { roles }).then(() => { // Get all routers based on current role
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true }) // Just to make sure addRoutes is done ,set the replace: true so the navigation will not leave a history record
          })

        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // Redirect to login page if for unauthorized users
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
