<template>
    <div class='separator'>
        <span class='line'></span>
        <span>o</span>
        <span class='line'></span>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .separator{
        // size
        width: 100%;

        // display
        @include flex(row, center, space-between);

        .line{
            // size
            width: 45%;
            height: 1px;

            // decoration
            background-color: $h-c-border;
        }

        span{
            // decoration
            color: $h-c-border !important;
        }
    }
</style>