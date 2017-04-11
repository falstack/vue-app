<style lang="scss">
    .vue-app-ripple {
        position: relative;
        border-width: 0;
        outline-width: 0;
        overflow: hidden;
    }
</style>

<template>
    <div class="vue-app-ripple"
         @click="handle($event, true)">
        <slot></slot>
    </div>
</template>

<script lang="babel">

    export default {
        name: 'v-ripple',

        data () {
            return {
                touchable: false
            }
        },

        created () {
            this.touchable = 'ontouchstart' in window;
        },

        methods: {
            handle(e) {
                this.$emit('click', e);
                let self = this.$el;
                let dom = document.createElement("div");

                let initLeft = e.pageX - (self.offsetWidth - self.clientWidth) / 2;
                let initTop = e.pageY - (self.offsetHeight - self.clientHeight) / 2;
                let initSize = 0;
                let initTime = 0.4;
                let initFunc = 'linear';
                let initColor = 'rgba(0, 0, 0, .3)';

                dom.style.width = initSize;
                dom.style.height = initSize;
                dom.style.borderRadius = '50%';
                dom.style.position = 'absolute';
                dom.style.left = initLeft + 'px';
                dom.style.top = initTop + 'px';
                dom.style.backgroundColor = initColor;
                dom.style.transitionDuration = initTime + 's';
                dom.style.webkitTransitionDuration = initTime + 's';
                dom.style.transitionTimingFunction = initFunc;
                dom.style.webkitTransitionTimingFunction = initFunc;

                self.appendChild(dom);

                let r = Math.sqrt(Math.pow(self.offsetWidth, 2) + Math.pow(self.offsetHeight, 2));
                dom.style.width = r * 2 + 'px';
                dom.style.height = r * 2 + 'px';
                dom.style.left = initLeft - r + 'px';
                dom.style.top = initTop - r + 'px';
                dom.style.backgroundColor = 'rgba(0, 0, 0, .1)';
                setTimeout(function () {
                    self.removeChild(dom);
                }, initTime * 1000);
            }
        }
    }
</script>