<template>
  <div>
    <div>
        <div class="page-title">Claims</div>
        <input v-model="search" placeholder="Search in claims" type="text"/>
        <span class="claim-filter" v-if="type">
          {{ type }}
          <a v-on:click="remove_type_filter()"><i class="fa fa-minus-circle"/></a>
        </span>
        <hr>
        <div class="claim" v-bind:key="item.id" v-for="item in filtered_list">
          <a v-on:click="add_type_filter(item.type)">{{ item.type }}</a> - {{ item.summary }}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClaimsPage',
  components: {
  },
  data: function() {
    return {
      search: '',
      type: null,
    }
  },
  methods: {
    add_type_filter: function(type) {
      this.type = type
    },
    remove_type_filter: function() {
      this.type = null
    },
  },
  computed: {
    filtered_list() {
      let claims = this.$store.state.claims

      let search_filtered
      if (this.search != '') {
        search_filtered = claims.filter(item => {
          if (item.summary.toLowerCase().includes(this.search.toLowerCase())) return true
          if (item.type.toLowerCase().includes(this.search.toLowerCase())) return true
          return false
        })
      } else {
        search_filtered = claims
      }

      let type_filtered
      if (this.type) {
        type_filtered = search_filtered.filter(item => this.type == item.type)
      } else {
        type_filtered = search_filtered
      }

      return type_filtered
    },
  },
}
</script>

<style scoped>
</style>
