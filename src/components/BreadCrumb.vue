<template>
  <b-container class="p-2 m-0" fluid>
    <b-row no-gutters><b-col>{{ title }}</b-col></b-row>
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
  },
  methods: {
    fetchPageTitle() {
      if (this.breadcrumbList.length) {
        return this.breadcrumbList[this.breadcrumbList.length - 1].name;
      }

      return '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/app.scss';
</style>
