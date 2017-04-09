<style lang="scss" rel="scss" scoped>
    .input-range {
        position: relative;
        cursor: pointer;
        background-color: #e5e9ef;
        border-radius: 4px;
    }
        .loading {
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            background-color: rgb(138, 220, 237);
            border-radius: 4px;
    }
        .current {
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            background-color: rgb(0, 161, 214);
            border-radius: 4px;
    }
        .dot {
            display: block;
            box-sizing: border-box;
            border-radius: 50%;
            position: absolute;
            background-color: #fff;
            border: 1px solid #e5e9ef;
    }
</style>
<template>
    <div class="input-range" :style="{ height : height + 'px', width : width + 'px' }" @click="clickBar">
        <span class="loading" :style="loadingStyle"></span>
        <span class="current" :style="currentStyle"><em class="dot" :style="dotStyle" @mousedown="isClick = true" @mousemove="track" @mouseup="isClick = false" @mouseout="isClick = false"></em></span>
    </div>
</template>

<script lang="babel">
    export default {
        props: {
            vertical: {
                default: false
            },
            height: {
                default: 8,
                validator: (val) => val >= 0
            },
            width: {
                default: 120,
                validator: (val) => val >= 0
            },
            amount: {
                default: 50,
                validator: (val) => val >= 0 && val <= 100
            },
            loading: {
                default: 0,
                validator: (val) => val >= 0 && val <= 100
            },
            dot: {
                default: 14,
                validator: (val) => val >= 3
            }
        },
        computed: {
            dotStyle () {
                return {
                    width : this.dot + "px",
                    height : this.dot + "px",
                    top : this.vertical ? - this.dot / 2 + "px" : (this.height - this.dot) / 2 + "px",
                    right : this.vertical ? (this.width - this.dot) / 2 + "px" : - this.dot / 2 + "px",
                }
            }
        },
        watch: {
            'width' () {
                this.currentComputed()
            },
            'amount' () {
                this.currentComputed()
            },
            'loading' () {
                this.loadingComputed()
            }
        },
        data () {
            return {
                base : 0,
                currentStyle : {},
                loadingStyle: {},
                isClick : false
            }
        },
        created () {
            this.currentComputed()
        },
        methods: {
            currentComputed () {
                this.currentStyle = this.vertical ? {
                    height: this.amount + "%",
                    width: '100%'
                } : {
                    width: this.amount + "%",
                    height: '100%'
                }
            },
            loadingComputed () {
                this.loadingStyle = this.vertical ? {
                    height: this.loading + "%",
                    width: '100%'
                } : {
                    width: this.loading + "%",
                    height: '100%'
                }
            },
            clickBar (e) {
                var cur, ret;
                if (this.vertical) {
                    this.base = this.base ? this.base : this.$el.getBoundingClientRect().top;
                    cur = e.clientY;
                    ret = (this.height - cur + this.base) / this.height * 100;
                } else {
                    this.base = this.base ? this.base : this.$el.getBoundingClientRect().left;
                    cur = e.clientX;
                    ret = (cur - this.base) / this.width * 100;
                }
                if (ret > 100) {
                    this.amount = 100;
                } else if (ret < 0) {
                    this.amount = 0;
                } else {
                    this.amount = ret;
                }
            },
            track (e) {
                if (this.isClick) {
                    this.clickBar(e)
                }
            }
        }
    }
</script>