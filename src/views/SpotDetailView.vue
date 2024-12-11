<script setup>
    import { defineAsyncComponent } from 'vue'
    import { spotStore } from '@/stores/spot'
    import { userStore } from '@/stores/user'
    import { modalStore } from '@/stores/modal'
    import { onMounted, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { toastStore } from '@/stores/toast'

    const SpotRates = defineAsyncComponent(() => import('@/components/SpotRatesComponent.vue'))
    const Spinner = defineAsyncComponent(() => import('@/components/SpinnerComponent.vue'))

    const spot_s = spotStore()
    const user_s = userStore()
    const modal_s = modalStore()
    const route = useRoute()
    const router = useRouter()
    const toast_s = toastStore()

    const spot = ref(null)

    onMounted(() => {
        getSpot()
        modal_s.onRateAddCallback = getSpot
        modal_s.onRateEditCallback = getSpot
    })

    async function addRate(){
        modal_s.openModal('AddRate', spot.value)
    }

    async function editRate(){
        modal_s.openModal('EditRate', spot.value)
    }

    function canShow(){
        for(let rate of spot.value.rates){
            if(rate.user_id === user_s.user.id){
                return false
            }
        }

        return true
    }

    async function getSpot(){
        spot.value = await spot_s.getSpotById(route.params.id)
    }

    async function deleteSpot(){
        const result = await spot_s.deleteSpot(spot.value.id)

        if(result){
            await spot_s.getGroupSpots(user_s.user.group_id)
            toast_s.show('lugar eliminado', 'success')
            router.go(-1)
        }else{
            toast_s.show('error al eliminar el lugar', 'error')
        }
    }
</script>

<template>
    <section v-if='spot'>
        <icon class='back-icon' name='io-chevron-back-outline' @click='() => $router.go(-1)' scale='1.3'/>
        <icon class='delete-icon' name='md-bookmarkadded-round' @click='deleteSpot' scale='1.3'/>
        <div class='container-photo'>
            <img :src="spot.photo ? spot.photo : '/src/assets/images/placeholder-photo.png'" alt='foto del lugar'>
        </div>
        <article>
            <div class='container-data'>
                <header>
                    <p class='name'>{{ spot.name }}</p>
                    <span>{{ spot_s.getSpotRateMedia(spot) }}</span>
                </header>
                
                <div class='location'>
                    <icon name='md-locationon-sharp' scale='1.3'/>
                    <span>{{ spot.address }}</span>
                </div>
                <div class='footer'>
                    <footer>
                        <div>
                            <span>{{ spot_s.getUserSpotRate(spot) }}</span>
                            <icon v-if='canShow()' name='io-add-circle' @click='addRate' />
                            <icon v-else name='md-edit-round' @click='editRate'/>
                        </div>
                        <p>{{ spot_s.convertDate(spot.created_at) }}</p>
                    </footer>
                    <div class='separator' />
                </div>
            </div>
            <SpotRates :spot='spot'/>
        </article>
    </section>

    <Spinner v-else />

</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    section{
        // size
        width: 100%;
        height: 100%;

        // position
        position: relative;

        // display
        @include flex(column, flex-start, flex-start);

        .back-icon, .delete-icon{
            // position
            position: absolute;
            top: 1rem;

            // margin
            padding: 5px;
            
            // decoration
            background-color: $h-c-background;
            border-radius: 50%;
        }

        .back-icon{
            // position
            left: 1rem;
        }

        .delete-icon{
            // position
            position: absolute;
            top: 1rem;
            right: 1rem;
        }

        .container-photo{
            // size
            width: 100%;
            height: 60%;

            // decoration
            overflow: hidden;

            img{
                // size
                width: 100%;
                height: 100%;

                // position
                object-fit: cover;
            }
        }

        article{
            // size
            width: calc(100% - 4rem);
            height: 60%;

            // display
            @include flex(column, flex-start, space-between, 2rem);

            // margin
            padding: 3rem 2rem 0rem 2rem;

            // decoration
            border-top-left-radius: 45px;
            border-top-right-radius: 45px;
            background-color: $h-c-background;
            transform: translateY(-10%);
            
            *{
                // decoration
                font-size: $h-f-text-small !important;
            }

            .container-data{
                // size
                width: 100%;
                height: 100%;

                // display
                @include flex(column, flex-start, space-between);

                header{
                    // size
                    width: 100%;

                    // display
                    @include flex(row, center, space-between, 1rem);

                    *{
                        // decoration
                        font-size: $h-f-text !important;
                    }

                    .name{
                        // decoration
                        font-weight: bold;
                        color: $h-c-text;
                    }

                    span{
                        // decoration
                        font-weight: bold;
                    }
                }

                .location{
                    // display
                    @include flex(row, flex-start, center, .5rem);

                    *{
                        // decoration
                        font-size: $h-f-text !important;
                        color: $h-c-secondary !important;
                    }
                }

                .footer{
                    // size
                    width: 100%;

                    // display
                    @include flex(column, flex-start, flex-end, .5rem);

                    footer{
                        // size
                        width: 100%;

                        // display
                        @include flex(row, center, space-between);

                        *{
                            // decoration
                            color: $h-c-secondary !important;
                        }

                        div{
                            // display
                            @include flex(row, center, flex-start, .5rem);
                        }
                    }

                    .separator{
                        // size
                        width: 100%;
                        
                        // decoration
                        border-bottom: 1px solid $h-c-border;
                    }
                }
            }
        }
    }
</style>