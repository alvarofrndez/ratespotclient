<script setup>
    import { defineAsyncComponent, onMounted, ref } from 'vue'
    import { userStore } from '@/stores/user.js'
    import { groupStore } from '@/stores/group.js'
    import { spotStore } from '@/stores/spot'
    import { toastStore } from '@/stores/toast'

    const SpotsList = defineAsyncComponent(() => import('@/components/SpotsListComponent.vue'))
    const Spinner = defineAsyncComponent(() => import('@/components/SpinnerComponent.vue'))

    const user_s = userStore()
    const group_s = groupStore()
    const spot_s = spotStore()
    const toast_s = toastStore()

    const groups = ref(null)

    function handleGroupSelected(group){
        group_s.group = {
            id: group.id,
            name: group.name,
            code: group.code
        }

        spot_s.spots = null
        user_s.setActiveUser(group.user)
    }

    onMounted(async () => {
        await user_s.check()
        groups.value = await group_s.getGroupsOfLocalStorage()
    })

    async function leaveGroup() {
        const result = await user_s.leaveGroup()

        if(result)
            toast_s.show('grupo abandonado', 'success')
        else
            toast_s.show('error al abandonar el grupo', 'error')
    }

    async function deleteGroup() {
        const result = await group_s.deleteGroup(group_s.group.id)

        if(result){
            user_s.logout()
            toast_s.show('grupo eliminado', 'success')
        }
        else
            toast_s.show('error al eliminar el grupo', 'error')
    }

    async function copyCode() {
        await navigator.clipboard.writeText(group_s.group.code)
        toast_s.show('codigo copiado', 'success')
    }
</script>

<template>
    <section v-if='user_s.user.id && group_s.group.id && groups' class='container-view'>
        <header>
            <ul>
                <li v-for='group in groups' :key='group.id' @click='() => handleGroupSelected(group)'>
                    <span :class="group.id == group_s.group.id ? 'active' : ''">
                        {{ group.name }}
                    </span>
                </li>
            </ul>
        </header>
        <SpotsList/>
    </section>

    <Spinner v-else />

    <span class='group-code' v-if='spot_s.spots'>
        {{ group_s.group.code }}
        <icon class='copy' name='io-copy' @click='copyCode'/>
    </span>
    <icon class='action-leave' name='io-exit-outline' flip='horizontal' @click='leaveGroup' v-if='spot_s.spots'/>
    <icon class='action-delete' name='md-delete' @click='deleteGroup' fill='red' v-if='spot_s.spots'/>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container-view{
        // size
        width: calc(100% - 30px);
        height: calc(100% - 70px);

        // position
        position: relative;

        // display
        @include flex(column, flex-start, flex-start, 2rem);

        // margin
        padding: 15px;

        header{
            // size
            width: 100%;
            height: 30px;

            // display
            @include flex();

            // decoration
            border-bottom: 1px solid $h-c-border;

            ul{
                // size
                width: 100%;
                height: 100%;

                // display
                @include flex(row, center, flex-start, 1rem);

                // decoration
                overflow-x: scroll;

                &::-webkit-scrollbar{
                    // display
                    display: none;
                }

                li{
                    span{
                        // decoration
                        white-space: nowrap;
                    }

                    .active{
                        // decoration
                        font-weight: bold;
                    }
                }
            }
        }

        .actions{
            // size
            width: 100%;

            // display
            @include flex(row, center, flex-end, 1rem);
        }
    }

    .action-delete, .action-leave{
        // position
        position: absolute;
        bottom: 10px;
        z-index: 10;

        // display
        @include flex(row);

        // margin
        padding: 5px;

        // decoration
        border-radius: 50%;
        border: 1px solid $h-c-border;
        background-color: $h-c-background;
    }

    .action-leave{
        right: 50px;
    }

    .action-delete{
        right: 15px;
    }

    .group-code{
        // position
        position: absolute;
        bottom: 10px;
        left: 15px;

        // display
        @include flex();

        // decoration
        font-weight: bold;

        .copy{
            // margin
            padding: 5px;
        }
    }
</style>