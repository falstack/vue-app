<style lang="scss" rel="scss">
    $menu-height: 40px;
    $menu-transition: 150ms ease-in-out;
    $menu-selected-color: #39f;

    .vue-tab-menu-container {
        overflow: hidden;
        height: $menu-height;
        min-height: $menu-height;

        .vue-tab-menu {
            box-sizing: border-box;
            height: 200%;
            position: relative;
            display: flex;
            flex-direction: row;
            overflow-y: hidden;
            overflow-x: auto;
            padding-bottom: $menu-height;

            .button {
                box-sizing: border-box;
                flex: 1;
                height: 100%;
                transition: $menu-transition;
                font-size: 12px;
                white-space: nowrap;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 2px 6px 3px;

                &.vue-tab-menu-selected {
                    color: $menu-selected-color;
                }

                &.vue-tab-menu-unMove {
                    position: relative;

                    &:after {
                        content: '';
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        height: 2px;
                        background-color: $menu-selected-color;
                    }
                }
            }

            $line-height: 2px;
            .vue-tab-menu-line {
                height: 2px;
                box-sizing: border-box;
                background-color: $menu-selected-color;
                position: absolute;
                left: 0;
                top: $menu-height - $line-height;
                z-index: 1;
                transition: $menu-transition;
                transform-origin: 0 0;
            }
        }
    }
</style>

<template>
    <div class="vue-tab-menu-container" :class="[className]">
        <div class="vue-tab-menu" ref="warp">
            <div class="button"
                 :class="{
                        'vue-tab-menu-selected': index === idx,
                        'vue-tab-menu-unMove': (index === idx && unMove && showLine)
                    }"
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
            }
        },

        watch: {
            value (val, oldVal) {
                this.toLeft = this.arrayFindIndex(val) < this.arrayFindIndex(oldVal)
                this.name = val
            },

            name (val, oldVal) {
                this.toLeft = this.arrayFindIndex(val) < this.arrayFindIndex(oldVal)
                this.unMove = false
                this.$emit('input', val)
                this.menuSwitch(val)
            }
        },

        data () {
            return {
                name: '',
                index: 0,
                warpWidth: 0,
                unMove: true,
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
                    this.maxOffset = lastBtn.clientWidth + lastBtn.offsetLeft - this.warpWidth
                }

                if (this.showLine) {
                    let target = this.$refs.line;
                    target.style.transform = `translate3d(${attack.offsetLeft}px, 0px, 0px)`;
                    target.style.width = attack.clientWidth + 'px'
                }

                if ( ! this.noMore) {
                    let offset, role, endOffset;
                    let origin = dom.scrollLeft;

                    if (this.toLeft) {
                        console.log('to left');
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
                                    console.log('done - ' + dom.scrollLeft);
                                    clearInterval(timer)
                                } else {
                                    console.log('move - ' + dom.scrollLeft + ' - ' + endOffset);
                                    dom.scrollLeft -= divide
                                    if (dom.scrollLeft < endOffset) {
                                        dom.scrollLeft = endOffset
                                    }
                                }
                            }, 10)
                        }
                    } else {
                        console.log('to right');
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
                                    console.log('done');
                                    clearInterval(timer)
                                } else {
                                    dom.scrollLeft += divide
                                    console.log('move');
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
            this.menuSwitch(this.value)
        }
    }
</script>