<template>
  <div class="header-inner-wrapper">
    <div class="page-title sans-serif-normal float-left regular-fontsize">Influencer App  
        <div class="display-inline-flex" v-if="name.length">{{'> '+ name}}</div>
    </div>
  </div>
</template>

<script>
// @usage <Header name=""/>
// name: String
export default {
  name: 'Header',
  props: ['name']
}
</script>

<style scoped>
.header-inner-wrapper{
  width: 100%;
  height: 40px;
  z-index: 94;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.page-title {
  color: #e22e71;
  height: 22px;
  padding: 12px 0px 6px 12px;
  font-weight: 400;
  margin-left: 12px;
}

</style>
