<script setup>
    import { ref, onMounted, onUnmounted, watch, defineAsyncComponent } from "vue"
    import { mapStore } from "@/stores/map"
    import { modalStore } from "@/stores/modal"
    import { spotStore } from "@/stores/spot"
    import { userStore } from "@/stores/user"

    const Spinner = defineAsyncComponent(() => import('@/components/SpinnerComponent.vue'))

    const map_s = mapStore()
    const modal_s = modalStore()
    const spot_s = spotStore()
    const user_s = userStore()

    const { selected_place } = defineProps(['selected_place'])

    const map_element = ref(null)

    function loadGoogleMapsScript(){
        return new Promise((resolve, reject) => {
            if (window.google && window.google.maps) {
                resolve()
                return
            }

            const script = document.createElement("script")
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDeRHdaxcBP2Q92YlAwJ3VnYBCq0jGlTpw&libraries=places";
            script.async = true
            script.defer = true

            script.onload = resolve
            script.onerror = reject

            document.head.appendChild(script)
        })
    }

    async function initMap(positon){
        if (map_element.value && window.google && window.google.maps && positon) {
            map_s.map = new google.maps.Map(map_element.value, {
                center: { lat: positon.lat, lng: positon.lng },
                zoom: 15,
                disableDefaultUI: true,
                keyboardShortcuts: false
            });

            map_s.user_marker = new google.maps.Marker({
                position: { lat: positon.lat, lng: positon.lng },
                map: map_s.map,
                title: "Tú estás aquí",
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeColor: "#FFFFFF",
                    strokeWeight: 2,
                },
            });

            map_s.initPlaceService()

            map_s.map.addListener('click', (e) => {
                e.stop()

                if(!e.placeId){
                    return
                }

                const request = {
                    placeId: e.placeId,
                    fields: ['name', 'formatted_address', 'rating', 'place_id', 'geometry', 'types', 'photos']
                }

                map_s.place_service.getDetails(request, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        place.types = spot_s.filterSpotTypes(place.types)

                        if(place.types)
                            modal_s.openModal('NewSpot', place)
                    } else {
                        console.error('Error al obtener los detalles del lugar:', status);
                    }
                })
            })

            map_s.startTracking()
        }
    }

    function setOnUserPosition(){
        if(map_s.user_marker.getPosition().lat() != map_s.map.getCenter().lat() && map_s.user_marker.getPosition().lng() != map_s.map.getCenter().lng())
            map_s.startTracking()

        map_s.map.setCenter(map_s.user_marker.getPosition())
        map_s.map.setZoom(15)
    }

    watch(() => selected_place, (new_place) => {
        if (new_place) {
            map_s.stopTracking()
            map_s.map.setCenter(new_place.geometry.location)
            map_s.map.setZoom(20)

            /**
             * marcador para indicar el lugar seleccionado, desactivado porque si esta no se clica sobre el lugar
             * y se clica sobre el marcador por lo que no se abre el modal con los detalles del lugar 
             **/
            // new google.maps.Marker({
            //     position: new_place.geometry.location,
            //     map: map_s.map,
            //     title: new_place.name,
            // })
        }
    })

    onMounted(async () => {
        try {
            const result = await map_s.getUserLocation()
            if(result){
                await loadGoogleMapsScript()
                initMap(result)
            }
        } catch (error) {
            console.error('Error al cargar Google Maps:', error)
        }
    })

    onUnmounted(() => {
        map_s.stopTracking()
    })
</script>

<template>
    <icon name='co-reload' class='set-on-user-position' @click='setOnUserPosition'/>
    <div ref="map_element" id='map'></div>

    <Spinner v-if="!map_s.map" />
</template>
  
<style scoped lang='scss'>
    @import '@/assets/style.scss';

    #map {
        // size
        width: 100%;
        height: 100%;
    }
    
    .set-on-user-position{
        // position
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 1000;

        // decoration
        background-color: $h-c-background;
        border-radius: 50%;
        border: 1px solid $h-c-border;
        padding: 5px;
    }
</style>