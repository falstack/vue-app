<style lang="scss" rel="scss" scoped>
    $range-radius: 4px;

    .vue-app-range-container {
        box-sizing: border-box;
    }

    .vue-app-range {
        cursor: pointer;
        position: relative;
        border-radius: $range-radius;
        background-color: #e5e9ef;

        .vue-app-range-progress, .vue-app-range-loading {
            cursor: pointer;
            border-radius: $range-radius;
            position: absolute;
            left: 0;
            bottom: 0;
        }

        .vue-app-range-progress {
            background-color: #00a1d6;
            z-index: 10;
        }

        .vue-app-range-loading {
            background-color: #8adced;
            z-index: 5;
        }

        .vue-app-range-tail {
            cursor: pointer;
            background-color: #fff;
            box-sizing: border-box;
            border: 1px solid #e5e9ef;
            border-radius: 50%;
            position: absolute;
            transition: box-shadow .3s ease-in-out;
            z-index: 15;

            &:hover {
                box-shadow: 0 0 3px #00a1d6;
            }
        }
    }
</style>

<template>
    <div class="vue-app-range-container"
         :style="containerStyle"
         @mouseout.prevent="dragging = false"
         @mouseup.prevent="dragging = false"
         @mousemove.prevent>
        <div class="vue-app-range"
             :style="rangeStyle"
             @click="handleClick">
            <div class="vue-app-range-progress"
                 :style="progressStyle">
            </div>
            <div class="vue-app-range-loading"
                 v-if="loading"
                 :style="loadingStyle">
            </div>
            <div class="vue-app-range-tail"
                 :style="tailStyle"
                 @touchmove.stop="handleDragEvent"
                 @mousemove.prevent="handleMouseEvent"
                 @mousedown="dragging = true">
            </div>
        </div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'v-range',

        props: {
            value: {},
            size: {
                type: Number,
                default: 6
            },
            max: {
                type: Number,
                default: 100
            },
            min: {
                type: Number,
                default: 0
            },
            step: {
                type: Number,
                default: 1
            },
            vertical: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Number,
                default: 0
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
            containerStyle () {
                let style = {};
                let size = this.size * 3;
                if (size < 20) {
                    size = 20
                }
                size = (size - this.size) / 2 + 'px';
                if (this.vertical) {
                    style.paddingLeft = size;
                    style.paddingRight = size;
                } else {
                    style.paddingTop = size;
                    style.paddingBottom = size;
                }

                return style
            },

            rangeStyle () {
                let style = {};

                if (this.vertical) {
                    style.width = this.size + 'px';
                    style.height = '100%'
                } else {
                    style.height = this.size + 'px';
                    style.width = '100%'
                }

                return style
            },

            tailStyle () {
                this.getWarpSize();
                let style = {};
                let size = this.size * 3;
                if (size < 20) {
                    size = 20
                }
                let base = (this.size - size) / 2;
                let doubleBorderSize = 2;

                style.width = size + 'px';
                style.height = size + 'px';

                if (this.vertical) {
                    style.top = 0;
                    style.left = base + 'px';
                    style.transform = `translate3d(0px, ${((100 - this.curRange) / 100 * this.warpSize) - doubleBorderSize}px, 0px)`;
                } else {
                    style.left = 0;
                    style.top = base + 'px';
                    style.transform = `translate3d(${base + (this.curRange / 100 * this.warpSize) - doubleBorderSize}px, 0px, 0px)`;
                }

                return style
            },

            loadingStyle () {
                let style = {};

                if (this.vertical) {
                    style.width = '100%';
                    style.height = this.loading / 100 * this.warpSize + 'px';
                } else {
                    style.height = '100%';
                    style.width = this.loading / 100 * this.warpSize + 'px'
                }

                return style
            },

            progressStyle () {
                let style = {};

                if (this.vertical) {
                    style.width = '100%';
                    style.height = this.curRange / 100 * this.warpSize + 'px';
                } else {
                    style.height = '100%';
                    style.width = this.curRange / 100 * this.warpSize + 'px'
                }

                return style
            }
        },
        data () {
            return {
                curRange: this.value,
                warpSize: 0,
                warpOffset: 0,
                dragging: false
            }
        },
        methods: {
            handleClick (evt) {
                this.getWarpSize();
                let result = this.vertical ? ((1 - (evt.clientY - this.warpOffset) / this.warpSize) * 100).toFixed(2) : ((evt.clientX - this.warpOffset) / this.warpSize * 100).toFixed(2);

                if (result < this.min) {
                    result = this.min
                } else if (result > this.max) {
                    result = this.max
                }

                this.curRange = result
            },

            handleMouseEvent (evt) {
                if (this.dragging) {
                    this.handleClick(evt)
                }
            },

            handleDragEvent (evt) {
                this.handleClick(evt.changedTouches ? evt.changedTouches[0] : evt)
            },

            getWarpSize () {
                if ( ! this.warpWidth) {
                    if ( ! this.$el) {
                        setTimeout(() => {
                            this.getWarpSize()
                        }, 10);
                        return
                    }
                    if (this.vertical) {
                        this.warpSize = this.$el.clientHeight;
                        this.warpOffset = this.$el.getBoundingClientRect().top
                    } else {
                        this.warpSize = this.$el.clientWidth;
                        this.warpOffset = this.$el.getBoundingClientRect().left
                    }
                }
            }
        }
    }
</script>