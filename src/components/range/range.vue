<style lang="scss" rel="scss" scoped>
    $range-radius: 4px;

    .vue-app-range {
        border-radius: $range-radius;
        background-color: #e5e9ef;
    }
</style>

<template>
    <div class="vue-app-range"
        :style="rangeStyle">
        <div class="vue-app-range-progress">
            <div class="vue-app-range-tail"></div>
        </div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'v-range',

        props: {
            value: {},
            size: {
                type: Number,
                default: 6
            },
            max: {
                type: Number,
                default: 100
            },
            min: {
                type: Number,
                default: 0
            },
            step: {
                type: Number,
                default: 1
            },
            vertical: {
                type: Boolean,
                default: false
            }
        },

        watch: {
            'value' (val) {
                this.curRange = val
            },

            'curRange' (val) {
                this.$emit('input', val)
            }
        },
        computed: {
            rangeStyle () {
                let style = null;

                if (this.vertical) {
                    style.width = this.size + 'px';
                    style.height = '100%';
                } else {
                    style.height = this.size + 'px';
                    style.width = '100%';
                }
            }
        },
        data () {
            return {
                curRange: this.value
            }
        },
        methods: {

        }
    }
</script>