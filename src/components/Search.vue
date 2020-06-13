<template>
  <div class="d-inline-flex align-center">
    <v-text-field
      @keyup.enter="safeSearch"
      class="mr-4 mt-3"
      v-model="packageName"
      placeholder="Enter package name"
      aria-label="Search for a package"
    ></v-text-field>
    <v-btn
      @click="search"
      color="primary"
      :disabled="packageName.length === 0 || packageVersionsFetchState === 'Loading'"
      >Search</v-btn
    >
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  methods: {
    ...mapActions(['search']),
    safeSearch() {
      if (this.packageVersionsFetchState === 'Loading' || this.packageName.length === 0) {
        return;
      }
      this.search();
    },
  },
  computed: {
    ...mapState(['packageVersionsFetchState']),
    packageName: {
      get() {
        return this.$store.state.packageName;
      },
      set(value) {
        this.$store.commit('setPackage', value);
      },
    },
  },
};
</script>
