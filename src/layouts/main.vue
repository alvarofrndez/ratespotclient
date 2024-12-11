<script setup>
    import { defineAsyncComponent, onBeforeMount } from 'vue'
    import { modalStore } from '@/stores/modal.js'
    import { userStore } from '@/stores/user.js'
    import { spotStore } from '@/stores/spot'
    import { toastStore } from '@/stores/toast'

    const Header = defineAsyncComponent(() => import('@/components/HeaderComponent.vue'))
    const Modal = defineAsyncComponent(() => import('@/components/modal/ModalComponent.vue'))
    const ChooseGroup = defineAsyncComponent(() => import('@/components/ChooseGroupComponent.vue'))
    const Spinner = defineAsyncComponent(() => import('@/components/SpinnerComponent.vue'))
    const Toast = defineAsyncComponent(() => import('@/components/ToastComponent.vue'))

    const modal_s = modalStore()
    const user_s = userStore()
    const spot_s = spotStore()
    const toast_s = toastStore()

    onBeforeMount(async () => {
        await getUserInfo()
    })

    async function handleActionPerformed(){
        await getUserInfo()
    }

    async function getUserInfo(){
        await user_s.check()

        if(user_s.user_active)
            await spot_s.getGroupSpots(user_s.user.group_id)
    }
</script>

<template>
    <div v-if='user_s.user_active === true' class='global-container'>
        <Header/>
        <main>
            <RouterView/>
        </main>
    </div>
    <Spinner v-else />
    <ChooseGroup v-if='user_s.user_active === false'/>

    <Modal v-if='modal_s.showing' @actionPerformed='handleActionPerformed'/>
    <Toast v-if='toast_s.showing'/>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .global-container{
        // size
        width: 100%;
        height: 100%;
        
        main{
            // size
            width: 100%;
            height: 90%;

            // position
            position: relative;
        }
    }

</style>