<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$alert('请在手机端打开，以保证浏览效果')
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
.el-message-box {
  width: 90vw !important;
}
</style>
