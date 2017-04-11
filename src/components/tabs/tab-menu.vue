<style lang="scss" rel="scss">
    $menu-height: 40px;
    $menu-transition: 150ms ease-in-out;
    $menu-selected-color: #39f;

    .vue-tab-menu-container {
        overflow: hidden;
        height: $menu-height;
        min-height: $menu-height;
        background-color: #fff;

        .vue-tab-menu {
            box-sizing: border-box;
            height: $menu-height * 2;
            position: relative;
            display: flex;
            flex-direction: row;
            overflow-y: hidden;
            overflow-x: auto;
            padding-bottom: $menu-height;

            .button {
                box-sizing: border-box;
                flex: 1;
                height: $menu-height;
                transition: $menu-transition;
                font-size: 12px;
                white-space: nowrap;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0 6px;

                &.vue-tab-menu-selected {
                    color: $menu-selected-color;
                }
            }

            $line-height: 2px;
            .vue-tab-menu-line {
                height: 2px;
                box-sizing: border-box;
                background-color: $menu-selected-color;
                position: absolute;
                top: $menu-height - $line-height;
                z-index: 1;
                transition: $menu-transition;
                transform-origin: 0 0;
            }
        }
    }

    .vue-tab-menu-fixed {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>

<template>
    <div class="vue-tab-menu-container"
         :class="[{ 'vue-tab-menu-fixed' : fixed }, className]">
        <div class="vue-tab-menu"
             @scroll="handleScroll"
             ref="warp">
            <div class="button"
                 :class="{'vue-tab-menu-selected': index === idx}"
                 :style="lineMargin"
                 v-for="(text, idx) in menu"
                 ref="buttons"
                 @click="name = text">
                <div v-if="showIcon"
                     class="vue-tab-menu-icon"
                     :class="[showIcon ? 'icon-' + idx : '']"
                ></div>
                <span v-text="text"></span>
            </div>
            <div v-if="showLine" class="vue-tab-menu-line" ref="line"></div>
        </div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'v-tab-menu',

        props: {
            value: {},
            className: {
                type: String
            },
            menu: {
                type: Array,
                required: true
            },
            complex: {
                type: Boolean,
                default: false
            },
            showLine: {
                type: Boolean,
                default: true
            },
            showIcon: {
                type: Boolean,
                default: false
            },
            lineWidth: {
                type: Number,
                default: 0
            },
            fixed: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            lineMargin () {
                if (this.showLine && this.lineWidth && this.$refs.buttons) {
                    return {
                        margin: `0 ${(this.$refs.buttons[0].clientWidth - this.lineWidth) / 2}px)`
                    }
                }
            }
        },

        watch: {
            'value' (val, oldVal) {
                this.toLeft = this.arrayFindIndex(val) < this.arrayFindIndex(oldVal)
                this.name = val
            },

            'name' (val, oldVal) {
                this.toLeft = this.arrayFindIndex(val) < this.arrayFindIndex(oldVal)
                this.$emit('input', val)
                this.menuSwitch(val)
            }
        },

        data () {
            return {
                name: '',
                index: 0,
                warpWidth: 0,
                noMore: null,
                toLeft: false,
                maxOffset: 0
            }
        },

        methods: {

            menuSwitch (name) {
                let i = this.arrayFindIndex(name);
                let dom = this.$refs.warp;
                let attack = this.$refs.buttons[i];

                if (this.$refs.warp.clientWidth && !this.warpWidth) {
                    this.warpWidth = dom.clientWidth
                }

                if (this.noMore === null && this.warpWidth) {
                    let lastBtn = this.$refs.buttons[this.$refs.buttons.length - 1];
                    this.noMore = lastBtn.clientWidth + lastBtn.offsetLeft <= this.warpWidth
                    // iOS bug, offsetLeft, clientWidth 最大为屏幕宽度
                    this.maxOffset = lastBtn.clientWidth + lastBtn.offsetLeft - this.warpWidth
                }

                if (this.showLine) {
                    let target = this.$refs.line;
                    if (this.lineWidth) {
                        target.style.transform = `translate3d(${attack.offsetLeft + (attack.clientWidth - this.lineWidth) / 2}px, 0px, 0px)`;
                        target.style.width = this.lineWidth + 'px'
                    } else {
                        target.style.transform = `translate3d(${attack.offsetLeft}px, 0px, 0px)`;
                        target.style.width = attack.clientWidth + 'px'
                    }
                }

                if ( ! this.noMore) {
                    let offset, role, endOffset;
                    let origin = dom.scrollLeft;

                    if (this.toLeft) {
                        if (i) {
                            let beforeBtn = this.$refs.buttons[i - 1];
                            offset = beforeBtn.clientWidth
                            role = beforeBtn.getBoundingClientRect().left < offset
                            endOffset = origin - offset < 0 ? 0 : origin - offset
                        } else {
                            role = offset = this.$refs.buttons[0].offsetLeft
                            endOffset = 0
                        }
                        if (role) {
                            let divide = offset / 15
                            let timer = setInterval(() => {
                                if (dom.scrollLeft === endOffset) {
                                    clearInterval(timer)
                                } else {
                                    dom.scrollLeft -= divide
                                    if (dom.scrollLeft < endOffset) {
                                        dom.scrollLeft = endOffset
                                    }
                                }
                            }, 10)
                        }
                    } else {
                        if (attack.getBoundingClientRect().left > this.warpWidth / 2) {
                            if (this.$refs.buttons[i + 1]) {
                                offset = this.$refs.buttons[i + 1].clientWidth
                                endOffset = origin + offset > this.maxOffset ? this.maxOffset : origin + offset
                            } else {
                                offset = attack.clientWidth
                                endOffset = this.maxOffset
                            }
                            let divide = offset / 15
                            let timer = setInterval(() => {
                                if (dom.scrollLeft === endOffset) {
                                    clearInterval(timer)
                                } else {
                                    dom.scrollLeft += divide
                                    if (dom.scrollLeft > endOffset) {
                                        dom.scrollLeft = endOffset
                                    }
                                }
                            }, 10)
                        }
                    }
                }
                this.index = i
            },

            handleScroll (evt) {
                if (evt.currentTarget.scrollLeft === this.maxOffset) {
                    evt.preventDefault()
                }
            },

            arrayFindIndex (name) {
                let arr = this.menu;
                for (let i=0; i<arr.length; ++i) {
                    if (arr[i] === name) {
                        return i
                    }
                }
            }
        },

        mounted () {
            this.menuSwitch(this.value);
            if (this.fixed) {
                let self = this.$el;
                let parent = self.parentNode;
                let el = document.createElement('div');
                el.style.height = self.offsetHeight + 'px';
                el.style.minHeight = self.offsetHeight + 'px';
                el.classList.add('vue-tab-menu-block');
                parent.insertBefore(el, self)
            }
        }
    }
</script>