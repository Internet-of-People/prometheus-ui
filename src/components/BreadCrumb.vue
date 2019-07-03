<template>
  <b-container class="p-2 m-0" fluid>
    <b-row no-gutters>
      <b-col>{{ title }}</b-col>
      <b-button :ref="btn.id" v-if="btn" @click="onClick"
        class="float-right" variant="primary" to="">
        {{btn.name}}
      </b-button>
    </b-row>
    <b-breadcrumb :items="breadcrumb" class="small"></b-breadcrumb>
  </b-container>
</template>

<script>
export default {
  name: 'BreadCrumb',
  computed: {
    breadcrumb() {
      return this.$route.meta.breadcrumb;
    },
    title() {
      return this.$route.meta.title;
    },
    btn() {
      return this.$route.meta.action;
    },
  },
  methods: {
    onClick() {
      this.$store.dispatch(this.btn.apiCall);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/app.scss';
</style>
