import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userStore } from '@/stores/user.js'
import { globalStore } from '@/stores/global'

const user_s = userStore()
const global_s = globalStore()

export const spotStore = defineStore('spot', () => {

    const spots = ref(null)

    async function newSpot(id, name, lat, lng, address){
        const response = await fetch(global_s.API_URL + '/spots/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: name,
                lat: lat,
                lng: lng,
                address: address,
                user: user_s.user
            })
        })

        if(!response.ok){
            return false
        }

        const data = await response.json()
        return data
    }

    async function getGroupSpots(group_id){
        const response = await fetch(global_s.API_URL + '/spots/' + group_id)

        if(!response.ok){
            return false
        }

        const data = await response.json()
        spots.value = data
    }

    async function getSpotById(spot_id){
        const response = await fetch(global_s.API_URL + '/spot/' + spot_id)

        if(!response.ok){
            return false
        }

        const data = await response.json()
        return data
    }

    async function addRate(spot_id, rate){
        const response = await fetch(global_s.API_URL + '/spot-rate/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                spot_id: spot_id,
                rate: rate,
                user_id: user_s.user.id
            })
        })

        if(!response.ok){
            return false
        }

        const data = await response.json()
        return data
    }

    async function editRate(spot_id, rate){
        const response = await fetch(global_s.API_URL + '/spot-rate/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                spot_id: spot_id,
                rate: rate,
                user_id: user_s.user.id
            })
        })

        if(!response.ok){
            return false
        }

        const data = await response.json()
        return data
    }

    async function deleteSpot(spot_id){
        const response = await fetch(global_s.API_URL + '/spot/' + spot_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(!response.ok){
            return false
        }

        return true
    }

    function filterSpotTypes(types){
        const allowed_types = ['restaurant', 'bar', 'cafe', 'food', 'lodging', 'point_of_interest', 'establishment']

        if (types.some((type) => allowed_types.includes(type))) {
            const final_types = types.filter((type) => allowed_types.includes(type))

            return translateTypes(final_types)
        }

        return false
    }

    function translateTypes(types){
        const translations = {
            'restaurant': 'Restaurante',
            'bar': 'Bar',
            'cafe': 'Café',
            'food': 'Comida',
            'lodging': 'Alojamiento',
            'point_of_interest': 'Punto de interés',
            'establishment': 'Establecimiento'
        }

        return types.map((type) => translations[type])
    }

    function isAlreadySaved(spot_id){
        return spots.value.some((spot) => spot.id === spot_id)
    }

    function getSpotRateMedia(spot){
        let sum = 0
        let media = 0

        for(let rate of spot.rates){
            sum += parseFloat(rate.rate)
        }

        media = sum / spot.rates.length

        if(isNaN(media)){
            return '0/0'
        }

        return media + '/10'
    }

    function convertDate(date){
        const new_date = new Date(date);

        return `${new_date.getDate()}-${new_date.getMonth() + 1}-${new_date.getFullYear()}`
    }

    function getUserSpotRate(spot){
        const rate = spot.rates.find((rate) => rate.user_id === user_s.user.id)

        if(!rate){
            return '0'
        }

        if(Number.isInteger(parseFloat(rate.rate))){
            return parseInt(rate.rate) + '/10'
        }

        return rate.rate + '/10'
    }

    return {
        spots,
        newSpot,
        getGroupSpots,
        getSpotById,
        addRate,
        editRate,
        deleteSpot,
        filterSpotTypes,
        isAlreadySaved,
        getSpotRateMedia,
        convertDate,
        getUserSpotRate,
    }
})
