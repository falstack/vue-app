<style lang="scss" scoped>
    @font-face {font-family: "iconfont-video";
        src: url('./fonts/iconfont.eot?t=1491818377252');
        src: url('./fonts/iconfont.eot?t=1491818377252#iefix') format('embedded-opentype'),
        url('./fonts/iconfont.woff?t=1491818377252') format('woff'),
        url('./fonts/iconfont.ttf?t=1491818377252') format('truetype'),
        url('./fonts/iconfont.svg?t=1491818377252#iconfont') format('svg');
    }

    $color-border : #e5e9ef;
    $color-over : #00a1d6;
    $color-load : #8adced;
    $tool-height : 40px;
    $tool-btn-width : 40px;

    .vue-app-video {
        box-sizing: border-box;
        overflow: hidden;
        background-color: #000;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid $color-border;
        position: relative;
        font-family: 'Microsoft YaHei',Arial,Helvetica,sans-serif;
        display: flex;
        flex-direction: column;

        .vue-app-video-box {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            background-color: #000;

            video {
                background-color: #000;
                width: 100%;
                height: 100%;
            }

            .vue-app-video-init {
                position: absolute;
                width : 100%;
                height : 100%;
                left: 0;
                top: 0;
                background-color:#000;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url(data:image/gif;base64,R0lGODlhZADCAPfQADIqKVVTUyMYFd/f3+rr68bHyFNRUL6/wH9+f9PT1Ofn5+zs7Ojo6UM/P4uLjP7+/kVCQd7e3/n5+efo6Pf390A8O/v7+/39/UdEQ8zMzfr6+nJxcuXm5vPz9CQZFsrLy+/v8E9MTOTk5Ly9vfHx8s7Pzzk0M9bW16enqJWVlrm6ujQuLN/g4Pj4+Pz8/JOUlG1tbTs2NeHh4qSlpba2t0xJSPPz80ZDQkRBQNjY2WdmZsbGx9nZ2u7v746Oj0tIR/Dw8E5LS6eoqZmZmVBNTUI+Pj05OD46OX19fTYvLiMZFjMsKrKztL/AwNLS03h3d8jJyVJQT3Nyc+Tl5aCgoaurrOnq6qOkpMLCw7q6u5CQkOvr6+7u7t3e3sfIyD87OqKjo2FgX4B/gFdVVZ2dnnp6emJhYTApJ7u8vCohH3x8fK2trnFwcbCwsSYcGXt7e6amp15cXIaGhuLi4kE9PKysrWVkZJqamm1sbCsjIOzt7fLy8omJiTw3NmhnZ5OTk25ubi0kIsvMzJGRkePj5PX19ikgHdna2oWFhcnJyqqrqygeHKGhoqmqqtbX156en4eHh2RjY4yMjcnKy76+v9XV1vHx8Xd2dpucnMXFxu3t7i8nJa6vr5SVlZydncHCwjcxL7S1tfT09E1KSTgyMY+PkJ+foISEhNPU1NTV1eLj40pGRs3Nzmxra19eXc/P0FxaWnBvcLW1ti4mJJaWl4ODg2NiYq+wsIiIiIGAgSUbGFlXV4qKi9DQ0c3OzsPExHl5eXV0dGloaPX19fb29qGiolZUVFtZWWBfXmZlZXZ1dXh4eNDR0VpYWJeXmP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3MDg4OEU4N0U4NjFFNjExQjY3RUEwQzUxQzg3ODhGMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4M0ZDMEU1MTYzNTExMUU2QkM2Q0UwOTUzMEJEQUU2NSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4M0ZDMEU1MDYzNTExMUU2QkM2Q0UwOTUzMEJEQUU2NSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjcwODg4RTg3RTg2MUU2MTFCNjdFQTBDNTFDODc4OEYyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjcwODg4RTg3RTg2MUU2MTFCNjdFQTBDNTFDODc4OEYyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3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);
                z-index: 3;
            }

            .vue-app-video-waiting {
                display: none;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -30px;
                margin-top: -30px;
                width: 60px;
                height: 60px;
                border-radius: 5px;
                background-color: rgba(0, 0, 0, 0.8);
                font-family: 'iconfont-video' !important;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                z-index: 1;

                &:before {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    content: '\e756';
                    font-size: 40px;
                    text-align: center;
                    line-height: 60px;
                    color: #fff;
                    -webkit-animation: unlimited 1s infinite linear;
                }
            }

            @-webkit-keyframes unlimited {
                0%{
                    -webkit-transform: rotate(0deg);
                }
                50%{
                    -webkit-transform: rotate(180deg);
                }
                100%{
                    -webkit-transform: rotate(360deg);
                }
            }
        }

        .vue-app-video-tool {
            height: $tool-height;
            background-color: #fff;
            border-left: 1px solid $color-border;
            border-right: 1px solid $color-border;
            font-size: 13px;
            display: flex;

            button {
                width: $tool-btn-width;
                height: 100%;
                background-size: 20px;
                transition: .3s ease-in-out;
                outline: none;
                border: none;
                cursor: default;
                font-family: 'iconfont-video' !important;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                position: relative;
                color: #99A2AA;
                background-color: #fff;

                &:before {
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    font-size: 20px;
                    line-height: $tool-height;
                }

                &:hover, &:active {
                    background-color: #F4F5F7;
                    color: #6D757A;
                }
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-active {
        transition: opacity .5s;
        opacity: 0
    }

    .v-tool-full {
        position: absolute;
        bottom: 0;
        left: 0;
        border: none;
        z-index: 2147483650;
        width: 100%;
    }

    .vue-app-video-btn-playing:before {
        content: "\e62a";
    }

    .vue-app-video-btn-paused:before {
        content: "\e6c5";
    }

    .vue-app-video-btn-volume:before {
        content: "\e691";
    }

    .vue-app-video-btn-silent:before {
        content: "\e690";
    }

    .vue-app-video-btn-screen:before {
        content: "\e63e";
    }

    .vue-app-video-btn-full:before {
        content: "\e79f";
    }

    .vue-app-video-btn-voice:hover {
        & + .vue-app-video-voice-bar {
            visibility: visible;
        }
    }

    .vue-app-video-voice-bar {
        background-color: #fff;
        position: absolute;
        width: 40px;
        height: 70px;
        bottom: $tool-height;
        right: 40px;
        border-radius: 5px 5px 0 0;
        border-top: 1px solid $color-border;
        border-left: 1px solid $color-border;
        border-right: 1px solid $color-border;
        padding: 15px 0;
        box-sizing: content-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        visibility: hidden;

        &:hover {
            visibility: visible;
        }
    }

    .vue-app-video-time {
        width: $tool-btn-width;
        height: 100%;
        line-height: $tool-height;
        text-align: center;
        color: #999999;
    }

    .vue-app-video-progress-bar {
        box-sizing: border-box;
        height: 100%;
        margin: 0 10px;
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>

<template>
    <div class="vue-app-video"
         :class="[ className ]"
         ref="box">
        <div class="vue-app-video-box"
             ref="mask"
             @click.stop="handlePlay(true)"
             @dblclick="screen"
             @mousemove="tool">
            <video :preload="auto ? 'auto' : 'metadata'"
                   :poster="poster"
                   :autoplay="auto"
                   ref="video">
                   <source v-for="data in source" :src="data.src" :type="data.type">
            </video>
            <div class="vue-app-video-init"
                 v-if=" ! hiddenToolBar"
                 ref="init">
            </div>
            <div class="vue-app-video-waiting"
                 v-if=" ! hiddenToolBar"
                 ref="waiting">
            </div>
        </div>
        <transition name="fade" v-if=" ! hiddenToolBar">
            <div v-show="state.show"
                 class="vue-app-video-tool"
                 :class="{ 'v-tool-full' : state.isFull }">
                <button :class="[ state.playing ? 'vue-app-video-btn-playing' : 'vue-app-video-btn-paused' ]"
                        @click="handlePlay(false)">
                </button>
                <div class="vue-app-video-time">
                    <span v-text="value.curTime"></span>
                </div>
                <div class="vue-app-video-progress-bar">
                    <v-range v-model="value.playing"
                             :loading="value.loading"
                             :max="value.duration"
                             @rangeChangeEvent="handleSeek"
                    ></v-range>
                </div>
                <div class="vue-app-video-time">
                    <span v-text="value.allTime"></span>
                </div>
                <button class="vue-app-video-btn-voice"
                        :class="[ value.voice ? 'vue-app-video-btn-volume' : 'vue-app-video-btn-silent' ]"
                        @click="handleMuted">
                </button>
                <div class="vue-app-video-voice-bar">
                    <v-range v-model="value.voice"
                             @rangeChangeEvent="volume"
                             :vertical="true"
                    ></v-range>
                </div>
                <button :class="[ state.isFull ? 'vue-app-video-btn-full' : 'vue-app-video-btn-screen' ]"
                        @click="screen">
                </button>
            </div>
        </transition>
    </div>
</template>

<script lang="babel">

    import Range from '../range/range.vue'

    let addEvent = (function () {
        if (document.addEventListener) {
            return function(el, type, fn){
                if (el.length) {
                    for(var i=0; i<el.length; i++) {
                        addEvent(el[i], type, fn);
                    }
                } else {
                    el.addEventListener(type, fn, false);
                }
            };
        } else {
            return function(el, type, fn) {
                if (el.length) {
                    for(var i=0; i<el.length; i++) {
                        addEvent(el[i], type, fn);
                    }
                } else {
                    el.attachEvent('on' + type, function(){
                        return fn.call(el, window.event);
                    });
                }
            };
        }
    })();

    export default {
        name: 'v-video',

        components: {
            vRange: Range
        },

        props: {
            source : {
                default : null,
                required : true
            },
            className: {
                type: String
            },
            poster: {
                type: String
            },
            auto: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            fullScreenStyle () {
                if (this.state.isFull) {
                    return {
                        'z-index' : 2147483649
                    }
                }
            }
        },

        data () {
            return {
                video: null,
                state: {
                    playing: false,
                    isMuted: false,
                    isFull: false,
                    timer: null,
                    show: true,
                    waiting: true,
                    firstPlay: true
                },
                value: {
                    duration: 0,
                    loading: 0,
                    playing: 0,
                    curTime: '00:00',
                    allTime: '00:00',
                    voiceTemp: 0,
                    voice: 60
                },
                touchable: true,
                hiddenToolBar: false
            }
        },

        created () {
            this.hiddenToolBar = window.navigator.userAgent.match(/iPhone|iPad|MicroMessenger/) !== null;
            this.touchable = 'ontouchstart' in window;
            if (this.auto) {
                this.state.playing = true;
                this.state.firstPlay = false
            }
        },

        methods: {
            handlePlay (bool = false) {
                if (this.state.waiting || (this.state.isFull && this.touchable && bool)) return;

                if (this.video.paused) {
                    this.video.play();
                    this.state.playing = true;
                } else {
                    this.video.pause();
                    this.state.playing = false;
                }
            },

            volume (val) {
                this.video.muted = val ? false : true;
                this.value.voice = val;
                this.video.volume = val / 100;
            },

            handleMuted () {
                if (this.touchable) return;

                if (this.state.isMuted) {
                    this.video.muted = false;
                    this.value.voice = this.value.voiceTemp;
                    this.video.volume = this.value.voice / 100;
                    this.state.isMuted = false;
                } else {
                    this.video.muted = true;
                    this.value.voiceTemp = this.value.voice;
                    this.value.voice = 0;
                    this.state.isMuted = true;
                }
            },

            handleSeek (val) {
                this.video.currentTime = val;
                if (this.video.paused) {
                    this.handlePlay(false)
                }
            },

            tool () {
                if (this.state.isFull) {
                    this.state.show = true;
                    this.state.timer = setTimeout(() => {
                        if (this.state.isFull) {
                            this.state.show = false
                        }
                        clearTimeout(this.state.timer);
                    }, 5000)
                }
            },

            screen () {
                if(this.checkIsFullScreen()) {
                    this.exitFullScreen();
                } else {
                    this.launchFullScreen(this.$refs.mask);
                }
            },

            screenToggle() {
                this.state.isFull = this.checkIsFullScreen() === true;
                this.state.show = true;
                this.$refs.box.style.width = "100%";
                this.$refs.box.style.height = "100%";
                this.$refs.mask.style.width = "100%";
                if (this.state.isFull) {
                    this.state.timer = setTimeout(() => {
                        if (this.state.isFull) {
                            this.state.show = false
                        }
                        clearTimeout(this.state.timer);
                    }, 5000)
                } else {
                    clearTimeout(this.state.timer);
                    this.state.show = true;
                }
            },

            exitFullScreen() {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.oRequestFullscreen) {
                    document.oCancelFullScreen()
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen()
                } else {
                    document.IsFullScreen = false
                }
            },

            launchFullScreen(e) {
                if (e.requestFullscreen) {
                    e.requestFullscreen()
                } else if (e.mozRequestFullScreen) {
                    e.mozRequestFullScreen()
                } else if (e.msRequestFullscreen) {
                    e.msRequestFullscreen()
                } else if (e.oRequestFullscreen) {
                    e.oRequestFullscreen()
                } else if (e.webkitRequestFullscreen) {
                    e.webkitRequestFullScreen()
                } else {
                    document.IsFullScreen = true
                }
            },

            checkIsFullScreen () {
                return this.invokeFieldOrMethod(document,'FullScreen') || this.invokeFieldOrMethod(document,'IsFullScreen') || document.IsFullScreen
            },

            invokeFieldOrMethod (ele, method) {
                let usablePrefixMethod;

                ['webkit', 'moz', 'ms', 'o', ''].forEach(function(prefix) {
                    if (usablePrefixMethod) return;
                    if (prefix === '') {
                        method = method.slice(0,1).toLowerCase() + method.slice(1)
                    }
                    let typePrefixMethod = typeof ele[prefix + method];
                    if (typePrefixMethod + '' !== 'undefined') {
                        if (typePrefixMethod === 'function') {
                            usablePrefixMethod = ele[prefix + method]()
                        } else {
                            usablePrefixMethod = ele[prefix + method]
                        }
                    }
                });

                return usablePrefixMethod;
            },

            formatSeconds (second) {
                let h = 0,
                    m = 0,
                    s = 0;
                if (second > 60) {
                    m = parseInt(second / 60);
                    s = (second % 60).toFixed(0);
                    if (m > 60) {
                        h = parseInt(m / 60);
                        m = parseInt(m % 60)
                    }
                } else {
                    s = parseInt(second)
                }
                s = s < 10 ? '0' + s : s;
                m = m < 10 ? '0' + m : m;
                return [h, m, s]
            },
        },
        mounted () {
            let video = this.video = this.$refs.video;
            video.volume = this.value.voice / 100;
            video.controls = this.hiddenToolBar;
            let self = this;

            addEvent(video, 'abort', function () {
                console.log('abort : Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.')
            });

            addEvent(video, 'canplaythrough', function () {
                console.log('canplaythrough : 媒体可以在保持当前的下载速度的情况下不被中断地播放完毕');
                if ( ! self.hiddenToolBar) {
                    self.$refs.waiting.style.display = 'none';
                }
                self.state.waiting = false;
                if (this.paused && ! self.state.firstPlay) {
                    self.handlePlay(false)
                }
            });

            addEvent(video, 'emptied', function () {
                console.log('emptied : The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it');
            });

            addEvent(video, 'error', function () {
                console.log('error : 在发生错误时触发');
            });

            addEvent(video, 'loadeddata', function () {
                console.log('loadeddata : 媒体的第一帧已经加载完毕');
                if ( ! self.hiddenToolBar) {
                    self.$refs.init.style.display = 'none';
                }
            });

            addEvent(video, 'loadedmetadata', function () {
                console.log('loadedmetadata : 媒体的元数据已经加载完毕，现在所有的属性包含了它们应有的有效信息');
                let duration = this.duration;
                let timeArr = self.formatSeconds(duration);
                self.value.duration = duration;
                self.value.allTime = timeArr[1] + ':' + timeArr[2]
            });

            addEvent(video, 'loadstart', function () {
                console.log('loadstart : 媒体开始加载');
            });

            addEvent(video, 'mozaudioavailable', function () {
                console.log('mozaudioavailable');
            });

            addEvent(video, 'play', function () {
                console.log('play : 在媒体回放被暂停后再次开始时触发');
            });

            addEvent(video, 'pause', function () {
                console.log('pause : 播放暂停时触发');
                self.state.playing = false;
                if (self.state.firstPlay) {
                    this.play()
                }
            });

            addEvent(video, 'playing', function () {
                console.log('playing : 在媒体开始播放时触发');
                self.state.firstPlay = false;
                self.state.playing = true;
            });

            addEvent(video, 'ratechange', function () {
                console.log('ratechange : 在回放速率变化时触发');
            });

            addEvent(video, 'seeked', function () {
                console.log('seeked : 在跳跃操作完成时触发');
            });

            addEvent(video, 'seeking', function () {
                console.log('seeking : 在跳跃操作开始时触发');
            });

            addEvent(video, 'stalled', function () {
                console.log('stalled : Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming');
            });

            addEvent(video, 'suspend', function () {
                console.log('suspend : 在媒体资源加载终止时触发，这可能是因为下载已完成或因为其他原因暂停');
            });

            addEvent(video, 'volumechange', function () {
                console.log('volumechange : 在音频音量改变时触发 volume 或 muted');
            });

            addEvent(video, 'canplay', function () {
                console.log('canplay : 缓冲已足够开始时')
            });

            addEvent(video, 'durationchange', function () {
                console.log('durationchange : 视频/音频（audio/video）的时长发生变化');
                let timeArr = self.formatSeconds(this.duration);
                self.value.allTime = timeArr[1] + ':' + timeArr[2]
            });

            addEvent(video, 'waiting', function () {
                console.log('waiting : 在一个待执行的操作（如回放）因等待另一个操作（如跳跃或下载）被延迟时触发');
                if ( ! self.hiddenToolBar) {
                    self.$refs.waiting.style.display = 'block';
                }
                self.state.waiting = true;
                this.pause();
            });

            addEvent(video, 'timeupdate', function () {
                console.log('timeupdate : 元素的currentTime属性表示的时间已经改变');
                let current = this.currentTime;
                let timeArr = self.formatSeconds(current);
                self.value.playing = current;
                self.value.curTime = timeArr[1] + ':' + timeArr[2]
            });

            addEvent(video, 'progress', function () {
                console.log('progress : 正在下载视频');
                let bf = this.buffered;
                if (this.duration > 0) {
                    self.value.loading = bf.end(bf.length - 1)
                }
            });

            addEvent(video, 'ended', function () {
                console.log("ended : 播放完毕");
                self.value.playing = 0;
                self.state.playing = false;
                if ( ! this.paused) {
                    this.pause()
                }
            });

            addEvent(document, 'keydown', function (e) {
                if (e.keyCode == 32) {
                    e.preventDefault();
                    self.handlePlay(true)
                } else if (e.keyCode == 40 && self.checkIsFullScreen()) {
                    let down = self.value.voice - 10;
                    video.volume = down >= 0 ? down / 100 : 0;
                    self.value.voice = down >= 0 ? down : 0
                } else if (e.keyCode == 38 && self.checkIsFullScreen()) {
                    let up = self.value.voice + 10;
                    video.volume = up >= 100 ? 1 : up / 100;
                    self.value.voice = up >= 100 ? 100 : up
                } else if (e.keyCode == 39) {
                    video.currentTime += 5
                } else if (e.keyCode == 37) {
                    video.currentTime -= 5
                }
            });

            addEvent(document, 'fullscreenchange', function () {
                self.screenToggle()
            });

            addEvent(document, 'mozfullscreenchange', function () {
                self.screenToggle()
            });

            addEvent(document, 'webkitfullscreenchange', function () {
                self.screenToggle()
            });

            addEvent(document, 'msfullscreenchange', function () {
                self.screenToggle()
            })
        }
    }
</script>