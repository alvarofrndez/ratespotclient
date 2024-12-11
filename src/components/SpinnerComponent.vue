<script setup>

</script>

<template>
    <div class='spinner-container'>
        <div class='spinner' />
    </div>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .spinner-container{
        // size
        width: 100vw;
        height: 90vh;

        // position
        position: fixed;
        top: 0;
        left: 0;

        // display
        @include flex();

        // decoration
        background-color: rgba($color: $h-c-text, $alpha: .1);

        .spinner{
            @include loader-spiner();
        }
    }

</style>