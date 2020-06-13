import Vue from 'vue';
import Vuex from 'vuex';

import { getPackageVersions, getPackageFiles } from '../api';
import { getCDNUrl, parsePackageName } from '../common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packageName: '',
    isExactPackageName: false,
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
    setIsExactPackageName(state, isExact) {
      state.isExactPackageName = isExact;
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
        link: getCDNUrl(parsePackageName(state.packageName).name, version),
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
        const { _, version } = parsePackageName(state.packageName);
        commit({
          type: 'setPackageVersionsFetchState',
          fetchState: 'Success',
        });

        if (version) {
          commit('setIsExactPackageName', true);
          commit({
            type: 'setPackageVersions',
            versions: [version],
          });
        } else {
          commit('setIsExactPackageName', false);
          commit({
            type: 'setPackageVersions',
            versions: data.versions,
          });
        }
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

      const { data } = await getPackageFiles(parsePackageName(state.packageName).name, state.selectedVersion);

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
});
