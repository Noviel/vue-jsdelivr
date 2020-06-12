import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#9DC0A6',
        secondary: '#602E51',
        accent: '#F6E0B8',
        error: '#CB1D46',
      },
    },
  },
});
