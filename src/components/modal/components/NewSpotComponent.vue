<script setup>
    import { onMounted, ref } from 'vue'
    import { modalStore } from '@/stores/modal.js'
    import { spotStore } from '@/stores/spot'
    import { userStore } from '@/stores/user'
    import { useRouter } from 'vue-router'
    import { toastStore } from '@/stores/toast'

    // stores
    const modal_s = modalStore()
    const spot_s = spotStore()
    const user_s = userStore()
    const router = useRouter()
    const toast_s = toastStore()

    const photo = ref(null)
    const is_already_saved = ref(false)

    onMounted(async () => {
        if(modal_s.data.photos.length > 0)
            photo.value = scalePhoto(modal_s.data.photos[0])

        is_already_saved.value = spot_s.isAlreadySaved(user_s.user.group_id + '-' + modal_s.data.place_id)
    })

    async function newSpot(e) {
        e.stopPropagation()

        const result = await spot_s.newSpot(
            modal_s.data.place_id,
            modal_s.data.name,
            modal_s.data.geometry.location.lat(),
            modal_s.data.geometry.location.lng(),
            modal_s.data.formatted_address
        )

        if (result) {
            modal_s.closeModal()
            toast_s.show('lugar guardado', 'success')
            router.push('/spots/' + user_s.user.group_id + '-' + modal_s.data.place_id)
            await spot_s.getGroupSpots(user_s.user.group_id)
        }else{
            toast_s.show('error al guardar el lugar', 'error')
        }
    }

    async function deleteSpot(e) {
        e.stopPropagation()

        const result = await spot_s.deleteSpot(user_s.user.group_id + '-' + modal_s.data.place_id)

        if (result) {
            modal_s.closeModal()
            toast_s.show('lugar eliminado', 'success')
            await spot_s.getGroupSpots(user_s.user.group_id)
        }else{
            toast_s.show('error al eliminar el lugar', 'error')
        }
    }

    function goTo() {
        if(is_already_saved.value){
            router.push('/spots/' + user_s.user.group_id + '-' + modal_s.data.place_id)
            modal_s.closeModal()
        }
    }

    function scalePhoto(photo) {
        if(photo.width > 75 || photo.height > 75) {
            const scale = Math.max(photo.width, photo.height) / 75
            return {
                getUrl: () => photo.getUrl({ maxWidth: photo.width / scale, maxHeight: photo.height / scale }),
                width: photo.width / scale,
                height: photo.height / scale
            }
        }
    }
</script>

<template>
    <div class='container-data' @click='goTo'>
        <div v-if='photo' class='photo-container'>
            <img :src='photo.getUrl()' :width='photo.width' :height='photo.height' alt='photo'/>
        </div>
        <div class='container-principal-info'>
            <p v-if='modal_s.data.name'>{{ modal_s.data.name }}</p>
            <div v-if='modal_s.data.formatted_address'>
                <icon name='md-locationon-sharp' scale='.85'/>
                <span>{{ modal_s.data.formatted_address }}</span>
            </div>
        </div>
        <div v-if='modal_s.data.types.length > 0'>
            <span>{{ modal_s.data.types.join(', ') }}</span>
        </div>
        <div v-if='modal_s.data.rating' class='container-rate'>
            <icon name='hi-star' scale='.85'/>
            <span>{{ modal_s.data.rating }}</span>
        </div>
        
        <icon class='add-icon' @click='newSpot' name='md-bookmarkadd-outlined' v-if='!is_already_saved'/>
        <icon class='add-icon' @click='deleteSpot' name='md-bookmarkadded-round' v-else/>
    </div>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .container-data {
        // size
        width: 100%;

        // position
        position: relative;

        // display
        @include flex(column, flex-start, flex-start, 2rem);

        *{
            // decoration
            color: $h-c-secondary !important;
            font-size: $h-f-text-small !important;
        }

        .photo-container {
            // display
            @include flex(row, center, center);

            // decoration
            overflow: hidden;
            border-radius: 10px;
        }

        .container-principal-info{
            // size
            width: 100%;

            // display
            @include flex(column, flex-start, flex-start, .5rem);

            p{
                // decoration
                font-size: $h-f-text-medium !important;
                color: $h-c-text !important;
            }

            div{
                // size
                width: 100%;

                // display
                @include flex(row, flex-start, flex-end, .5rem);

                // decoration
                overflow: hidden;

                span{
                    // size
                    width: 100%;

                    // decoration
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: flex-end;
                }
            }
        }

        .container-rate{
            // size
            width: 100%;

            // display
            @include flex(row, flex-start, flex-end, .3rem);

            span{
                // size
                width: 100%;

                // decoration
                text-align: flex-end;
            }
        }

        .add-icon{
            // position
            position: absolute;
            top: 0;
            right: 0;

            *{
                // decoration
                color: $h-c-text !important;
            }
        }
    }
</style>