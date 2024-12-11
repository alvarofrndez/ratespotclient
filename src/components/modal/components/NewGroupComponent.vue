<script setup>
    import { ref } from 'vue'
    import { modalStore } from '@/stores/modal.js'
    import { groupStore } from '@/stores/group.js'
    import { userStore } from '@/stores/user'

    const emit = defineEmits(['actionPerformed'])

    // stores
    const modal_s = modalStore()
    const group_s = groupStore()
    const user_s = userStore()

    // variables
    const name = ref('')
    const code = ref('')
    const username = ref('')

    async function generateCode() {
        code.value = await group_s.generateCode()
    }

    async function createGroup() {
        const result = await group_s.createGroup(name.value, code.value, username.value)

        if (result) {
            group_s.setNewGroup(result.group, result.user)
            user_s.setActiveUser(result.user)
            group_s.setActiveGroup(result.group)
            modal_s.closeModal()
            emit('actionPerformed')
        }else{
            console.log('Error al crear el grupo')
        }
    }

</script>

<template>
    <div class='container'>
        <h1>Crear nuevo grupo</h1>
        <div>
            <label for='name'>Nombre</label>
            <input type='text' v-model='name'/>
        </div>
        <div>
            <label for='code'>Codigo</label>
            <input type='text' v-model='code'/>
            <button @click='generateCode'>Generar codigo</button>
        </div>
        <div>
            <label for='username'>Usuario</label>
            <input type='text' v-model='username'/>
        </div>
        <button @click='createGroup'>Crear</button>
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
        @include flex(column, center, flex-start, 2rem);

        // margin
        margin-top: 2rem;

        // decoration
        background-color: rgba($color: $h-c-text, $alpha: .1);

        label{
            // size
            width: 100%;
            height: 2rem;

            // position
            position: relative;

            // display
            @include flex(column, center, flex-start, 1rem);
        }

        input{
            // size
            width: 100%;
            height: 2rem;

            // position
            position: relative;

            // display
            @include flex(column, center, flex-start, 1rem);
        }

        button{
            // size
            width: 100%;
            height: 2rem;

            // position
            position: relative;

            // display
            @include flex(column, center, flex-start, 1rem);
        }
    }
</style>