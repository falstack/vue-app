<style lang="scss" rel="scss" scoped>
    .vue-app-backdrop {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .1s background-color linear;
        z-index: 11;

        &.show {
            background-color: rgba(0, 0, 0, .4);
        }

        &.fade {
            background-color: transparent;
        }
    }
</style>

<template>
    <div class="vue-app-backdrop"
         :class="[ active ? 'show' : 'fade' ]"
    ></div>
</template>

<script lang="babel">

    const prevent = (e) => {
        e.preventDefault()
    }

    export default {
        name: 'v-backdrop',

        data () {
            return {
                active: false
            }
        },

        methods: {
            show () {
                this.active = true
                document.body.addEventListener('touchmove', prevent)
            },

            hide () {
                this.active = false
                document.body.removeEventListener('touchmove', prevent)
            }
        },

        destroyed () {
            this.$el.parentNode.removeChild(this.$el)
        }
    }
</script>