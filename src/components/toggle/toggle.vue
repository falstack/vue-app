<style lang="scss" scoped>
    $color-gray: #d9d9d9;
    $color-blue: #26a2ff;

    .vue-app-toggle {
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;

        $toggle-btn-height: 32px;
        $toggle-btn-width: 52px;
        $toggle-btn-border: 1px;

        .toggle-btn {
            box-sizing: border-box;
            width: $toggle-btn-width;
            height: $toggle-btn-height;
            border: $toggle-btn-border solid $color-gray;
            border-radius: $toggle-btn-height / 2;
            background: $color-gray;

            &::after, &::before {
                content: '';
                position: absolute;
                transition: transform .3s;
                border-radius: ($toggle-btn-height - 2 * $toggle-btn-border) / 2;
            }

            &::after {
                width: $toggle-btn-height - 2 * $toggle-btn-border;
                height: $toggle-btn-height - 2 * $toggle-btn-border;
                background-color: #fff;
                box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
            }

            &::before {
                width: $toggle-btn-width - 2 * $toggle-btn-border;
                height: $toggle-btn-height - 2 * $toggle-btn-border;
                background-color: #fdfdfd;
            }

            &.active {
                border-color: $color-blue;
                background-color: $color-blue;

                &::before {
                    transform: scale(0);
                }

                &::after {
                    transform: translateX(20px);
                }
            }
        }
    }
</style>

<template>
    <div class="vue-app-toggle">
        <slot></slot>
        <div class="toggle-btn" :class="{ 'active' : value }" @click="onToggle"></div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'v-toggle',

        props: ['value'],

        methods: {
            onToggle () {
                this.$emit('input', !this.value)
            }
        }
    }
</script>