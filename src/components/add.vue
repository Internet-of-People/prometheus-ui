<template>
  <div>
    <div v-if="expanded" id="add">
      <div>
        <select>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
          <option value="hackernews">Hacker News</option>
          <option value="instagram">Instagram</option>
        </select> 
        <input name="handle" type="text" size=40 />
      </div>
      <div>
        <br/>
        <button v-on:click="save">Save Account</button>
      </div>
    </div>
    <button v-else v-on:click="add">Add</button>
  </div>
</template>

<script>

export default {
  name: 'Add',
  components: {
  },
  data() {
    return {
      expanded: false,
    }
  },
  methods: {
    add(){
      this.expanded = true;
    },
    save(){
      alert('TODO: save to the store.');
      this.expanded = false;
    }
  },
}
</script>

<style scoped>
</style>