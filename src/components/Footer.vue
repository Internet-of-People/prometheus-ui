<template>
  <b-container id="footer" fluid>
    <b-row>
      <b-col class="mb-2 text-muted">
          Social:
          <a
            href="https://github.com/Internet-of-People/"
            target="_blank"
            class="mr-2"
          ><fa :icon="['fab', 'github']" /></a>
          <a
            href="https://t.me/IoPofficial"
            target="_blank"
            class="mr-2"
          ><fa :icon="['fab', 'telegram']" /></a>
          <a
            href="https://discord.gg/xENSXwk"
            target="_blank"
          ><fa :icon="['fab', 'discord']" /></a>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
@import './Footer.scss';
</style>
