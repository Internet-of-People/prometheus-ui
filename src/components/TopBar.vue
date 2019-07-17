<template>
  <b-container class="p-2 m-0" fluid>
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
      let { breadcrumb } = this.$route.meta;
      if (this.$route.params.id && breadcrumb) {
        breadcrumb = breadcrumb.slice(0); // clones array
        breadcrumb.push({ text: this.$route.params.id });
      }
      return breadcrumb;
    },
    title() {
      const { title } = this.$route.meta;
      // title += this.$route.params.id ? this.$route.params.id : '';
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
