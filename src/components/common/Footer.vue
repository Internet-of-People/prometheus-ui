<template>
  <div>
    <div class="footer-wrapper col-12">
      <div class="float-left cursor-default desktop-footer-essentials">
        <span class="">{{ appName }}</span>
        <span class="copyright">&copy;&nbsp; {{ new Date().getFullYear() }} Internet of People</span>
      </div>
      <div class="float-right cursor-default desktop-footer-essentials">
        <span class="">
          <a
            href="https://github.com/Internet-of-People/"
            target="_blank"
          >GitHub</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    appName: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
</style>
