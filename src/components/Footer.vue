<template>
  <b-container id="footer" fluid>
    <b-row>
      <b-col class="mb-2 text-muted">
        <small>
          {{ appName }} &copy;&nbsp; {{ new Date().getFullYear() }} Internet of People -
          <a
            href="https://github.com/Internet-of-People/"
            target="_blank"
          >GitHub</a>
        </small>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    appName: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
#footer{
  position: fixed;
  bottom:0;
  background-color: #ffffff;
}
</style>
