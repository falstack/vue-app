<style lang="scss" rel="scss" scoped>
    $menu-height: 40px;
    .vue-tab-menu-container {
        overflow: hidden;
        height: $menu-height;

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
            }

            .vue-tab-menu-line {
                height: 2px;
                box-sizing: border-box;
                background-color: #39f;
                position: absolute;
                left: 0;
                bottom: 1px;
                z-index: 1;
                transition: transform .3s ease-in-out;
                transform-origin: 0 0;
            }
        }
    }
</style>

<template>
    <div class="vue-tab-menu-container">
        <div class="vue-tab-menu">
            <button v-for="(btn, index) in filterMenu" v-text="btn" @click="menuSwitch(index)"></button>
            <div class="vue-tab-menu-line"></div>
        </div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'v-tab-menu',

        props: {
            menu: {
                type: Array,
                required: true
            },
            complex: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            filterMenu () {
                return this.complex ? this.menu[this.multipleIdx] : this.menu
            }
        },
        created () {
            this.$on('tabSwitchEvent', (data) => this.menuSwitch(data))
        },
        beforeDestroy () {
            this.$off('tabSwitchEvent', this.menuSwitch)
        },
        data () {
            return {
                index: 0,
                multipleIdx: 0
            }
        },
        methods: {
            menuSwitch (index) {
                this.$emit('tabMenuClickEvent', index)
            }
        }
    }
</script>