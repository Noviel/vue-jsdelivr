<template>
  <v-row justify="center">
    <v-dialog scrollable max-width="500px" v-model="dialog" v-on:click:outside="closeDialog">
      <v-card>
        <v-card-title class="headline lighten-2" primary-title> {{ query }}@{{ selected }} </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pt-4" max-height="300">
          <div class="mb-2">
            Default entry: <code class="pa-1 file">{{ details.default }}</code>
          </div>

          <div>Files:</div>
          <div v-for="f in details.files" v-bind:key="f.name" class="pa-1">
            <code class="pa-1 file">{{ f.name }}</code>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="primary" @click="closeDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({}),
  methods: {
    closeDialog() {
      this.$store.commit('setSelected', undefined);
      this.$store.commit('setDetails', { details: {} });
    },
  },
  computed: {
    ...mapState(['selected', 'query', 'details']),
    dialog: {
      get() {
        return typeof this.$store.state.selected !== 'undefined';
      },
      set(value) {
        this.$store.commit('setSelected', value === false ? 'undefined' : value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.file {
  color: white;
  background-color: var(--v-secondary-lighten2);
}
</style>
