<style lang="scss">
    .vue-tab-item {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
    }
</style>

<template>
    <div v-show="$parent.swiping || name === $parent.currentActive"
         v-if="lazy || init"
         class="vue-tab-item"
        :class="[clazz]">
        <slot></slot>
    </div>
</template>

<script>
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
        },
        clazz: {
          type: String
        }
      },

      watch: {
        '$parent.currentActive'(val) {
          if (val === this.name) {
            this.lazy = true;
          }
        }
      },

      data() {
        return {
          lazy: false
        };
      }
    };
</script>
