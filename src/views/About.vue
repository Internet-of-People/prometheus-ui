<template>
  <b-jumbotron
    header="Prometheus"
    :lead="`Cross-platform desktop application for Prometheus. Version: ${version}`"
    class="mb-0"
  >
    Copyright &copy;&nbsp; {{ new Date().getFullYear() }}
    <NativeLink href="https://iop.global">Decentralized Society Foundation, PA</NativeLink>
  </b-jumbotron>
</template>
<script>
import { mapGetters } from 'vuex';
import { NativeLink } from '@/components';

export default {
  computed: {
    ...mapGetters(['version']),
  },
  components: {
    NativeLink,
  },
};
</script>
