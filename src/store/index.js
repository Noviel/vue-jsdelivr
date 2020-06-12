import Vue from 'vue';
import Vuex from 'vuex';

import { getPackageByName } from '../api';
import { getCDNUrl } from '../common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    query: '',
    packages: [],
    selected: undefined,
  },
  mutations: {
    setQuery(state, query) {
      state.query = query;
    },
    setSelected(state, version) {
      state.selected = version;
    },
    setPackages(state, { packages }) {
      state.packages = packages.map(p => ({
        version: p,
        link: getCDNUrl(state.query, p),
      }));
    },
    notFound(state) {
      state.packages = [];
    },
  },
  actions: {
    async doSearch({ commit, state }) {
      const result = await getPackageByName(state.query);

      console.log(result);

      if (result.data) {
        commit({
          type: 'setPackages',
          packages: result.data.versions,
        });
      } else if (result.status === 404) {
        commit({
          type: 'notFound',
        });
      }
    },
  },
  modules: {},
  getters: {
    packagesCount: state => {
      return state.packages.length;
    },
  },
});
