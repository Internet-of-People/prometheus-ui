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
        <Button name="Save Account" v-bind:onClick="save"/>
      </div>
    </div>
    <Button v-else name="Add" v-bind:onClick="add"/>
  </div>
</template>

<script>
import Button from '@/components/common/Button'
export default {
  name: 'Add',
  components: {
    Button,
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
      // TODO: Pass new account on dispatch
      this.$store.dispatch('saveAccount')
    }
  },
}
</script>

<style scoped>
</style>