<style lang="scss" rel="scss">
    $color-blue: #00bfef;
    $color-blue-hover: #00a7de;

    $color-gray: #ccd0d7;
    $color-gray-hover: #99a2aa;

    $color-green: #52C6CA;
    $color-green-hover: #00bb9c;

    $color-pink: #ff9eb0;
    $color-pink-hover: #ff607f;

    $color-yellow: #f3cf4a;
    $color-yellow-hover: #fdbc40;

    $color-red: #fc605c;
    $color-red-hover: #c84c44;


    @mixin mixin-btn($bg, $bg-hover, $color) {
        background-color: $bg;
        color: $color;

        @media (min-width: 1024px) {
            &:hover {
                background-color: $bg-hover;
                transition-duration: 0s;
            }
        }
    }

    .vue-pwa-button {
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: default;
        position: relative;
        overflow: hidden;

        .icon {
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }
        
        @media (min-width: 1024px) {
            cursor: pointer;
        }

        &.on-click:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, .3);
        }

        &.primary {
            border-radius: 4px;
            height: 40px;
            font-size: 18px;
            padding: 0 12px;
        }

        &.circle {
            border-radius: 50%;
        }

        &.bean {
            border-radius: 40%;
        }

        &.box {

        }

        &.info {
            @include mixin-btn($color-blue, $color-blue-hover, #fff);
        }

        &.warn {
            @include mixin-btn($color-yellow, $color-yellow-hover, #fff);
        }

        &.error {
            @include mixin-btn($color-red, $color-red-hover, #fff);
        }

        &.success {
            @include mixin-btn($color-green, $color-green-hover, #fff);
        }
    }
</style>

<template>
    <div class="vue-pwa-button primary info"
         :class="[clazz, { 'on-click': clicking }]"
        ref="box">
        <div class="icon" :style="iconStyle"></div>
        <div class="text">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="babel">

    import draggable from '../../utils/draggable';

    export default {
        name: 'v-button',

        props: {
            text: {
                type: String
            },
            icon: {
                type: String
            },
            size: {
                type: Number,
                default: 14
            },
            ripple: {
                type: Boolean,
                default: false
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

                style.width = this.size + 'px';
                style.height = this.size + 'px';
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
                },
                clicking: false
            }
        },
        mounted () {
            if ( ! this.ripple) {
                draggable(this.$el, {
                    start: () => {
                        this.clicking = true
                    },
                    end: () => {
                        this.clicking = false;
                        this.$emit('click')
                    }
                })
            }
        }
    }
</script>