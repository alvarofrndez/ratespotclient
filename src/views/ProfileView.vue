<script setup>
    import { userStore } from '@/stores/user'

    const user_s = userStore()

    function logout(){
        user_s.logout()
    }
</script>

<template>
    <div>
        <h1>Profile</h1>
        <button @click='logout'>Cerrar sesion</button>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';
</style>