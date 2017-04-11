<style lang="scss" scoped>
    $range-radius: 4px;

    .vue-app-range-container {
        box-sizing: border-box;
    }

    .vue-app-range {
        position: relative;
        border-radius: $range-radius;
        background-color: #e5e9ef;

        .vue-app-range-progress, .vue-app-range-loading {
            border-radius: $range-radius;
            position: absolute;
            left: 0;
            bottom: 0;
        }

        .vue-app-range-progress {
            background-color: #00a1d6;
            z-index: 2;
        }

        .vue-app-range-loading {
            background-color: #8adced;
            z-index: 1;
        }

        .vue-app-range-tail {
            background-color: #fff;
            box-sizing: border-box;
            border: 1px solid #e5e9ef;
            border-radius: 50%;
            position: absolute;
            transition: box-shadow .3s ease-in-out;
            z-index: 3;

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
                 @touchmove.stop.prevent="handleDragEvent"
                 @mousemove.prevent="handleMouseEvent"
                 @mousedown="dragging = true">
            </div>
        </div>
    </div>
</template>

<script lang="babel">

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
                default: 0
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
                let size = this.size * 2;
                if (size < 14) {
                    size = 14
                }
                size = (size - this.size) / 2 + 'px';
                if (this.vertical) {
                    style.paddingLeft = size;
                    style.paddingRight = size;
                    style.height = '100%';
                    style.width = size * 2 + this.size + 'px'
                } else {
                    style.paddingTop = size;
                    style.paddingBottom = size;
                    style.width = '100%'
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
                let size = this.size * 2;
                if (size < 14) {
                    size = 14
                }
                let base = (this.size - size) / 2;
                let doubleBorderSize = 2;

                style.width = size + 'px';
                style.height = size + 'px';

                if (this.vertical) {
                    style.top = 0;
                    style.left = base + 'px';
                    style.transform = `translate3d(0px, ${((this.max - this.curRange) / this.max * this.warpSize) - doubleBorderSize}px, 0px)`;
                } else {
                    style.left = 0;
                    style.top = base + 'px';
                    style.transform = `translate3d(${base + (this.curRange / this.max * this.warpSize) - doubleBorderSize}px, 0px, 0px)`;
                }

                return style
            },

            loadingStyle () {
                let style = {};

                if (this.vertical) {
                    style.width = '100%';
                    style.height = this.loading / this.max * this.warpSize + 'px';
                } else {
                    style.height = '100%';
                    style.width = this.loading / this.max * this.warpSize + 'px'
                }

                return style
            },

            progressStyle () {
                let style = {};

                if (this.vertical) {
                    style.width = '100%';
                    style.height = this.curRange / this.max * this.warpSize + 'px';
                } else {
                    style.height = '100%';
                    style.width = this.curRange / this.max * this.warpSize + 'px'
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
                result = parseFloat(result);

                if (result < this.min) {
                    result = this.min
                } else if (result > this.max) {
                    result = this.max
                } else {
                    if (this.step) {
                        let remainder = result % this.step;
                        if (remainder) {
                            result += (this.step - remainder)
                        }
                    }
                }

                this.$emit('rangeChangeEvent', result);

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

            getWarpSize (resize = false) {
                if ( ! this.warpWidth || resize) {
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
        },

        mounted () {
            let self = this;
            addEvent(window, 'resize', function () {
                self.getWarpSize(true)
            })
        }
    }
</script>