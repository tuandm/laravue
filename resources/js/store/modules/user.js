import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    /**
     * Login action
     * @param {callbak} param0
     * @param {email, password} userInfo
     */
    Login({ commit }, userInfo) {
      const email = userInfo.email.trim();
      return new Promise((resolve, reject) => {
        login(email, userInfo.password)
          .then(response => {
            const token = response.token;
            setToken(token);
            commit('SET_TOKEN', token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * Get user information
     * @param {*} param0
     */
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data;
            if (data.role) {
              commit('SET_ROLES', [data.role]);
            } else {
              reject('getInfo: role must be set');
            }
            commit('SET_NAME', data.name);
            // commit('SET_AVATAR', data.avatar)
            commit('SET_AVATAR', 'http://i.pravatar.cc/32');
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * Logout action
     * @param {*} param0
     */
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * Logout processing
     * @param {*} param0
     */
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },

    /**
     * Change role of user
     * This method is to demo the directive v-permission.
     *
     * @param {*} param0
     * @param {*} role
     */
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        dispatch('GenerateRoutes', { roles: [role] }); // Re-render sidebar menu with new permission
        resolve();
      });
    },
  },
};

export default user;
