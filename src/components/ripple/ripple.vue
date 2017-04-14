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
         @click="handle">
        <slot></slot>
    </div>
</template>

<script lang="babel">

    import draggable from './draggable';

    export default {
        name: 'v-ripple',

        data () {
            return {
                dragging: false,
                timeout: 0.4,
                ripple: null,
                begin: 0
            }
        },

        watch: {
            'ripple' (val, oldVal) {
                if (val) {
                    console.log('hold');
                } else {
                    console.log('remove');
                    setTimeout(() => {
                        this.$el.removeChild(oldVal)
                    }, this.timeout * 1000)
                }
            }
        },

        methods: {
            handle(e) {
                let self = this.$el;
                let dom = document.createElement("div");
                let content = self.getBoundingClientRect();

                let initLeft = e.pageX - content.left;
                let initTop = e.pageY - content.top;
                let initSize = 0;
                let initFunc = 'linear';
                let initColor = 'rgba(0, 0, 0, .3)';

                dom.style.width = initSize;
                dom.style.height = initSize;
                dom.style.borderRadius = '50%';
                dom.style.position = 'absolute';
                dom.style.left = initLeft + 'px';
                dom.style.top = initTop + 'px';
                dom.style.backgroundColor = initColor;
                dom.style.transitionDuration = this.timeout + 's';
                dom.style.webkitTransitionDuration = this.timeout + 's';
                dom.style.transitionTimingFunction = initFunc;
                dom.style.webkitTransitionTimingFunction = initFunc;

                self.appendChild(dom);

                let r = Math.ceil(Math.sqrt(Math.pow(self.offsetWidth, 2) + Math.pow(self.offsetHeight, 2)));
                dom.style.width = r * 2 + 'px';
                dom.style.height = r * 2 + 'px';
                dom.style.left = initLeft - r + 'px';
                dom.style.top = initTop - r + 'px';
                dom.style.backgroundColor = 'rgba(0, 0, 0, .1)';
                return dom
            }
        },

        mounted() {
            draggable(this.$el, {
                start: (evt) => {
                    this.dragging = true;
                    this.ripple = this.handle(evt);
                    this.begin = new Date().getTime()
                },
                end: (evt) => {
                    this.dragging = false;
                    this.ripple = null
                }
            })
        }
    }
</script>