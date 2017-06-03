<style lang="scss" rel="scss" scoped>
    .vue-pwa-drawer-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background-color: transparent;

        &.fadeIn {
            transition: background-color cubic-bezier(0.1, 0.7, 0.1, 1) 400ms
        }

        &.fadeOut {
            transition: background-color ease-in-out 250ms
        }

        &.active {
            background-color: rgba(0, 0, 0, .4);
        }
    }

    $drawer-size: 70%;

    .vue-pwa-drawer {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        background-color: #fff;
    }

    .slide-in-up {
        &.bottom {
            transform: translate3d(0, $drawer-size, 0)
        }

        &.top {
            transform: translate3d(0, -$drawer-size, 0)
        }

        &.left {
            transform: translate3d(-$drawer-size, 0, 0)
        }

        &.right {
            transform: translate3d($drawer-size, 0, 0)
        }

        &.ng-enter-active {
            transform: translate3d(0, 0, 0)
        }

        &.ng-enter {
            transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms
        }

        &.ng-leave {
            transition: all ease-in-out 250ms
        }
    }
</style>

<template>
    <div class="vue-pwa-drawer-container"
         @click="hide"
         v-show="state"
         :class="{
                'fadeIn': state === 1 || state === 2,
                'active': state === 2,
                'fadeOut': state === 3
            }">
        <div class="vue-pwa-drawer slide-in-up"
             :class="[{
                    'active': state == 1,
                    'ng-enter ng-enter-active active': state == 2,
                    'ng-leave ng-leave-active': state == 3},
                    clazz, position[from]
                ]"
             ref="drawer"
             @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="babel">

    const show_drawer_animate_dur = 400
    const hide_drawer_animate_dur = 250
    const drawer_size = 70

    export default {
        name: 'v-drawer',

        props: {
            clazz: {
                type: String
            },
            from: {
                type: Number,
                default: 3
            }
        },

        data () {
            return {
                state: 0,
                position: ['top', 'right', 'bottom', 'left'],
            }
        },
        methods: {
            show () {
                if ( ! this.state) {
                    this.state = 1

                    setTimeout(() => {
                        this.state = 2

                        setTimeout(() => {
                            // drawer open end
                        }, show_drawer_animate_dur)
                    }, 50)
                }
            },

            hide () {
                this.state = 3
                setTimeout(() => {
                    this.state = 0

                }, hide_drawer_animate_dur)
            }
        },

        mounted () {
            this.$refs.drawer.style[['bottom', 'left', 'top', 'right'][this.from]] = 100 - drawer_size + '%'
        }
    }
</script>