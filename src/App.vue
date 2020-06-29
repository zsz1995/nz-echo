<template>
  <div id="app">
    <!--视图层-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--页面加载进度条-->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  created() {
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    })
  },
  mounted(){
    this.$Progress.finish();
  }
}
</script>

<style lang="stylus">
</style>
