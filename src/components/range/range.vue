<style lang="scss">
    .vue-app-range-container {
        position: relative;
        display: flex;
        box-sizing: border-box;

        & > * {
            display: flex;
            display: -webkit-box;
        }

        .vue-app-range {
            overflow: hidden;
            border-radius: 4px;
            position: relative;
            flex: 1;
        }

        .vue-app-range-runway {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            background-color: #e5e9ef;
        }

        .vue-app-range-progress {
            position: absolute;
            left: 0;
            display: block;
            background-color: #00a1d6;
        }

        .vue-app-range-loading {
            position: absolute;
            display: block;
            background-color: #8adced;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
        }

        .vue-app-range-thumb {
            background-color: #fff;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 50%;
            box-shadow: 0 1px 3px rgba(0,0,0,.4);
        }

        .vue-app-range-disabled {
            opacity: 0.5;
        }
    }
</style>

<template>
    <div class="vue-app-range-container"
         :style="containerStyle"
         :class="{ 'vue-app-range-disabled': disabled }"
         @touchmove.stop
         @click.stop>
        <div class="vue-app-range"
             ref="content">
            <div class="vue-app-range-runway"
                 @click.stop="handleClick">
            </div>
            <div class="vue-app-range-loading"
                 v-if="loading"
                 @click.stop="handleClick"
                 :style="{ width: loading / max * 100 + '%', height: barSize + 'px' }">
            </div>
            <div class="vue-app-range-progress"
                 @click.stop="handleClick"
                 :style="progressStyle">
            </div>
        </div>
        <div class="vue-app-range-thumb"
             :style="thumbStyle"
             ref="thumb"
             @click.stop>
        </div>
    </div>
</template>

<script lang="babel">
    import draggable from './draggable';

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
        name: 'v-range',

        props: {
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 0
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number
            },
            loading: {
                type: Number,
                default: 0
            },
            barSize: {
                type: Number,
                default: 6
            },
            tailSize: {
                type: Number,
                default: 14
            },
            vertical: {
                type: Boolean,
                default: false
            }
        },

        watch: {
            'value' (val) {
                this.curRange = val
            },

            'curRange' (val) {
                this.$emit('input', val)
            }
        },

        computed: {
            containerStyle() {
                let style = {};
                let size = (this.tailSize - this.barSize) / 2 + 'px';
                if (this.vertical) {
                    style.paddingLeft = size;
                    style.paddingRight = size;
                    style.height = '100%';
                    style.width = this.tailSize + 'px'
                } else {
                    style.paddingTop = size;
                    style.paddingBottom = size;
                    style.width = '100%';
                    style.height = this.tailSize + 'px'
                }

                return style
            },

            progressStyle() {
                let style = {};
                let offset = this.progress();

                if (this.vertical) {
                    style.width = this.barSize + 'px';
                    style.height = offset + '%';
                    style.top =  100 - offset + '%';
                } else {
                    style.width = offset + '%';
                    style.height = this.barSize + 'px';
                    style.left = 0;
                }

                return style
            },

            thumbStyle() {
                let style = {};

                style.width = this.tailSize + 'px';
                style.height = this.tailSize + 'px';

                if (this.vertical) {
                    style.top = 100 - this.progress() - this.offset + '%';
                } else {
                    style.left = this.progress() - this.offset + '%';
                }

                return style
            }
        },

        data () {
            return {
                curRange: this.value,
                dragState: null,
                offset: 0
            }
        },

        methods: {
            progress() {
                const value = this.value;
                if (typeof value === 'undefined' || value === null) return 0;
                return Math.floor((value - this.min) / (this.max - this.min) * 100)
            },

            getOffset() {
                this.offset = this.tailSize / (this.vertical ? this.$refs.content.offsetHeight : this.$refs.content.offsetWidth) * 50
            },

            handleClick(event) {
                if (this.disabled) return;
                this.getOffset();
                this.getPosition(event)
            },

            getPosition(event) {
                const contentBox = this.$refs.content.getBoundingClientRect();
                let delta, newPosition, baseOffset, maxOffset;
                if ( ! this.dragState) {
                    this.getThumbPosition()
                }

                if (this.vertical) {
                    baseOffset = this.dragState.y;
                    maxOffset = contentBox.height;
                    delta = event.pageY - contentBox.top - baseOffset;
                } else {
                    baseOffset = this.dragState.x;
                    maxOffset = contentBox.width;
                    delta = event.pageX - contentBox.left - baseOffset;
                }

                if (this.step) {
                    const stepCount = Math.ceil((this.max - this.min) / this.step);
                    newPosition = (baseOffset + delta) - (baseOffset + delta) % (maxOffset / stepCount);
                } else {
                    newPosition = baseOffset + delta;
                }

                let newProgress = newPosition / maxOffset;

                if (newProgress < 0) {
                    newProgress = 0;
                } else if (newProgress > 1) {
                    newProgress = 1;
                }

                if (this.vertical) {
                    newProgress = 1 - newProgress;
                }

                const result = Math.round(this.min + newProgress * (this.max - this.min));

                this.$emit('rangeChangeEvent', result);
                this.curRange = result
            },

            getThumbPosition() {
                const contentBox = this.$refs.content.getBoundingClientRect();
                const thumbBox = this.$refs.thumb.getBoundingClientRect();

                this.dragState = {
                    x: thumbBox.left - contentBox.left,
                    y: thumbBox.top - contentBox.top
                }
            }
        },

        mounted() {
            this.getOffset();

            draggable(this.$refs.thumb, {
                start: () => {
                    if (this.disabled) return;
                    this.getThumbPosition()
                },
                drag: (event) => {
                    this.handleClick(event)
                },
                end: () => {
                    if (this.disabled) return;
                    this.dragState = null
                }
            });

            let self = this;
            addEvent(window, 'resize', function () {
                self.getOffset()
            })
        }
    }
</script>