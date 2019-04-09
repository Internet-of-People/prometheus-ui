<template>
  <div>
    <div>
        <div class="page-title">Claims</div>
        <input v-model="search" placeholder="Search in claims" type="text"/>
        <ul>
          <li v-bind:key="type.length" v-for="type in types"><a v-on:click="remove_type_filter(type)">{{ type }}</a></li>
        </ul>
        <hr>
        <ol>
          <li v-bind:key="item.id" v-for="item in filtered_list">
            <a v-on:click="add_type_filter(item.type)">{{ item.type }}</a> - {{ item.summary }}
          </li>
        </ol>
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
      types: [],
    }
  },
  methods: {
    add_type_filter: function(type) {
      if (this.types.includes(type)) {
        return
      }
      this.types.push(type)
    },
    remove_type_filter: function(type) {
      if (this.types.includes(type)) {
        this.types = this.types.filter(t => t != type)
      }
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
      if (this.types.length > 0) {
        type_filtered = search_filtered.filter(item => this.types.includes(item.type))
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
