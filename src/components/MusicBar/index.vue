<template>
    <div id="musicBarContainer">
        <div id="musicBar" v-if="audio_data">
            <div class="music">
                <!-- audio -->
                <audio id="audio" autoplay="autoplay" :src="audio_data.sound.source"></audio>
                <!-- 封面 -->
                <router-link class="music-cover" :to="{path: 'detail', query: {id: audio_data.sound.id}}">
                    <img :src="audio_data.sound.pic_500" alt="">
                </router-link>
                <!-- 信息 -->
                <div class="music-info">
                    <div class="info-name"> {{ audio_data.sound.name }}</div>
                    <div class="info-author"> {{ audio_data.sound.user.name }}</div>
                </div>
                <!-- 按钮 -->
                <div class="music-control">
                    <!-- 播放列表 -->
                    <div class="my-icon-menu control-icon" @click="$refs.popup.togglePlayListVisible()"></div>
                    <!-- 播放/暂停 -->
                    <div class="control-icon control-icon-mid" :class="audio_play ? 'my-icon-pause' : 'my-icon-play'" @click="SET_AUDIO_PLAY(!audio_play)"></div>
                    <!-- 下一首 -->
                    <div class="my-icon-next control-icon" @click="handleNextAudio"></div>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-bar-inner" :style="`width: ${audio_progress}`"></div>
            </div>
        </div>
        <popup ref="popup" v-if="audio_data"></popup>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';
    import Popup from '@/components/Popup';

    export default {
        data() {
            return {
            }
        },
        components : {
          Popup
        },
        computed: {
            ...mapState({
                audio_ele: state => state.audio.ele,
                audio_data: state => state.audio.data,
                audio_play: state => state.audio.play,
                playList: state => state.playList,
                playMode: state => state.playMode
            }),
            ...mapGetters([
                'audio_progress'
            ])
        },
        watch: {
            audio_data(val) {
                // 当前audio数据变了, 等dom更新完, 初始化audio
                if (val) {
                    this.$nextTick(() => {
                        this.audioInit()
                    })
                }
            },
            audio_play(val) {
                val ? this.audio_ele.play() : this.audio_ele.pause()
            }
        },
        methods: {
            ...mapMutations([
                'SET_AUDIO_ELE',
                'SET_AUDIO_DATA',
                'SET_AUDIO_PLAY',
                'SET_AUDIO_DURATION',
                'SET_AUDIO_CURRENT_TIME',
                'SET_PLAY_MODE',
                'SET_PLAY_LIST'
            ]),
            // audio 元素初始化
            audioInit() {
                // 设置audio元素
                let _audio = this.$el.querySelector('#audio');
                this.SET_AUDIO_ELE(_audio);
                // 可以播放
                _audio.oncanplay = () => {
                    // Tip: 如果直接打开音乐详情页在一些浏览器中是不允许自动播放的，如：chrome、safari等
                    _audio.play();
                    this.SET_AUDIO_DURATION(_audio.duration);
                };
                // 播放位置改变
                _audio.ontimeupdate = () => {
                    // 设置当前时间
                    this.SET_AUDIO_CURRENT_TIME(Math.floor(_audio.currentTime))
                };
                // 正在播放
                _audio.onplay = () => {
                    this.SET_AUDIO_PLAY(true)
                };
                // 暂停
                _audio.onpause = () => {
                    this.SET_AUDIO_PLAY(false)
                };
                // 结束
                _audio.onended = () => {
                    this.SET_AUDIO_PLAY(false);
                    // 加载播放模式逻辑

                }
            },
            // 随机播放
            randomMode() {
                let index = ~~(Math.random() * this.playList.length);
                let isCurrentSame = this.playList[index].sound.id === this.audio_data.sound.id;
                if (isCurrentSame) {
                    this.listRepeatMode()
                } else {
                    this.SET_AUDIO_DATA(this.playList[index])
                }
            },
            // 单曲循环
            singleRepeatMode() {
              this.audio_ele.load();
              this.audio_ele.play();
            },
            // 列表播放
            listRepeatMode() {
                // 获取当前音乐的currentIndex, currentIndex是结尾的话, nextIndex就等于0, 否则 +1
                let currentIndex = this.playList.findIndex(item => item.sound.id === this.audio_data.sound.id);
                if (currentIndex > -1) {
                    let nextIndex = currentIndex === this.playList.length - 1 ? 0 : currentIndex + 1;
                    let isCurrentSame = this.playList[nextIndex].sound.id === this.audio_data.sound.id;
                    if (isCurrentSame) {
                        this.singleRepeatMode();
                    } else {
                        this.SET_AUDIO_DATA(this.playList[nextIndex]);
                    }
                } else {
                    console.warn("no touch")
                }
            },
            handleNextAudio() {
                switch (this.playMode) {
                    case 'random':
                        this.randomMode();
                        break;
                    case 'singleRepeat':
                        this.singleRepeatMode();
                        break;
                    case 'listRepeat':
                        this.listRepeatMode();
                        break;
                    default:
                        this.listRepeatMode();
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #musicBarContainer {
        position fixed
        bottom 0
        left 0
        right 0
        z-index 9999
        #musicBar {
            position absolute
            bottom 0
            left 0
            right 0
            width 100%
            z-index 9999
            border-top 1px solid $borderColor
            background-color rgba(255, 255, 255, 0.9)
            .music {
                display flex
                position relative
                align-items center
                width 100%
                height $musicBarHeight
                padding 0 toRem(5)
                .music-cover {
                    display inline-block
                    width toRem(36)
                    height toRem(36)
                    border 1px solid #fff
                    box-shadow 0 0 toRem(2) rgba(0, 0, 0, 0.2)
                    overflow hidden
                    img {
                        display block
                        width 100%
                    }
                }
                .music-info {
                    flex 1
                    font-size toRem(12)
                    overflow hidden
                    .info-name {
                        text-overflow ellipsis
                        white-space nowrap
                        overflow hidden
                    }
                    .info-author {
                        text-overflow ellipsis
                        white-space nowrap
                        overflow hidden
                        margin-top toRem(5)
                    }
                }
                .music-control {
                    display flex
                    align-items center
                    .control-icon {
                        flex-center()
                        width toRem(34)
                        height toRem(34)
                        line-height 1
                        color $normalColor
                        font-size toRem(22)
                        margin 0 toRem(8)
                        border 1px solid $normalColor
                        border-radius 100%
                        background-color #fff
                        &.control-icon-mid {
                            width toRem(38)
                            height toRem(38)
                            font-size toRem(26)
                        }

                    }
                }
            }
        }
        .progress-bar {
             height: toRem(1.5);
             background: rgba(255, 255, 255, 0.9);
             .progress-bar-inner {
                 width: 0;
                 height: 100%;
                 background-color: $appColor;
             }
         }
    }
</style>