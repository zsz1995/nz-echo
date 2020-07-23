<template>
    <div id="detail" v-if="audio.data && !loading">
        <div class="detail-header">
            <img class="detail-img" :src="audio.data.sound.pic_500" alt="">
        </div>
        <music-list :json="otherJson"></music-list>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'vuex';
    import {getDetail, getOther} from "@/api";
    import MusicList from "@/components/MusicList";

    export default {
        data() {
            return {
                otherJson: [],
                loading: false
            }
        },
        components: {
            MusicList
        },
        computed: {
            ...mapState([
                'audio'
            ]),
            ...mapGetters([
                'audio_progress'
            ])
        },
        watch: {
            $route() {
                if (this.$route.path.includes('detail')) {
                    this.getMusicData();
                    this.getOtherData();
                }
            }
        },
        mounted() {
            this.getMusicData();
            this.getOtherData();
        },
        methods: {
            ...mapMutations([
                'SET_AUDIO_DATA',
                'SET_AUDIO_PLAY',
            ]),
            getMusicData() {
                let that = this;
                that.$indicator.open();
                that.loading = true;
                let soundId = this.$route.query.id;
                getDetail(soundId).then(res => {
                    that.$indicator.close();
                    that.loading = false;
                    if (res && res.data) {
                        that.SET_AUDIO_DATA(res.data)
                    }
                }).catch(() => {
                    that.$indicator.close();
                    that.loading = false;
                })

            },
            getOtherData() {
                let that = this;
                getOther().then(res => {
                    if (res && res.data.length > 0) {
                        that.otherJson = res.data;
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
