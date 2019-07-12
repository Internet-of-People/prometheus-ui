<template>
  <b-container class="p-2 m-0" fluid>
    <b-row no-gutters>
      <b-col>{{ title }}</b-col>
      <component v-if="topBarButton" v-bind:is="topBarButton"></component>
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
      let { title } = this.$route.meta;
      title += this.$route.params.id ? this.$route.params.id : '';
      return title;
    },
    topBarButton() {
      return this.$route.meta.topBarButton;
    },
  },
};
</script>

<style scoped lang="scss">
@import './TopBar.scss';
</style>
