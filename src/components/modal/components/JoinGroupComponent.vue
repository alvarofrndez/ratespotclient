<script setup>
    import { ref } from 'vue'
    import { modalStore } from '@/stores/modal'
    import { groupStore } from '@/stores/group'
    import { userStore } from '@/stores/user'

    const modal_s = modalStore()
    const group_s = groupStore()
    const user_s = userStore()

    const emit = defineEmits(['actionPerformed'])

    const username = ref('')

    async function joinGroup(){
        if(username.value != ''){
            const result = await user_s.joinToGroup(username.value, modal_s.data)

            if(result){
                modal_s.closeModal()
                emit('actionPerformed')
            }else{
                console.log('error al unirse al grupo')
            }
        }else{
            console.log('escribe un nombre de usuario')
        }
    }
</script>

<template>
    <section class='container'>
        <h3>Unirse a un grupo</h3>
        <div class='container-actions'>
            <span>{{ modal_s.data.code }}</span>
            <span>{{ modal_s.data.name }}</span>
            <div>
                <label for='username'>Nombre de usuario</label>
                <input type='text' v-model='username' placeholder='nombre de usuario...'>
            </div>
            <button @click='joinGroup'>Unirse</button>
        </div>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

</style>