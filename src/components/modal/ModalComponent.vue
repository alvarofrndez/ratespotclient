<script setup>
    import { modalStore } from '@/stores/modal.js'
    // stores
    const modal_s = modalStore()

    const emit = defineEmits(['groupCreated', 'rateAdded', 'actionPerformed'])

    function close(e){
        const wrapper = document.querySelector('.wrapper-modal') 

        if(e.target == wrapper){
            modal_s.showing = false
            modal_s.component = ''
        }
    }

    function handleActionPerformed(){
        emit('actionPerformed')
    }
</script>

<template>
    <section class='wrapper-modal' @click='(e) => close(e)'>
        <div class='container-modal'>
            <component :is='modal_s.component' @actionPerformed='handleActionPerformed'/>
        </div>
    </section>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .wrapper-modal{
        // size
        width: 100vw;
        height: 100vh;

        // position
        top: 0;
        left: 0;
        position: absolute;
        z-index: 1000000;

        // display
        @include flex();

        // decoration
        background-color: rgba($color: $h-c-text, $alpha: .1);
        cursor: pointer;

        
        .container-modal{
            // size
            max-width: 80%;
            max-height: 80%;

            // margin
            padding: 1rem;

            // decoration
            background-color: $h-c-background;
            border-radius: 1rem;
            cursor: initial;
            overflow-y: scroll;
        }
    }
</style>