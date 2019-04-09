<template>
  <div>
    <div class="footer-wrapper col-12">
      <div class='float-left cursor-default desktop-footer-essentials'>
        <span class=''>Prometheus</span>
        <span class='copyright'>&copy;&nbsp; {{new Date().getFullYear()}} Internet of People</span>
      </div>
      <div class='float-right cursor-default desktop-footer-essentials'>
        <span class=''>
          <a href="https://github.com/Internet-of-People/" target="_blank">GitHub</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>

.footer-wrapper {
  position: fixed;
  bottom: 0px;
  left: 0px;
  color: #53585F;
  /* padding: 0px 16px; */
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  display: inline-block;
  z-index: 100;
  background-color: white;
}

.desktop-footer-essentials{
  padding: 8px 16px;
}

.copyright {
  border-left: 1px solid #f2f2f2;
  padding-left: 5px;
  padding-right: 5px;
}

</style>
