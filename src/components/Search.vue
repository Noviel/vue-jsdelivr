<template>
  <div class="d-inline-flex align-center">
    <v-text-field
      @keyup.enter="doSearch"
      class="mr-4 mt-3"
      v-model="query"
      placeholder="Search for a package..."
      aria-label="Search for a package"
    ></v-text-field>
    <v-btn @click="doSearch" color="primary">Search</v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({}),
  methods: {
    updateQuery(e) {
      this.$store.commit('setQuery', e.target.value);
    },
    ...mapActions(['doSearch']),
  },
  computed: {
    query: {
      get() {
        return this.$store.state.query;
      },
      set(value) {
        this.$store.commit('setQuery', value);
      },
    },
    ...mapGetters(['packagesCount']),
  },
};
</script>
