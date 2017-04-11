<style lang="scss" rel="scss">
    .vue-tab-item {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>

<template>
    <div v-show="$parent.swiping || name === $parent.currentActive"
         v-if="lazy || init"
         class="vue-tab-item">
        <slot></slot>
    </div>
</template>

<script lang="babel">
    export default {
        name: 'v-tab-item',

        props: {
            name: {
                required: true,
                type: String
            },
            init: {
                type: Boolean,
                default: false
            }
        },

        watch: {
            '$parent.currentActive' (val) {
                if (val === this.name) {
                    this.lazy = true
                }
            }
        },

        data () {
            return {
                lazy: false
            }
        }
    }
</script>