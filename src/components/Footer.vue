<template>
  <b-container id="footer" fluid>
    <b-row>
      <b-col class="mb-2 text-muted">
          Social:
          <NativeLink href="https://github.com/Internet-of-People/">
            <fa :icon="['fab', 'github']" />
          </NativeLink>
          <NativeLink href="https://t.me/IoPofficial">
            <fa :icon="['fab', 'telegram']" />
          </NativeLink>
          <NativeLink href="https://discord.gg/xENSXwk">
            <fa :icon="['fab', 'discord']" />
          </NativeLink>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import NativeLink from './NativeLink.vue';

export default {
  components: {
    NativeLink,
  },
};
</script>

<style scoped>
@import './Footer.scss';
</style>
