<template>
  <v-data-table
    fixed-header
    @click:row="handleClick"
    :headers="headers"
    :items="packages"
    :items-per-page="10"
    :footer-props="{
      itemsPerPageText: 'Page size',
    }"
  >
    <template slot="no-data">
      <div class="font-weight-medium text-h6">
        No packages were found
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
  computed: mapState(['query', 'packages']),
  methods: {
    handleClick({ version }) {
      this.$store.commit('setSelected', version);
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
