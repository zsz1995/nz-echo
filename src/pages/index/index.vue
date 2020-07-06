<template>
  <div id="index">
    <!--  banner  -->
    <music-banner :json="bannerJson"></music-banner>
  </div>
</template>

<script>
  import MusicBanner from '@/components/MusicBanner'
  import {getBanner} from "@/api";

  export default {
    name: 'index',
    components: {
      MusicBanner
    },
    data() {
      return {
        bannerJson: []
      }
    },
    mounted() {
      this.getBannerData()
    },
    methods: {
      getBannerData() {
        let that = this;
        getBanner().then(res => {
          that.bannerJson = res.data
        })
      }
    }
  }
</script>

<style lang="stylus">
  #index {
    position: relative;
    width: 100%;
    background: #fff;
    .recommend {
      width: 100%;
      position: relative;
      .recommen-title {
        display: flex;
        align-items: center;
        justify-content: center;
        width: toRem(120);
        height: toRem(26);
        color: $darkColor;
        font-size: toRem(12);
        margin: toRem(20) auto;
        border-radius: toRem(13);
        background-color: $shallowColor;
      }
      .playAll {
        position: absolute;
        left: 0;
        top: toRem(60);
        z-index: 22;
        display: flex;
        align-items: center;
        font-size: toRem(14);
        height: toRem(28);
        padding-left: toRem(10);
        padding-right: toRem(16);
        border-radius: toRem(16);
        background-color: $appColor;
        .playAll-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: toRem(18);
          height: toRem(18);
          color: $appColor;
          margin-right: toRem(5);
          background: #fff;
          border-radius: 100%;
        }
        .playAll-label {
          color: #fff;
        }
      }
    }
    .loading-container {
      width: 100%;
      height: toRem(50);
      display: flex;
      align-items: center;
      justify-content: center;
      .loading, .nothing, .error {
        font-size: toRem(14);
        color: #999;
        text-align: center;
      }
      .error {
        color: $redColor;
      }
    }
  }
</style>
