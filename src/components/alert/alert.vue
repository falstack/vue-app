<style lang="scss" rel="scss" scoped>
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

    .vue-app-container {
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

    .vue-app-alert {
        width: 280px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;

        &.hidden {
            visibility: hidden;
        }

        &.enter {
            animation-name: superScaleIn;
            animation-duration: $fadeInTime;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both
        }

        &.show {
            visibility: visible
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

        button {
            background-color: transparent;
            width: 100%;
            height: 45px;
            border-width: 0;
            outline-width: 0;
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

            &:hover, &:active {
                background-color: rgba(0, 0, 0, .1);
            }
        }
    }
</style>

<template>
    <div class="vue-app-container"
         :class="[ state ? 'show' : 'hidden' ]">
        <div class="vue-app-alert vue-app-dialog"
             :class="{'hidden' : state === 0, 'enter' : state === 1, 'show' : state === 2, 'leave' : state === 3}">
            <h3 class="title" v-text="title"></h3>
            <p class="sub-title" v-if="subTitle" v-text="subTitle"></p>
            <button v-text="btnText" @click="submit"></button>
        </div>
    </div>
</template>

<script lang="babel">

    const fadeInTime = 200
    const fadeOutTime = 300

    export default {
        name: 'vue-app-alert',

        data () {
            return {
                title: '',
                subTitle: '',
                btnText: '',
                state: 0
            }
        },

        methods: {
            show (opt) {

                this.state = 1
                window.$backdrop.show()

                this.title = (opt && opt.title) ? opt.title : '提示'
                this.subTitle = (opt && opt.subTitle) ? opt.subTitle : ''
                this.btnText = (opt && opt.btnText) ? opt.btnText : '好'

                setTimeout(() => {
                    this.state = 2
                }, fadeInTime)

                return new Promise((resolve) => {
                    this.$on('alertSubmitEvent', () => {
                        this.hide()
                        resolve()
                    })
                })
            },

            hide () {
                this.state = 3
                window.$backdrop.hide()

                setTimeout(() => {
                    this.$destroy()
                }, fadeOutTime)
            },

            submit (evt) {
                evt.currentTarget.setAttribute('disabled', 'disabled')
                evt.stopPropagation()
                this.$emit('alertSubmitEvent')
            }
        },

        destroyed () {
            this.$el.parentNode.removeChild(this.$el)
        }
    }
</script>