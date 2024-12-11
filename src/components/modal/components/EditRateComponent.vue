<script setup>
    import { onMounted, ref } from 'vue'
    import { spotStore } from '@/stores/spot.js'
    import { userStore } from '@/stores/user.js'
    import { modalStore } from '@/stores/modal.js'

    const spot_s = spotStore()
    const user_s = userStore()
    const modal_s = modalStore()

    const rate = ref(null)

    onMounted(() => {
        findRateOfUser()
    })

    async function editRate(){
        const result = await spot_s.editRate(modal_s.data.id, rate.value)
        
        if(result){
            modal_s.triggerOnRateEditCallback()
            modal_s.closeModal()
        }
    }

    function findRateOfUser(){
        for(let rt of modal_s.data.rates){
            if(rt.user_id === user_s.user.id){
                rate.value = rt.rate
            }
        }
    }

</script>

<template>
    <section>
        <h2>Rate</h2>
        <form @submit.prevent='editRate'>
            <input type='number' v-model='rate' placeholder='rate' required>
            <button type='submit'>Editar puntiacion</button>
        </form>
    </section>
</template>