<style lang="scss" rel="scss" scoped>
    $color-white: #fff;
    $color-gray: #d9d9d9;
    $color-blue: #26a2ff;

    .vue-app-toggle {
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: 0 10px;

        .toggle-core {
            display: block;
            position: relative;
            width: 52px;
            height: 32px;
            border: 1px solid $color-gray;
            border-radius: 16px;
            box-sizing: border-box;
            background: $color-gray;

            &::after, &::before {
                content: '';
                position: absolute;
                transition: transform .3s;
                border-radius: 15px;
            }

            &::after {
                width: 30px;
                height: 30px;
                background-color: $color-white;
                box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
            }

            &::before {
                width: 50px;
                height: 30px;
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
        <span class="toggle-core" :class="{ 'active' : value }" @click="onToggle"></span>
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