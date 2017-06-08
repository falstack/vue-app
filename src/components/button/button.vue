<style lang="scss" rel="scss">
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
            width: 14px;
            height: 14px;
            position: relative;

            &:before {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
            }
        }
        
        @media (min-width: 1024px) {
            cursor: pointer;
        }
    }
</style>

<template>
    <div class="vue-pwa-button"
         :class="[clazz, { 'on-click': clicking }]"
        ref="box">
        <div class="icon" v-if="icon" :style="{ 'backgroundImage' : 'url(' + icon + ')' }"></div>
        <div class="text"><slot></slot></div>
    </div>
</template>

<script>

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
            ripple: {
                type: Boolean,
                default: false
            },
            clazz: {
                type: String
            }
        },
        data () {
            return {
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