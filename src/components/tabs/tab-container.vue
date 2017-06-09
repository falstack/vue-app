<style lang="scss" scoped>
    .vue-tab-container {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    }
</style>

<template>
    <div class="vue-tab-container">
        <slot></slot>
    </div>
</template>

<script>

    export default {
      name: 'v-tab-container'
    };
</script>
