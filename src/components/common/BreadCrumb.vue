<template>
  <div class="breadcrumb">
    <div>{{fetchPageTitle()}}</div>
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{'linked': !!breadcrumb.link}">
        {{idx+1 + '. ' + breadcrumb.name + ' ' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      breadcrumbList: []
    }
  },
  mounted () { this.updateList() },
  watch: { '$route' () { this.updateList() } },
  methods: {
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link)
    },
    updateList () { this.breadcrumbList = this.$route.meta.breadcrumb },
    fetchPageTitle () {
      if (this.breadcrumbList.length){
        return this.breadcrumbList[this.breadcrumbList.length - 1]['name']
      } 
    }
  }
}
</script>

<style scoped>
</style>
