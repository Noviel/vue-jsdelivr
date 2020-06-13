import Vue from 'vue';
import Vuex from 'vuex';

import { getPackageVersions, getPackageFiles } from '../api';
import { getCDNUrl } from '../common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packageName: '',
    packageVersions: [],
    packageVersionsFetchState: 'Initial',
    selectedVersion: undefined,
    selectedVersionDetails: {},
    selectedVersionDetailsFetchState: 'Initial',
  },
  mutations: {
    setPackage(state, packageName) {
      state.packageName = packageName;
    },

    setSelectedVersion(state, version) {
      state.selectedVersion = version;
    },
    clearSelectedVersion(state) {
      state.selectedVersion = undefined;
    },

    setPackageVersions(state, { versions }) {
      state.packageVersions = versions.map(version => ({
        version,
        link: getCDNUrl(state.packageName, version),
      }));
    },
    clearPackageVersions(state) {
      state.packageVersions = [];
    },

    setPackageVersionsFetchState(state, { fetchState }) {
      state.packageVersionsFetchState = fetchState;
    },

    setSelectedVersionDetails(state, { details }) {
      state.selectedVersionDetails = details;
    },
    clearSelectedVersionDetails(state) {
      state.selectedVersionDetails = {};
    },

    setSelectedVersionDetailsFetchState(state, { fetchState }) {
      state.selectedVersionDetailsFetchState = fetchState;
    },
  },
  actions: {
    async search({ commit, state }) {
      commit({
        type: 'setPackageVersionsFetchState',
        fetchState: 'Loading',
      });
      const { data, status } = await getPackageVersions(state.packageName);

      if (data) {
        commit({
          type: 'setPackageVersions',
          versions: data.versions,
        });
        commit({
          type: 'setPackageVersionsFetchState',
          fetchState: 'Success',
        });
      } else if (status !== 200) {
        commit({
          type: 'clearPackageVersions',
        });
        commit({
          type: 'setPackageVersionsFetchState',
          fetchState: 'Failed',
        });
      }
    },
    async getDetails({ commit, state }) {
      commit({
        type: 'setSelectedVersionDetailsFetchState',
        fetchState: 'Loading',
      });

      const { data } = await getPackageFiles(state.packageName, state.selectedVersion);

      if (data) {
        commit({
          type: 'setSelectedVersionDetails',
          details: data,
        });
        commit({
          type: 'setSelectedVersionDetailsFetchState',
          fetchState: 'Success',
        });
      } else {
        commit({
          type: 'clearSelectedVersionDetails',
        });
        commit({
          type: 'setSelectedVersionDetailsFetchState',
          fetchState: 'Failed',
        });
      }
    },
  },
  modules: {},
});
