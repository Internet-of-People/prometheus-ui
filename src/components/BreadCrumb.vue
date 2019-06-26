<template>
  <div class="breadcrumb">
    <div>{{ pageTitle }}</div>
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        :class="{'linked': !breadcrumb.link}"
        @click="routeTo(idx)"
      >
        {{ idx+1 + '. ' + breadcrumb.name + ' ' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {
      breadcrumbList: [],
      pageTitle: 'CREATE NEW VAULT',
    };
  },
  watch: { $route() { this.updateList(); } },
  mounted() { this.updateList(); },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link);
    },
    updateList() { this.breadcrumbList = this.$route.meta.breadcrumb; },
    fetchPageTitle() {
      if (this.breadcrumbList.length) {
        return this.breadcrumbList[this.breadcrumbList.length - 1].name;
      }

      return '';
    },
  },
};
</script>

<style scoped>
</style>
