import Vue from 'vue';
import Vuex from 'vuex';

import { getPackageByName, getPackageDetails } from '../api';
import { getCDNUrl } from '../common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    query: '',
    packages: [],
    selected: undefined,
    details: {},
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
    setDetails(state, { details }) {
      state.details = details;
    },
    notFound(state) {
      state.packages = [];
    },
  },
  actions: {
    async doSearch({ commit, state }) {
      const result = await getPackageByName(state.query);

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
    async getDetails({ commit, state }) {
      const result = await getPackageDetails(state.query, state.selected);

      if (result.data) {
        commit({
          type: 'setDetails',
          details: result.data,
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
