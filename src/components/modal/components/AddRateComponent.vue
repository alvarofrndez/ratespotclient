<script setup>
    import { ref } from 'vue'
    import { spotStore } from '@/stores/spot.js'
    import { userStore } from '@/stores/user.js'
    import { modalStore } from '@/stores/modal.js'

    const spot_s = spotStore()
    const user_s = userStore()
    const modal_s = modalStore()

    const rate = ref('')

    async function addRate(){
        const result = await spot_s.addRate(modal_s.data.id, rate.value)
        
        if(result){
            modal_s.triggerOnRateAddCallback()
            modal_s.closeModal()
        }
    }

</script>

<template>
    <section>
        <h2>Rate</h2>
        <form @submit.prevent='addRate'>
            <input type='number' v-model='rate' placeholder='rate' required>
            <button type='submit'>Añadir puntiacion</button>
        </form>
    </section>
</template>