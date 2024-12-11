<script setup>
    import { onMounted, defineAsyncComponent, watch } from 'vue'
    import { spotStore } from '@/stores/spot'
    import { userStore } from '@/stores/user'
    import { useRouter } from 'vue-router'

    const SpotRates = defineAsyncComponent(() => import('@/components/SpotRatesComponent.vue'))
    const Spinner = defineAsyncComponent(() => import('@/components/SpinnerComponent.vue'))

    const spot_s = spotStore()
    const user_s = userStore()
    const router = useRouter()

    onMounted(async () => {
        await spot_s.getGroupSpots(user_s.user.group_id)
    })

    function navigateTo(e, spot_id){
        router.push('/spots/' + spot_id)
    }

    async function deleteSpot(e, spot_id){
        e.stopPropagation()
        const result = await spot_s.deleteSpot(spot_id)

        if(result){
            await spot_s.getGroupSpots(user_s.user.group_id)
        }
    }
    
    watch(() => user_s.user, async () => {
        if(user_s.user.id){
            await spot_s.getGroupSpots(user_s.user.group_id)
        }
    })
</script>

<template>
    <section v-if='spot_s.spots' class='wrapped-spots'>
        <div v-if='spot_s.spots.length > 0' class='container-spots'>
            <article v-for='spot in spot_s.spots' :key='spot.id' @click='() => navigateTo(e, spot.id)'>
                <div class='container-photo'>
                    <img :src="spot.photo ? spot.photo : 'https://via.placeholder.com/150?text=Sin%20foto'" alt='foto del lugar'>
                </div>
                <div class='container-info'>
                    <p class='name'>{{ spot.name }}</p>
                    <p class='location'>{{ spot.address }}</p>
                    <div>
                        <p>{{ spot_s.getSpotRateMedia(spot) }}</p>
                        <p class='created-at'>{{ spot_s.convertDate(spot.created_at) }}</p>
                    </div>
                </div>
                <icon class='delete-spot' name='md-delete' @click='(e) => deleteSpot(e,spot.id)' />
            </article>
        </div>
        <div v-else class='no-spots'>
            <p>Aún sin lugares guardados</p>
        </div>
    </section>

    <Spinner v-else />
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .wrapped-spots{
        // size
        width: 100%;
        height: 100%;
        
        // decoration
        overflow-y: scroll;

        &::-webkit-scrollbar{
            display: none;
        }

        .container-spots{
            // size
            width: 100%;
            height: 100%;

            // display
            @include flex(column, center, flex-start, 2rem);

            article{
                // size
                width: calc(100% - 22px);

                // posotion
                position: relative;

                // display
                @include flex(row, flex-start, flex-start, 1.5rem);

                // margin
                padding: 10px;

                // decoration
                border: 1px solid $h-c-border;
                border-radius: 5px;

                .container-photo{
                    // size
                    width: 150px;
                    height: 150px;

                    // decoration
                    border-radius: 5px;
                    overflow: hidden;

                    img{
                        // size
                        width: 100%;
                        height: 100%;

                        // decoration
                        object-fit: cover;
                    }
                }

                .container-info{
                    // size
                    width: calc(100% - 150px);
                    height: 150px;

                    // display
                    @include flex(column, flex-start, flex-end, .5rem);

                    // decoration
                    overflow: hidden;

                    *{
                        // decoration
                        font-size: $h-f-text-small !important;
                        color: $h-c-secondary !important;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .name{
                        // decoration
                        font-size: $h-f-text !important;
                        font-weight: bold;
                        color: $h-c-text !important;
                    }

                    div{
                        // size
                        width: 100%;
                        
                        // display
                        @include flex(row, flex-start, space-between);

                        // margin
                        margin-top: 1.5rem !important;
                    }
                }

                .delete-spot{
                    // position
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }
            }
        }

        .no-spots{
            // size
            width: 100%;
            height: 100%;

            // display
            @include flex();

            p{
                // decoration
                font-size: $h-f-text-big !important;
                color: $h-c-secondary !important;
            }
        }
    }
</style>