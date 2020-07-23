<template>
    <div class="popup">
        <!-- 播放列表 -->
        <mt-popup class="play-list-sheet" v-model="playListVisible" position="bottom">
            <div class="play-list-container">
                <div class="play-list-header">
                    <div class="play-list-mode-btn left">清空</div>
                    <div class="play-list-title">
                        播放列表
                        <span class="play-list-count">{{ playList.length }}首</span>
                    </div>
                    <div class="play-list-mode-btn right" :class="handleModeIcon()" @click="playModeVisible = true"></div>
                </div>

                <ul class="play-list" v-if="playList && playList.length > 0">
                    <li class="play-list-item" v-for="item in playList" :key="item.sound.id" :class="{'playing' : audio.data.sound.id === item.sound.id}" @click="musicChange(item)">
                        <div class="item-name">
                            <div class="name-icon-container">
                                <div class="name-icon" :class="audio.data.sound.id === item.sound.id ? 'my-icon-circle-play' : 'small-circle'"></div>
                            </div>
                            <div class="name-value" :class="audio.data.sound.id === item.sound.id ? 'onPlay': ''"> {{ item.sound.name }}</div>
                        </div>
                        <div class="item-close my-icon-close" @click.stop="deletePlayListItem(item, index)"></div>
                    </li>
                </ul>
                <div class="nothing" v-else> 什么都没有了 T T~</div>
            </div>
        </mt-popup>
        <!-- 播放模式 -->
        <mt-popup class="play-mode-sheet" v-model="playModeVisible" position="bottom">
            <div class="play-mode-list">
                <mt-cell class="play-mode-item" :class="{'active' : playMode === item.value}" v-for="(item, index) in playModeOptions" :key="index" :title="item.label" @click.native="playModeChange(item)">
                    <div class="item-icon" :class="item.icon"></div>
                </mt-cell>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {ArrayOptions, findActiveMode} from "@/common/utils/playMode";

    export default {
        data() {
            return {
                playListVisible: false,
                playModeVisible: false,
                playModeOptions: ArrayOptions
            }
        },
        computed: {
            ...mapState([
                'audio',
                'playList',
                'playMode'
            ])
        },
        methods: {
            ...mapMutations([
                'SET_AUDIO_DATA',
                'SET_PLAY_LIST',
                'SET_PLAY_MODE'
            ]),
            musicChange(item) {
                this.playListVisible = false;
                this.SET_AUDIO_DATA(item);
            },
            playModeChange(item) {
                this.playModeVisible = false;
                this.SET_PLAY_MODE(item.value);
            },
            handleModeIcon() {
              return findActiveMode(this.playMode).icon;
            },
            // 清空播放列表
            clearPlayList() {
                this.SET_PLAY_LIST([])
            },
            // 删除播放条目
            deletePlayListItem(item, index) {
                this.SET_PLAY_LIST(this.playList.splice(index, 1));
            },
            togglePlayListVisible() {
                this.playListVisible = !this.playListVisible;
            }
        }
    }
</script>

<style lang="stylus">
    .popup {
        .v-modal {
            opacity: 0;
        }
        &.playMode {
            .v-modal {
                opacity: 0.8;
            }
        }
    }
    .play-list-sheet {
        width: 100%;
        border-top: 1px solid $borderColor;
        .play-list-container {
            margin-bottom: $musicBarHeight;
        }
        .play-list-header {
            position: relative;
            flex-center();
            height: toRem(36);
            color: $appColor;
            font-size: toRem(14);
            margin-top: toRem(8);
            .play-list-title {
                white-space: nowrap;
                .play-list-count {
                    font-size: toRem(12);
                }
            }
            .play-list-mode-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: toRem(20);
                &.left {
                    left: toRem(18);
                    font-size: toRem(14);
                }
                &.right {
                    right: toRem(5);
                    width: toRem(36);
                    height: toRem(36);
                }
            }
        }
        .play-list {
            position: relative;
            max-height: toRem(135);
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            .play-list-item {
                position: relative;
                display: flex;
                align-items: center;
                padding: toRem(7) toRem(8);
                border-bottom: 1px solid $borderColor;
                line-height: 1;
                .item-name {
                    display: flex;
                    align-items: center;
                    .name-icon-container {
                        flex-center();
                        width: toRem(18);
                        height: toRem(18);
                        margin: 0 toRem(5);
                        .name-icon {
                            color: $appColor;
                            font-size: toRem(18);
                            &.smallCircle {
                                width: toRem(4);
                                height: toRem(4);
                                border-radius: 100%;
                                background: $bgColor;
                            }
                        }
                    }
                    .name-value {
                        text-ellipsis();
                        max-width: toRem(295);
                        color: $infoColor;
                        font-size: toRem(14);
                        &.onPlay {
                            color: $mainColor;
                        }
                    }
                }
                .item-close {
                    color: $lessColor;
                    font-size: toRem(20);
                    padding: toRem(5) toRem(6);
                    margin-left: auto;
                }
            }
        }
        .play-list-nothing {
            flex-center();
            color: $infoColor;
            font-size: toRem(14);
            text-align: center;
            height: toRem(60);
        }
    }
    .play-mode-sheet {
        width: 100%;
        z-index: 10000 !important;
        .play-mode-list {
            position: relative;
            width: 100%;
            padding: toRem(8) 0;
            .play-mode-item {
                width: 100%;
                min-height: toRem(48);
                background: none;
                &.active {
                    .mint-cell-text {
                        color: $appColor;
                    }
                    .item-icon {
                        color: $appColor;
                    }
                }
                .mint-cell-wrapper {
                    padding: 0 toRem(16);
                    background: none;
                }
                .mint-cell-text {
                    color: $lessColor;
                    font-size: toRem(14);
                }
                .item-icon {
                    color: $lessColor;
                    font-size: toRem(24);
                }
            }
        }
    }
</style>
