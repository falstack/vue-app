<style lang="scss" rel="scss" scoped>
    .vue-app-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .6);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .vue-app-confirm {
        width: 280px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;

        .title, .content {
            text-align: center;
            position: relative;
            margin-bottom: 0;

            &:before {
                content: '';
                background-color: rgba(0, 0, 0, .3);
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 1px;
                transform: scaleY(.5);
            }
        }

        .title {
            margin-top: 0;
            padding-bottom: 15px;
            padding-top: 30px;
        }

        .content {
            margin-top: 15px;
            padding-bottom: 30px;
        }

        .buttons {
            height: 45px;

            button {
                position: relative;
                height: 100%;
                width: 50%;
                float: left;
                border-width: 0;
                outline-width: 0;
                background-color: transparent;

                &:hover, &:active {
                    background-color: rgba(0, 0, 0, .1);
                }

                &:first-child:before {
                    content: '';
                    background-color: rgba(0, 0, 0, .3);
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
    <div class="vue-app-container">
        <div class="vue-app-confirm">
            <h3 class="title" v-text="title"></h3>
            <p class="content" v-if="content" v-text="content"></p>
            <div class="buttons">
                <button v-text="cancelText" @click="cancel"></button>
                <button v-text="okText" @click="ok"></button>
            </div>
        </div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'vue-app-confirm',

        data () {
            return {
                title: '提示',
                content: '',
                cancelText: '取消',
                okText: '确定',
                state: false
            }
        },

        methods: {
            show (opt) {

                this.title = (opt && opt.title) ? opt.title : '提示'
                this.content = (opt && opt.content) ? opt.content : ''
                this.okText = (opt && opt.okText) ? opt.okText : '确定'
                this.cancelText = (opt && opt.cancelText) ? opt.cancelText : '取消'

                this.state = true

                return new Promise((resolve, reject) => {
                    this.$on('confirmOkEvent', () => {
                        this.hide()
                        resolve()
                    })

                    this.$on('confirmCancelEvent', () => {
                        this.hide()
                        reject()
                    })
                })
            },

            hide () {
                this.state = false
                this.$destroy()
            },

            ok (evt) {
                evt.currentTarget.setAttribute('disabled', 'disabled')
                evt.stopPropagation()
                this.$emit('confirmOkEvent')
            },

            cancel (evt) {
                evt.currentTarget.setAttribute('disabled', 'disabled')
                evt.stopPropagation()
                this.$emit('confirmCancelEvent')
            }
        },

        destroyed () {
            this.$el.parentNode.removeChild(this.$el)
        }
    }
</script>