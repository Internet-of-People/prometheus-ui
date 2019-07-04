<template>
  <b-container class="p-2 m-0" fluid>
    <b-row no-gutters>
      <b-col>{{ title }}</b-col>
      <b-button :ref="btn.id" v-if="btn" @click="onClick"
        class="float-right" variant="primary" to="">
        {{ btn.name }}
      </b-button>
    </b-row>
    <b-breadcrumb :items="breadcrumb" class="small"></b-breadcrumb>
  </b-container>
</template>

<script>
import api from '@/api';

export default {
  name: 'BreadCrumb',
  computed: {
    breadcrumb() {
      return this.$route.meta.breadcrumb;
    },
    title() {
      let { title } = this.$route.meta;
      title += this.$route.params.id ? this.$route.params.id : '';
      return title;
    },
    btn() {
      return this.$route.meta.action;
    },
  },
  methods: {
    onClick() {
      api[this.btn.apiCall]().then(() => {
        api.listDIDs().then((response) => {
          this.$store.dispatch('listDIDs', response);
        }).catch((err) => {
          console.err(err);
        });
      }).catch((err) => {
        console.err(err);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/app.scss';
</style>
