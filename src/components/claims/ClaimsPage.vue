<template>
  <div>

    <div class="page-title">Claims</div>

    <input v-model="search" class='search-box' placeholder="Search in claims" type="text"/>

    <div class="claim-filter" v-if="type">
      <i :class="icon_name(type)" />
      {{ type }}
      <a v-on:click="remove_type_filter()"><i class="fa fa-minus-circle"/></a>
    </div>

    <div class="claim" v-bind:key="item.id" v-for="item in filtered_list">
      <div class="icon"><i :class="'fa fa-' + icon_name(item.type)" /></div>
      <div>
        <a v-on:click="add_type_filter(item.type)">{{ item.type }}</a> - <strong>{{ item.summary }}</strong>
        <br/>
        Claimed by <i class="fa fa-user"/> {{item.claimer}}
        <!-- <div class="all-details" v-for="(val,index) in fetchKey(item)" :key="index">{{item[val] + " "}}</div> -->
      </div>
      <span class="date">{{item.date}}</span>
    </div>

  </div>
</template>

<script>
/*eslint no-unused-vars: "off"*/

var icons = {
  age: 'calendar',
  nationality: 'flag',
  property: 'sticky-note',
  like: 'heart',
  Educational: 'graduation-cap',
};

export default {
  name: 'ClaimsPage',
  components: {
  },
  watch: {
    '$route' (to, from) {
      this.type = to.params.filter
    }
  },
  data: function() {
    return {
      search: '',
      type: this.$route.params.filter,
    }
  },
  methods: {
    add_type_filter: function(type) {
      this.type = type
      this.$router.push('/claims/' + type)
    },
    remove_type_filter: function() {
      this.type = null
      this.$router.push('/claims/')
    },
    fetchKey: function (obj) {
     return Object.keys(obj)
    },
    icon_name: function(type) {
      return 'fa fa-' + icons[type]
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
.search-box{
  width: 100%;
  padding: 12px 16px;
  margin: 0 0 16px 0px;
  outline: none;
}
.all-details{
  display: inline;
}
</style>
