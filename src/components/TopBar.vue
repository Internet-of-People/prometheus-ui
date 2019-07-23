<template>
  <b-container class="p-2 m-0 text-uppercase" fluid>
    <b-row
      id="top-bar"
      no-gutters
      :class="`align-items-center h-100${breadcrumb && breadcrumb.length?' has-breadcrumb':''}`"
    >
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
      const { breadcrumb } = this.$route.meta;
      return breadcrumb ? breadcrumb(this.$route) : [];
    },
    title() {
      const { title } = this.$route.meta;
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
