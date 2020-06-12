<template>
  <v-col cols="12">
    <v-row justify="center" align="center">
      <v-text-field class="mr-4" v-model="query" placeholder="Search for a package..." label="Search"></v-text-field>
      <v-btn @click="doSearch" color="primary">Search</v-btn>
    </v-row>
    <v-row>
      <v-card elevation="2" class="pa-5">Versions found: {{ packagesCount }}</v-card>
    </v-row>
  </v-col>
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
