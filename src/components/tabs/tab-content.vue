<style lang="scss" rel="scss">
    .vue-tab-content {
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        height: 100%;

        .vue-tab-content-wrap {
            height: 100%;
            display: flex;
            position: relative;
        }

        .swipe-transition {
            transition: transform 150ms ease-in-out;
        }
    }
</style>

<template>
    <div @touchstart.stop="startDrag"
         @touchmove.stop="onDrag"
         @touchend.stop="endDrag"
         class="vue-tab-content">
        <div ref="wrap"
             class="vue-tab-content-wrap">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="babel">

    const on = (function() {
        if (document.addEventListener) {
            return function(ele, evt, handler) {
                if (ele && evt && handler) {
                    ele.addEventListener(evt, handler, false);
                }
            };
        } else {
            return function(ele, evt, handler) {
                if (ele && evt && handler) {
                    ele.attachEvent('on' + evt, handler);
                }
            };
        }
    })();

    const off = (function() {
        if (document.removeEventListener) {
            return function(ele, evt, handler) {
                if (ele && evt) {
                    ele.removeEventListener(evt, handler, false);
                }
            };
        } else {
            return function(ele, evt, handler) {
                if (ele && evt) {
                    ele.detachEvent('on' + evt, handler);
                }
            };
        }
    })();

    const once = function(el, evt, fn) {
        let listener = function() {
            if (fn) {
                fn.apply(this, arguments)
            }
            off(el, evt, listener)
        };
        on(el, evt, listener)
    };

    export default {
        name: 'v-tab-content',

        props: {
            value: {},
            swipeable: {
                type: Boolean,
                default: true
            }
        },

        data () {
            return {
                start: { x: 0, y: 0 },
                swiping: false,
                activeItems: [],
                currentActive: this.value
            };
        },

        watch: {
            value(val) {
                this.currentActive = val;
            },

            currentActive(val, oldValue) {
                this.$emit('input', val);
                if (!this.swipeable) return;
                this.swipeLeaveTransition(this.arrayFindIndex(oldValue));
            }
        },

        mounted () {
            if (!this.swipeable) return;

            this.wrap = this.$refs.wrap;
        },

        methods: {
            swipeLeaveTransition(lastIndex = 0) {
                if (typeof this.index !== 'number') {
                    this.index = this.arrayFindIndex(this.currentActive);
                    this.swipeMove(-lastIndex);
                }

                setTimeout(() => {
                    this.wrap.classList.add('swipe-transition');
                    this.swipeMove(-this.index);

                    once(this.wrap, 'webkitTransitionEnd', _ => {
                        this.wrap.classList.remove('swipe-transition');
                        this.wrap.style.webkitTransform = '';
                        this.swiping = false;
                        this.index = null;
                    });
                }, 0);
            },

            swipeMove(index) {
                let offset = index * this.$refs.wrap.clientWidth;
                this.wrap.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
                this.swiping = true;
            },

            startDrag(evt) {
                if (!this.swipeable ||
                    document.body.classList.contains('popup') ||
                    document.body.classList.contains('modal-up')) return;
                evt = evt.changedTouches ? evt.changedTouches[0] : evt;
                this.dragging = true;
                this.start.x = evt.pageX;
                this.start.y = evt.pageY;
            },

            onDrag(evt) {
                if (document.body.classList.contains('popup') ||
                    document.body.classList.contains('modal-up')) return;
                if (!this.dragging) return;
                let swiping;
                let width = this.$refs.wrap.clientWidth;
                const e = evt.changedTouches ? evt.changedTouches[0] : evt;
                const offsetTop = e.pageY - this.start.y;
                const offsetLeft = e.pageX - this.start.x;
                const y = Math.abs(offsetTop);
                const x = Math.abs(offsetLeft);

                swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
                if (!swiping) return;
                evt.preventDefault();

                const len = this.$children.length - 1;
                const index = this.arrayFindIndex(this.currentActive);
                const currentPageOffset = index * width;
                const offset = offsetLeft - currentPageOffset;
                const absOffset = Math.abs(offset);

                // 滑动距离大于页面的最大可视宽度
                // 右滑(page--) 且 滑动距离小于页面宽度
                if (absOffset > len * width ||
                (offset > 0 && offset < width)) {
                    if (x > document.body.offsetWidth / 5) {
                        this.$emit('opendraw', absOffset > len * width)
                    }
                    this.swiping = false;
                    return;
                }

                this.offsetLeft = offsetLeft;
                this.index = index;
                this.swipeMove(offset / width);
            },

            endDrag() {
                if (!this.swiping) return;

                const direction = this.offsetLeft > 0 ? -1 : 1;
                const isChange = Math.abs(this.offsetLeft) > (this.$refs.wrap.clientWidth / 4);

                if (isChange) {
                    this.index += direction;
                    const child = this.$children[this.index];
                    if (child) {
                        this.currentActive = child.name;
                        return;
                    }
                }

                this.swipeLeaveTransition();
            },

            arrayFindIndex (name) {
                let arr = this.$children;
                for (let i=0; i<arr.length; ++i) {
                    if (arr[i].name === name) {
                        return i
                    }
                }
            }
        }
    };
</script>