<style lang="scss" rel="scss">
    $color-blue: #00bfef;
    $color-blue-active: #00a7de;

    $color-gray: #ccd0d7;
    $color-gray-active: #99a2aa;

    $color-green: #52C6CA;
    $color-green-active: #00bb9c;

    $color-pink: #ff9eb0;
    $color-pink-active: #ff607f;

    $color-yellow: #f3cf4a;
    $color-yellow-active: #fdbc40;

    $color-red: #fc605c;
    $color-red-active: #c84c44;


    @mixin mixin-btn($bg, $bg-active, $color) {
        background-color: $bg;
        color: $color;

        &:active {
            background-color: $bg-active;
            transition-duration: 0s;
        }
    }

    .vue-pwa-button {
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;

        &.info {
            @include mixin-btn($color-blue, $color-blue-active, #fff);
        }

        &.warn {
            @include mixin-btn($color-yellow, $color-yellow-active, #fff);
        }

        &.error {
            @include mixin-btn($color-red, $color-red-active, #fff);
        }

        &.success {
            @include mixin-btn($color-green, $color-green-active, #fff);
        }
    }
</style>

<template>
    <div class="vue-pwa-button info"
         :class="[clazz]">
        <div class="icon" :style="iconStyle"></div>
        <div class="text">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'v-button',

        props: {
            text: {
                type: String
            },
            icon: {
                type: String
            },
            type: {
                type: String
            },
            position: {
                type: Number
            },
            state: {
                type: Number,
                default: 0
            },
            clazz: {
                type: String
            }
        },
        computed: {
            iconStyle () {
                let style = {};

                style.backgroundImage = 'url(' + this.icon + ')';

                return style
            }
        },
        data () {
            return {
                defaultIcon: {
                    info: '',
                    warn: '',
                    error: '',
                    success: ''
                }
            }
        },
        methods: {

        }
    }
</script>