<style lang="scss" rel="scss">
    .vue-pwa-container {
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

    $title-height: 44px;

    .vue-pwa-modal {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        background-color: #fff;
        padding-top: $title-height;

        .bar {
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            height: $title-height;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,.15);

            .title {
                flex: 1;
                display: block;
                overflow: hidden;
                margin: 0 10px;
                min-width: 30px;
                height: 43px;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 17px;
                line-height: 44px;
                font-weight: 400;
            }

            button {
                min-width: 60px;
            }

            & + div {
                position: relative;
                overflow-y: auto;
                height: 100%;
            }
        }
    }

    .slide-in-up {
        &.bottom {
            transform: translate3d(0, 100%, 0)
        }

        &.top {
            transform: translate3d(0, -100%, 0)
        }

        &.left {
            transform: translate3d(-100%, 0, 0)
        }

        &.right {
            transform: translate3d(100%, 0, 0)
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
    <div class="vue-pwa-container"
         @click="hide(false)"
         v-if="state"
         :class="{
                'fadeIn': state === 1 || state === 2,
                'active': state === 2,
                'fadeOut': state === 3
            }">
        <div class="vue-pwa-modal slide-in-up"
             :class="[{
                    'active': state == 1,
                    'ng-enter ng-enter-active active': state == 2,
                    'ng-leave ng-leave-active': state == 3},
                    clazz, position[from]
                ]">
            <div class="bar bar-header">
                <button class="btn-cancel" @click="hide(false)">取消</button>
                <slot name="header">
                    <h1 class="title" v-text="title"></h1>
                </slot>
                <button class="btn-success" @click="hide(true)">确定</button>
            </div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="babel">

    const show_modal_animate_dur = 400
    const hide_modal_animate_dur = 250

    export default {
        name: 'v-modal',

        props: {
            title: {
                type: String
            },
            clazz: {
                type: String
            },
            from: {
                type: Number,
                default: 2
            }
        },

        data () {
            return {
                id: '',
                state: 0,
                position: ['top', 'right', 'bottom', 'left'],
            }
        },

        methods: {
            show () {
                this.state = 1
                this.id = new Date().getTime() + Math.random().toString(36).substring(3, 6)

                setTimeout(() => {
                    this.state = 2

                    setTimeout(() => {
                        // modal open end
                    }, show_modal_animate_dur)
                }, 50)

                return new Promise((resolve, reject) => {

                    this.$on('modalOkEvent' + this.id, () => {
                        resolve()
                    })

                    this.$on('modalCancelEvent' + this.id, () => {
                        reject()
                    })
                })
            },

            hide (submit) {
                this.state = 3
                setTimeout(() => {
                    this.state = 0

                    submit ? this.$emit('modalOkEvent' + this.id) : this.$emit('modalCancelEvent' + this.id)

                }, hide_modal_animate_dur)
            }
        }
    }
</script>