<script setup>
    import { ref, onMounted } from 'vue'
    import { modalStore } from '@/stores/modal.js'
    import { groupStore } from '@/stores/group.js'
    import { userStore } from '@/stores/user'
    import { toastStore } from '@/stores/toast'

    const emit = defineEmits(['actionPerformed'])

    // stores
    const modal_s = modalStore()
    const group_s = groupStore()
    const user_s = userStore()
    const toast_s = toastStore()

    // variables
    const name = ref('')
    const code = ref('')
    const username = ref('')

    onMounted(async () => {
        code.value = await group_s.generateCode()
    })

    async function createGroup() {
        const result = await group_s.createGroup(name.value, code.value, username.value)

        if (result) {
            group_s.setNewGroup(result.group, result.user)
            user_s.setActiveUser(result.user)
            group_s.setActiveGroup(result.group)
            modal_s.closeModal()
            emit('actionPerformed')
            toast_s.show('grupo creado', 'success')
        }else{
            toast_s.show('error al crear el grupo', 'error')
        }
    }

</script>

<template>

    <div class='container'>
        <icon class='go-back' name='io-chevron-back-outline' @click='modal_s.closeModal'/>
        <div>
            <label for='name'>Nombre</label>
            <input type='text' v-model='name'/>
        </div>
        <div>
            <label for='username'>Usuario</label>
            <input type='text' v-model='username'/>
        </div>
        <button class='create' @click='createGroup'>Crear</button>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container{
        // size
        width: 100%;
        height: 100%;

        // position
        position: relative;

        // display
        @include flex(column, center, center, 2rem);

        .go-back{
            align-self: flex-start;

            // decoration
            background-color: $h-c-background;
            border-radius: 50%;
        }

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
        
        .create{
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