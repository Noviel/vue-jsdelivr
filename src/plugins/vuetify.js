import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      dark: {
        primary: '#D27EDE',
        secondary: '#242333',
        accent: '#F6E0B8',
        error: '#CB1D46',
      },
    },
  },
});
