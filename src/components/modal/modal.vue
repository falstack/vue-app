<style lang="scss" rel="scss">
    .vue-app-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        background-color: transparent;

        &.hidden {
            display: none;
        }

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

    .vue-app-modal {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        overflow: hidden;
        min-height: 100%;
        width: 100%;
        background-color: #fff;
        padding-top: 44px;
        pointer-events: auto;

        .bar {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            transform: translateZ(0);
            user-select: none;
            position: absolute;
            right: 0;
            left: 0;
            z-index: 9;
            width: 100%;
            height: 44px;
            border-top: 1px solid transparent;
            border-bottom: 1px solid #ddd;
            background-color: #fff;

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
        }

        .bar-header {
            top: 0;
            border-top-width: 0;
            border-bottom-width: 1px;
            box-shadow: 0 0 10px rgba(0,0,0,.15);
        }
    }

    .slide-in-up {
        transform: translate3d(0, 100%, 0)
    }
    .slide-in-up.ng-enter,.slide-in-up>.ng-enter {
        transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms
    }
    .slide-in-up.ng-enter-active,.slide-in-up>.ng-enter-active {
        transform: translate3d(0, 0, 0)
    }
    .slide-in-up.ng-leave,.slide-in-up>.ng-leave {
        transition: all ease-in-out 250ms
    }
</style>

<template>
    <div class="vue-app-container"
         :class="{'hidden': state === 0, 'active': state === 2, 'fadeIn': state === 1 || state === 2, 'fadeOut': state === 3}">
        <div class="vue-app-modal slide-in-up"
             :class="[{'active': state == 1, 'ng-enter ng-enter-active active': state == 2, 'ng-leave ng-leave-active': state == 3}, className]">
            <slot name="header">
                <div class="bar bar-header">
                    <button class="btn-cancel" @click="hide(false)">取消</button>
                    <h1 class="title" v-text="title"></h1>
                    <button class="btn-success" @click="hide(true)">确定</button>
                </div>
            </slot>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="babel">

    const show_modal_animate_dur = 400
    const hide_modal_animate_dur = 250

    export default {
        name: 'v-modal',

        props: ['title', 'className'],

        data () {
            return {
                state: 0,
                id: ''
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