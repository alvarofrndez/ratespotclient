<script setup>
    import { ref, defineAsyncComponent, onMounted } from "vue"
    import { mapStore } from "@/stores/map"
    import { modalStore } from "@/stores/modal"

    const map_s = mapStore()
    const modal_s = modalStore()

    const emit = defineEmits(['placeSelected'])

    const search = ref('')
    const places = ref([])
    const showing = ref(true)

    function close(){
        showing.value = false
        places.value = []
        changeStyle()
    }

    function searchPlaces(){
        showing.value = true
        if (search.value.length > 0) {
            const request = {
                query: search.value,
                fields: ['name', 'formatted_address', 'rating', 'place_id', 'geometry', 'types', 'photos']
            }

            map_s.place_service.textSearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    const allowed_types = ['bar', 'museum', 'university', 'restaurant', 'park', 'library', 'church', 'mosque', 'synagogue', 'hindu_temple', 'city_hall', 'courthouse', 'embassy', 'fire_station', 'local_government_office', 'police', 'post_office', 'train_station', 'transit_station', 'airport', 'bus_station', 'subway_station', 'taxi_stand', 'light_rail_station', 'parking', 'car_rental', 'car_repair', 'car_wash', 'gas_station', 'atm', 'bank', 'insurance_agency', 'accounting', 'lawyer', 'doctor', 'dentist', 'hospital', 'pharmacy', 'veterinary_care', 'beauty_salon', 'hair_care', 'laundry', 'shoe_store', 'clothing_store', 'jewelry_store', 'book_store', 'electronics_store', 'hardware_store', 'furniture_store', 'home_goods_store', 'liquor_store', 'pet_store', 'store', 'bicycle_store', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'gas_station', 'movie_theater', 'stadium', 'amusement_park', 'aquarium', 'art_gallery', 'bowling_alley', 'casino', 'museum', 'zoo', 'campground', 'rv_park', 'park', 'natural_feature', 'point_of_interest', 'establishment'];
                    places.value = results.filter(place =>
                        place.types.some(type => allowed_types.includes(type))
                    )
                } else {
                    places.value = [
                        {
                            name: 'No se encontraron resultados',
                            not_clickable: true
                        }
                    ]
                }
            })
        } else {
            showing.value = false
            places.value = []
        }

        changeStyle()
    }

    function handlePlaceSelected(place){
        if(place.not_clickable) return

        close()
        emit('placeSelected', place)
    }

    function hideResults(e){
        e.stopPropagation()

        if(e.target.classList.contains('background-actioner'))
            close()
    }

    function changeStyle(){
        const input = document.querySelector('.searcher-spots input')
        if(input){
            if(showing.value == true){
                input.style.borderBottomLeftRadius = '0'
                input.style.borderBottomRightRadius = '0'
                input.style.borderBottom = '0px'
            } else {
                input.style.borderBottomLeftRadius = '10px'
                input.style.borderBottomRightRadius = '10px'
            }
        }
    }
</script>

<template>
    <div class='background-actioner' @click='hideResults' v-if="showing && search.length != ''"/>
    <section class='searcher-spots' v-if='map_s.place_service'>
        <input type='text' v-model='search' @input='searchPlaces' placeholder='Buscar lugares'>
        <div class='places-container' v-if="places.length > 0 && showing && search.length != ''">
            <ul>
                <li 
                    v-for='place in places' 
                    :key='place.place_id' 
                    @click='() => handlePlaceSelected(place)'
                    :style="places.indexOf(place) + 1 == places.length ? 'border: none !important;' : ''">
                    <p>{{ place.name }}</p>
                    <div v-if='place.formatted_address'>
                        <icon name='md-locationon-sharp' scale='.85'/>
                        <span>{{ place.formatted_address }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .searcher-spots{
        // size
        width: 60%;
        max-height: 85%;        

        // position
        position: absolute;
        top: 5%;
        left: 50%;
        z-index: 100;

        // display
        @include flex(column, flex-start, flex-start);

        // decoration
        transform: translateX(-50%);

        input{
            // size
            width: 100%;

            // margin
            padding: 5px;

            // decoration
            border-radius: 10px;
            border: 1px solid $h-c-border;
            background-color: $h-c-background;
            outline: none;            
        }

        .places-container{
            // size
            width: calc(100% + 5px);

            // display
            @include flex(center, flex-start, flex-start);

            // decoration
            background-color: $h-c-background;
            border-radius: 10px;
            padding: 5px !important;
            padding-left: 0px !important;
            border: 1px solid $h-c-border;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            overflow-y: scroll;

            &::-webkit-scrollbar{
                // size
                width: 5px;

                &-thumb{
                    // decoration
                    background-color: $h-c-border;
                    border-radius: 10px;
                }
            }

            ul{
                // size
                width: 100%;    

                // display
                @include flex(column, flex-start, flex-start);

                li{
                    // size
                    width: 100%;

                    // position
                    position: relative;
                    z-index: 1000;

                    // display
                    @include flex(column, flex-start, flex-start, 1rem);

                    // decoration
                    border-bottom: 1px solid $h-c-border;
                    cursor: pointer;
                    overflow: hidden;

                    &>*{
                        // decoration
                        padding: 5px !important;
                    }

                    div{
                        // size
                        width: 100%;

                        // display
                        @include flex(row, flex-end, flex-start, 5px);

                        // margin
                        padding-left: 2px !important;

                        *{
                            color: $h-c-secondary !important;
                        }

                        span{
                            // decoration
                            font-size: $h-f-text-small !important;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }

    .background-actioner{
        // size
        width: 100vw;
        height: 100vh;

        // position
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;

        // decoration
        background-color: rgba($color: $h-c-text, $alpha: .1);
    }
</style>