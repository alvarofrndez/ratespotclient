<script setup>
    import { defineAsyncComponent, ref } from 'vue'

    const Map = defineAsyncComponent(() => import('@/components/MapComponent.vue'))
    const Search = defineAsyncComponent(() => import('@/components/SearchComponent.vue'))

    const selected_place = ref(null)

    function handlePlaceSelected(place){
        selected_place.value = place
    }
</script>

<template>
    <section>
        <Search @placeSelected='handlePlaceSelected'/>
        <Map :selected_place='selected_place' />
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    section{
        // size
        width: 100%;
        height: 100%;

        // position
        position: relative;
    }
</style>