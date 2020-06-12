<template>
  <div class="text-center">
    <v-dialog width="500" v-model="dialog" v-on:click:outside="closeDialog">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Privacy Policy
        </v-card-title>

        <v-card-text class="pt-4">
          {{ selected }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    closeDialog() {
      this.$store.commit('setSelected', undefined);
    },
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
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
