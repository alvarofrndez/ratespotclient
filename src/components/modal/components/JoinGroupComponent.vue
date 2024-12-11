<script setup>
    import { ref } from 'vue'
    import { modalStore } from '@/stores/modal'
    import { groupStore } from '@/stores/group'
    import { userStore } from '@/stores/user'
    import { toastStore } from '@/stores/toast'

    const modal_s = modalStore()
    const group_s = groupStore()
    const user_s = userStore()
    const toast_s = toastStore()

    const emit = defineEmits(['actionPerformed'])

    const username = ref('')

    async function joinGroup(){
        if(username.value != ''){
            const result = await user_s.joinToGroup(username.value, modal_s.data)

            if(result){
                modal_s.closeModal()
                emit('actionPerformed')
            }else{
                toast_s.show('error al unirse al grupo', 'error')
            }
        }else{
            toast_s.show('nombre de usuario vacio', 'error')
        }
    }
</script>

<template>
    <section class='container'>
        <icon class='go-back' name='io-chevron-back-outline' @click='modal_s.closeModal'/>
        <div class='username'>
            <label>Nombre de usuario</label>
            <input type='text' v-model='username' placeholder='cybernene'>
        </div>
        <button @click='joinGroup'>Unirse</button>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';


    .container{
        // display
        @include flex(column, center, center, 2rem);

        .go-back{
            align-self: flex-start;

            // decoration
            background-color: $h-c-background;
            border-radius: 50%;
        }

        .username{
            // display
            @include flex(column, flex-start);

            label{
                // margin
                margin-bottom: 5px;

                // decoration
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