<style lang="scss" scoped>
    $fadeInTime: .2s;
    $fadeOutTime: .1s;

    @-webkit-keyframes scaleOut {
        from {
            -webkit-transform: scale(1);
            opacity: 1;
        }
        to {
            -webkit-transform: scale(0.8);
            opacity: 0;
        }
    }

    @keyframes scaleOut {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(0.8);
            opacity: 0;
        }
    }

    @-webkit-keyframes superScaleIn {
        from {
            -webkit-transform: scale(1.3);
            opacity: 0;
        }
        to {
            -webkit-transform: scale(1);
            opacity: 1
        }
    }

    @keyframes superScaleIn {
        from {
            transform: scale(1.3);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .vue-pwa-popup-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        z-index: 12;

        &.hidden {
            display: none;
        }
    }

    .vue-pwa-popup {
        width: 280px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;

        &.enter {
            animation-name: superScaleIn;
            animation-duration: $fadeInTime;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both
        }

        &.leave {
            animation-name: scaleOut;
            animation-duration: $fadeOutTime;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both
        }

        .title, .sub-title {
            text-align: center;
            margin-bottom: 0;
        }

        .title {
            margin-top: 0;
            padding-bottom: 15px;
            padding-top: 20px;
        }

        .sub-title {
            margin-top: 8px;
            padding-bottom: 22px;
        }

        .buttons {
            height: 45px;
            position: relative;

            &:before {
                content: '';
                background-color: #eee;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                height: 1px;
                transform: scaleY(.5);
            }

            button {
                position: relative;
                height: 100%;
                color: #0070c9;
                font-size: 17px;

                &:hover, &:active {
                    background-color: rgba(0, 0, 0, .1);
                }

                &:not(:last-child):before {
                    content: '';
                    background-color: RGB(230, 230, 230);
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 1px;
                    transform: scaleX(.5);
                }
            }
        }
    }
</style>

<template>
    <div class="vue-pwa-popup-container"
         v-if="state">
        <div class="vue-pwa-popup"
             :class="{
                'enter' : state === 1,
                'leave' : state === 3
            }">
            <h3 class="title" v-text="title"></h3>
            <p class="sub-title"
               v-if="subTitle"
               v-text="subTitle"></p>
            <div class="content">
                <slot></slot>
            </div>
            <div class="buttons">
                <button v-for="(btn, index) in buttons"
                        :style="{ width: 100 / buttons.length + '%' }"
                        v-text="btn"
                        @click="hide(index)"
                ></button>
            </div>
        </div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'v-popup',

        data () {
            return {
                title: '',
                subTitle: '',
                buttons: [],
                state: 0
            }
        },

        methods: {

            show (opt) {

                this.title = (opt && opt.title) ? opt.title : '提示'
                this.subTitle = (opt && opt.subTitle) ? opt.subTitle : ''
                this.buttons = (opt && opt.buttons) ? opt.buttons : ['好']

                this.state = 1
                document.body.classList.add('popup')

                window.$backdrop.show({
                    dom: this.$el.parentNode
                })

                setTimeout(() => {
                    this.state = 2
                }, 200)

                return new Promise((resolve) => {
                    this.$on('modalSubmitEvent', (data) => {
                        resolve(data.index)
                    })
                })
            },

            hide (index) {
                this.state = 3
                window.$backdrop.hide(true)
                setTimeout(() => {
                    this.state = 0
                    document.body.classList.remove('popup')

                    this.$emit('modalSubmitEvent', {index: index})
                }, 200)
            }
        }
    }
</script>