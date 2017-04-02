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

            button {
                flex: 1;
                height: 100%;
                transition: $menu-transition;
                font-size: 12px;
                white-space: nowrap;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

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
        <div class="vue-tab-menu">
            <button :class="{
                        'vue-tab-menu-selected': index === idx,
                        'vue-tab-menu-unMove': (index === idx && unMove && showLine)
                    }"
                    v-for="(text, idx) in filterMenu()"
                    ref="buttons"
                    @click="name = text">
                <div v-if="showIcon"
                     class="vue-tab-menu-icon"
                     :class="[showIcon ? 'icon-' + idx : '']"
                ></div>
                <span v-text="text"></span>
            </button>
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
            value (val) {
                this.name = val
            },

            name (val) {
                this.unMove = false
                this.$emit('input', val)
                this.menuSwitch(val)
            }
        },

        data () {
            return {
                name: '',
                index: 0,
                multipleIdx: 0,
                unMove: true
            }
        },

        methods: {

            filterMenu () {
                return this.complex ? this.menu[this.multipleIdx] : this.menu
            },

            menuSwitch (name) {
                let list = this.filterMenu();
                let i;
                for (i=0; i<list.length; i++) {
                    if (list[i] === name) {
                        break
                    }
                }
                if (this.showLine) {
                    let attack = this.$refs.buttons[i];
                    let target = this.$refs.line;
                    target.style.transform = `translate3d(${attack.offsetLeft}px, 0px, 0px)`;
                    target.style.width = attack.clientWidth + 'px'
                }
                this.index = i
            }
        },

        mounted () {
            this.menuSwitch(this.value)
        }
    }
</script>