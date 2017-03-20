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

    .vue-app-alert {
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

        button {
            background-color: transparent;
            width: 100%;
            height: 45px;
            border-width: 0;
            outline-width: 0;

            &:hover, &:active {
                background-color: rgba(0, 0, 0, .1);
            }
        }
    }
</style>

<template>
    <div class="vue-app-container">
        <div class="vue-app-alert">
            <h3 class="title" v-text="title"></h3>
            <p class="content" v-if="content" v-text="content"></p>
            <button v-text="btnText" @click="submit"></button>
        </div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'vue-app-alert',

        data () {
            return {
                title: '',
                content: '',
                btnText: '',
                state: false
            }
        },

        methods: {
            show (opt) {

                this.title = (opt && opt.title) ? opt.title : '提示'
                this.content = (opt && opt.content) ? opt.content : ''
                this.btnText = (opt && opt.btnText) ? opt.btnText : '好'

                this.state = true

                return new Promise((resolve) => {
                    this.$on('alertSubmitEvent', () => {
                        this.hide()
                        resolve()
                    })
                })
            },

            hide () {
                this.state = false

                this.$destroy()
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