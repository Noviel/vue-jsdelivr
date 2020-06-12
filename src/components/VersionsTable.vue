<template>
  <v-data-table @click:row="handleClick" :headers="headers" :items="items" :items-per-page="10"></v-data-table>
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
        { text: 'CDN Link', value: 'link' },
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
    },
  },
};
</script>
