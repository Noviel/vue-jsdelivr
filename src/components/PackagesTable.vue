<template>
  <v-data-table
    fixed-header
    @click:row="handleClick"
    :headers="headers"
    :items="packageVersions"
    :items-per-page="10"
    :footer-props="{
      itemsPerPageText: 'Page size',
    }"
    :loading="packageVersionsFetchState === 'Loading'"
    loading-text="Loading..."
  >
    <template slot="no-data">
      <div class="font-weight-medium text-h6">
        <span v-if="packageVersionsFetchState === 'Initial'">
          Enter package name in the search field to display versions list
        </span>
        <span v-else>
          No packages were found
        </span>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Version',
          align: 'start',
          value: 'version',
          width: '22%',
        },
        { text: 'URL', value: 'link' },
      ],
    };
  },
  computed: mapState(['packageName', 'packageVersions', 'packageVersionsFetchState']),
  methods: {
    handleClick({ version }) {
      this.$store.commit('setSelectedVersion', version);
      this.$store.dispatch({
        type: 'getDetails',
      });
    },
  },
};
</script>

<style lang="scss">
.v-data-table tr:hover {
  background: var(--v-secondary-lighten1) !important;
  cursor: pointer;
}
</style>
