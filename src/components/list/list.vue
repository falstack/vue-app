<style lang="scss" rel="scss" scoped>
    .vue-app-list-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;

        .content {
            position: relative;
            min-height: 100%;
            width: 100%;
        }
    }
</style>

<template>
    <div class="vue-app-list-container" @scroll="scrolling" ref="container">
        <div class="content" ref="content">
            <slot name="content" v-for="item in list" :text="item"></slot>
        </div>
        <div>
            <ul>
                <li v-for="pager in paginate"
                    :class="{ active: curPage === pager }"
                    class="number">{{ pager }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'v-list',

        props: {
            value: {},
            list: {},
            autoLoad: {
                type: Boolean,
                default: true
            },
            offset: {
                type: Number,
                default: 0
            },
            total: {
                type: Number,
                default: 0
            },
            pageSize: {
                type: Number,
                default: 10
            },
            optimize: {
                type: Boolean,
                default: true
            },
            infinite: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            'list' () {
                this.loading = false
            },

            'value' (val) {
                console.log(val)
            },

            'curPage' (val) {
                this.$emit('input', val)
            }
        },
        computed: {
            paginate () {
                const pagination = 7;

                const currentPage = Number(this.curPage);
                const pageCount = Number(this.total);

                let showPrevMore = false;
                let showNextMore = false;

                if (pageCount > pagination) {
                    if (currentPage > pagination - 2) {
                        showPrevMore = true;
                    }

                    if (currentPage < pageCount - 2) {
                        showNextMore = true;
                    }
                }

                const array = [];

                if (showPrevMore && !showNextMore) {
                    const startPage = pageCount - (pagination - 2);
                    for (let i = startPage; i < pageCount; ++i) {
                        array.push(i);
                    }
                } else if (!showPrevMore && showNextMore) {
                    for (let i = 2; i < pagination; ++i) {
                        array.push(i);
                    }
                } else if (showPrevMore && showNextMore) {
                    const offset = Math.floor(pagination / 2) - 1;
                    for (let i = currentPage - offset ; i <= currentPage + offset; ++i) {
                        array.push(i);
                    }
                } else {
                    for (let i = 2; i < pageCount; ++i) {
                        array.push(i);
                    }
                }

                this.showPrevMore = showPrevMore;
                this.showNextMore = showNextMore;

                return array;
            }
        },
        data () {
            return {
                loading: false,
                curPage: this.value,
                showPrevMore: false,
                showNextMore: false
            }
        },
        created () {

        },
        methods: {
            scrolling () {
                if (this.autoLoad &&
                    !this.loading &&
                    this.$refs.container.scrollTop + this.$refs.container.offsetHeight - this.$refs.content.offsetHeight > this.offset) {
                    this.loading = true
                    this.curPage++
                    this.$emit('listLoadingEvent', this.pageSize)
                }
            }
        },
        mounted () {

        }
    }
</script>