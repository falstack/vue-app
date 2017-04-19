<style lang="scss">
    .vue-pwa-ripple {
        position: relative;
        overflow: hidden;
    }
</style>

<template>
    <div class="vue-pwa-ripple">
        <slot></slot>
    </div>
</template>

<script lang="babel">

    import draggable from './draggable';

    export default {
        name: 'v-ripple',

        methods: {
            handle(evt) {
                let self = this.$el;
                let dom = document.createElement("div");
                let content = self.getBoundingClientRect();

                let initLeft = evt.pageX - content.left;
                let initTop = evt.pageY - content.top;
                let initSize = 0;
                let initFunc = 'linear';
                let initColor = 'rgba(0, 0, 0, .3)';
                let timeout = 400;

                dom.style.width = initSize;
                dom.style.height = initSize;
                dom.style.borderRadius = '50%';
                dom.style.position = 'absolute';
                dom.style.left = initLeft + 'px';
                dom.style.top = initTop + 'px';
                dom.style.backgroundColor = initColor;
                dom.style.transitionDuration = timeout + 'ms';
                dom.style.webkitTransitionDuration = timeout + 'ms';
                dom.style.transitionTimingFunction = initFunc;
                dom.style.webkitTransitionTimingFunction = initFunc;

                self.appendChild(dom);

                let r = Math.ceil(Math.sqrt(Math.pow(self.offsetWidth, 2) + Math.pow(self.offsetHeight, 2)));
                dom.style.width = r * 2 + 'px';
                dom.style.height = r * 2 + 'px';
                dom.style.left = initLeft - r + 'px';
                dom.style.top = initTop - r + 'px';
                dom.style.backgroundColor = 'rgba(0, 0, 0, .1)';
                setTimeout(() => {
                    self.removeChild(dom)
                }, timeout)
            }
        },

        mounted() {
            draggable(this.$el, {
                start: (evt) => {
                    this.handle(evt)
                }
            })
        }
    }
</script>