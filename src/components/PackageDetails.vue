<template>
  <v-row justify="center">
    <v-dialog scrollable max-width="500px" v-model="dialog" v-on:click:outside="closeDialog">
      <v-card>
        <v-card-title class="headline lighten-2" primary-title> {{ displayPackageName }} </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pt-4" max-height="300">
          <div v-if="selectedVersionDetailsFetchState === 'Loading'">Loading...</div>
          <div v-else-if="selectedVersionDetailsFetchState === 'Failed'">Ooops, something went wrong...</div>
          <div v-else>
            <div class="mb-2">
              Default entry: <code class="pa-1 file">{{ selectedVersionDetails.default }}</code>
            </div>

            <div>Files:</div>
            <div v-for="f in selectedVersionDetails.files" v-bind:key="f.name" class="pa-1">
              <code class="pa-1 file">{{ f.name }}</code>
            </div>
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
  methods: {
    closeDialog() {
      this.$store.commit('clearSelectedVersion');
      this.$store.commit('clearSelectedVersionDetails');
    },
  },
  computed: {
    ...mapState(['selectedVersion', 'packageName', 'selectedVersionDetails', 'selectedVersionDetailsFetchState']),
    displayPackageName() {
      return this.$store.state.isExactPackageName ? this.packageName : `${this.packageName}@${this.selectedVersion}`;
    },
    dialog: {
      get() {
        return typeof this.$store.state.selectedVersion !== 'undefined';
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
