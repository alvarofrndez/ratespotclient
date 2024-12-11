import { defineStore } from "pinia"
import { ref } from "vue"

export const mapStore = defineStore('map', () => {

    const map = ref(null)
    const place_service = ref(null)
    const user_marker = ref(null)
    const watch_id = ref(null)

    async function getUserLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                    reject("No se pudo obtener tu ubicación.")
                }
            ),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000,
            }
        })
    }

    async function getUserLocationIpapi(){
        const result = await fetch('https://ipapi.co/json/')

        if (!result.ok) {
            throw new Error("No se pudo obtener la ubicación del usuario.")
        }

        const data = await result.json()
        return data
    }

    function initPlaceService() {
        place_service.value = new google.maps.places.PlacesService(map.value)
    }

    function startTracking(){
        watch_id.value = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords

                const user_location = {
                    lat: latitude,
                    lng: longitude,
                }

                map.value.setCenter(user_location)
                user_marker.value.setPosition(user_location)
            },
            (error) => {
                console.error("Error al rastrear la ubicación:", error)
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000,
            }
        )
    }

    function startTrackingIpapi(){
        getUserLocationIpapi().then((data) => {
            const { latitude, longitude } = data
            const user_location = new google.maps.LatLng(latitude, longitude)
            
            map.value.setCenter(user_location)
            user_marker.value.setPosition(user_location)
        }).catch((error) => {
            console.error(error)
        })
    }

    function stopTracking(){
        navigator.geolocation.clearWatch(watch_id.value)
    } 
    
    return { map, place_service, user_marker, watch_id, getUserLocation, initPlaceService, startTracking, stopTracking }
})