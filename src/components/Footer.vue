<template>
  <div class="footer mt-3 mb-3 text-muted">
    Join Us:
    <NativeLink href="https://github.com/Internet-of-People/" class="mr-1">
      <fa :icon="['fab', 'github']" />
    </NativeLink>
    <NativeLink href="https://t.me/IoPofficial" class="mr-1">
      <fa :icon="['fab', 'telegram']" />
    </NativeLink>
    <NativeLink href="https://discord.gg/xENSXwk">
      <fa :icon="['fab', 'discord']" />
    </NativeLink>
    <div class="float-right heart">
      Made with <fa icon="heart" /> by IoP
    </div>
  </div>
</template>
<script>
import NativeLink from './NativeLink.vue';

export default {
  components: {
    NativeLink,
  },
};
</script>

<style scoped  lang="scss">
@import './Footer.scss';
</style>
