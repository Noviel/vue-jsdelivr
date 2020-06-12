<template>
  <v-footer app color="secondary" class="white--text footer" fixed>
    <a href="https://github.com/Noviel/vue-jsdelivr" rel="noopener" class="link">
      <icon-base icon-color="white" icon-name="Github page" width="22" height="22"><icon-github /></icon-base>
    </a>
    <v-spacer></v-spacer>
    <span>Made with <span style="color: red">❤</span> by Alexander "Snov" Semenchenko</span>
  </v-footer>
</template>

<script>
import IconBase from './IconBase';
import IconGithub from './icons/IconGithub';

export default {
  components: {
    IconGithub,
    IconBase,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  max-width: 100vw;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
