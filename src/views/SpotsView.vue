<script setup>
    import { defineAsyncComponent, onMounted, ref } from 'vue'
    import { userStore } from '@/stores/user.js'
    import { groupStore } from '@/stores/group.js'
    import { spotStore } from '@/stores/spot'

    const SpotsList = defineAsyncComponent(() => import('@/components/SpotsListComponent.vue'))
    const Spinner = defineAsyncComponent(() => import('@/components/SpinnerComponent.vue'))

    const user_s = userStore()
    const group_s = groupStore()
    const spot_s = spotStore()

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
    }

    async function deleteGroup() {
        const result = await group_s.deleteGroup(group_s.group.id)
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

    <icon class='action-leave' name='io-exit-outline' flip='horizontal' @click='deleteGroup' v-if='spot_s.spots'/>
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
        left: 15px;
    }

    .action-delete{
        right: 15px;
    }
</style>