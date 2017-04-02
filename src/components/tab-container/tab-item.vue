<style lang="scss" rel="scss">
  .vue-tab-item {
    flex-shrink: 0;
    width: 100%;
  }
</style>

<template>
    <div v-show="$parent.swiping || id === $parent.currentActive"
         class="vue-tab-item">
        <slot></slot>
    </div>
</template>

<script lang="babel">
    export default {
        name: 'v-tab-item',

        props: ['id']
    }
</script>