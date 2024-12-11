<script setup>
    import { ref } from 'vue'
    import { spotStore } from '@/stores/spot.js'
    import { userStore } from '@/stores/user.js'
    import { modalStore } from '@/stores/modal.js'
    import { toastStore } from '@/stores/toast.js'

    const spot_s = spotStore()
    const user_s = userStore()
    const modal_s = modalStore()
    const toast_s = toastStore()

    const rate = ref('')

    async function addRate(){
        const rate_float = parseFloat(rate.value)
        
        if(isNaN(rate_float) || rate_float < 0 || rate_float > 10){
            toast_s.show('puntuación incorrecta', 'error')
            return
        }

        const result = await spot_s.addRate(modal_s.data.id, rate_float)
        
        if(result){
            modal_s.triggerOnRateAddCallback()
            modal_s.closeModal()
            toast_s.show('puntuación añadida', 'success')
        }else{
            toast_s.show('error al añadir la puntuación', 'error')
        }
    }

</script>

<template>
    <form @submit.prevent='addRate'>
        <div>
            <label>Puntuación</label>
            <input type='text' v-model='rate' placeholder='3' required>
        </div>
        <button type='submit'>añadir</button>
    </form>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    form{
        
        // dipslay
        @include flex(column, flex-start, center, 2rem);

        div{
            // size
            width: 100%;

            // display
            @include flex(column, center, flex-start, 5px);

            label{
                // size
                width: 100%;

                // decoration
                color: $h-c-text;
                font-weight: bold;
            }

            input{
                // size
                width: calc(100% - 10px);

                // margin
                padding: 5px;

                // decoration
                border-radius: 10px;
                border: 1px solid $h-c-border;
                background-color: $h-c-background;
                outline: none;            
            }
        }

        
        button{
            // display
            align-self: flex-end;

            // margin
            padding: 7.5px;

            // decoration
            border-radius: 10px;
            background-color: $h-c-text;
            border: none;
            color: $h-c-background !important;
            outline: none;
        }
    }
</style>