<script setup>
    import { defineAsyncComponent, ref } from 'vue'
    import { modalStore } from '@/stores/modal.js'
    import { groupStore } from '@/stores/group.js'
    import { userStore } from '@/stores/user.js' 
    import { toastStore } from '@/stores/toast.js'

    const Separator = defineAsyncComponent(() => import('@/components/SeparatorComponent.vue'))
    const GruopSelect = defineAsyncComponent(() => import('@/components/GroupSelectComponent.vue'))

    const modal_s = modalStore()
    const group_s = groupStore()
    const user_s = userStore()
    const toast_s = toastStore()

    const group_selected = ref(null)
    const code_selected = ref('')

    function handleGroupSelected(group){
        group_selected.value = group
    }

    async function actionPerformed(){
        if(code_selected.value != ''){
            const group = await group_s.getGroupByCode(code_selected.value)

            if(group){
                modal_s.openModal('JoinGroup', group)
            }else{
                toast_s.show('el grupo no existe', 'error')
            }
        }else{
            if(group_selected.value != null){
                group_s.group = {
                    id: group_selected.value.id,
                    name: group_selected.value.name,
                    code: group_selected.value.code
                }
                
                user_s.setActiveUser(group_selected.value.user)
            }else{
                toast_s.show('elija una opcion', 'info')
            }
        }
    }
</script>

<template>
    <section class='wrapper'>
        <div class='container'>
            <h3>Crea, elija o unase a un grupo</h3>
            <div class='container-actions'>
                <input type='text' v-model='code_selected' placeholder='Codigo de grupo: 12345'/>
                <Separator/>
                <button class='create-group' @click="modal_s.openModal('NewGroup')">Crear</button>
                <Separator/>
                <GruopSelect @groupSelected='handleGroupSelected'/>
            </div>
            <button class='accept' @click='actionPerformed'>Aceptar</button>
        </div>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .wrapper{
        // size
        width: 100vw;
        height: 100vh;

        // position
        position: relative;
        z-index: 1000;

        // display
        @include flex();
        
        // decoration
        background-color: rgba($color: $h-c-text, $alpha: .1);

        .container{
            // size
            max-width: 80%;
            max-height: 80%;
            
            // position
            position: relative;

            // display
            @include flex(column, center, flex-start, 2rem);

            // margin
            padding: 1rem;
            padding-bottom: 5rem;

            // decoration
            background-color: $h-c-background;
            border-radius: 1rem;
            overflow-y: scroll;

            &-actions{
                // display
                @include flex(column, center, flex-start, 1rem);

                input{
                    // size
                    width: 100%;

                    // margin
                    padding: 5px;

                    // decoration
                    border-radius: 10px;
                    border: 1px solid $h-c-border;
                    background-color: $h-c-background;
                    outline: none;            
                }

                .create-group{
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

            .accept{
                // position
                position: absolute;
                bottom: 1rem;
                right: 1rem;

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
    }
</style>