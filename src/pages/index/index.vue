<template>
    <div id="index" v-infinite-scroll="getListDataMore" :infinite-scroll-disabled="lock" infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
        <!--  banner  -->
        <music-banner :json="bannerJson"></music-banner>
        <music-list :json="listJson"></music-list>
        <bottom-loading :loading="loading"></bottom-loading>
    </div>
</template>

<script>
    import MusicBanner from '@/components/MusicBanner';
    import MusicList from '@/components/MusicList';
    import BottomLoading from '@/components/BottomLoading';
    import {getBanner, getList} from "@/api";

    export default {
        name: 'index',
        components: {
            MusicBanner,
            MusicList,
            BottomLoading
        },
        data() {
            return {
                bannerJson: [],
                listJson: [],
                otherJson: [],
                page: 1,
                loading: false,
                lock: false
            }
        },
        mounted() {
            this.getBannerData();
            this.getListData();
        },
        activated() {
            if (!this.loading) {
                this.lock =false
            }
        },
        methods: {
            getBannerData() {
                let that = this;
                getBanner().then(res => {
                    that.bannerJson = res.data
                })
            },
            getListData() {
                let that = this;
                that.page = 1;
                getList(that.page).then(res => {
                    that.listJson = res.data;
                    that.page = 2;
                })
            },
            getListDataMore() {
                let that = this;
                that.lock = true;
                getList(that.page).then(res => {
                    console.log(that.page)
                    if (res.data && res.data.length > 0) {
                        that.listJson.push(...res.data);
                        that.page++;
                        that.loading = false;
                        that.lock = false;
                    } else {
                        that.loading = 'nothing'
                    }
                }).catch(() => {
                    that.loading = 'error';
                    that.lock = false;
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
