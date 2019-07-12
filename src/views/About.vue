<template>
  <b-jumbotron
    header="Prometheus"
    :lead="`Cross-platform desktop application for Prometheus. Version: ${version}`"
    class="mb-0"
  >
    Copyright &copy;&nbsp; {{ new Date().getFullYear() }} Decentralized Society Foundation, PA
  </b-jumbotron>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['version']),
  },
};
</script>
