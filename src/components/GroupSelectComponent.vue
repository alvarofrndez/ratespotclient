<script setup>
    import { groupStore } from '@/stores/group'
    import { onMounted, ref } from 'vue'

    const group_s = groupStore()

    const emit = defineEmits(['groupSelected'])

    const groups = ref([])
    const selected_group = ref(null)

    onMounted(async() => {
        groups.value = await group_s.getGroupsOfLocalStorage()
        selected_group.value = group_s.group
    })

    function handleGroupSelected(){
        emit('groupSelected', selected_group.value)
    }
</script>

<template>
    <select v-model='selected_group' @change='handleGroupSelected'>
        <option v-for='group in groups' :key='group.id' :value='group'>{{group.name}}</option>
    </select>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    select{
        // margin
        padding: 5px;

        // decoration
        border: 1px solid $h-c-border;
        border-radius: 10px;
        outline: none;
    }
</style>