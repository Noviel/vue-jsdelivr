<template>
  <v-data-table
    fixed-header
    @click:row="handleClick"
    :headers="headers"
    :items="items"
    :items-per-page="10"
    :footer-props="{
      itemsPerPageText: 'Page size',
    }"
  >
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Version',
          align: 'start',
          sortable: false,
          value: 'version',
        },
        { text: 'URL', value: 'link' },
      ],
    };
  },
  computed: {
    items() {
      return this.$store.state.packages;
    },
  },
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
