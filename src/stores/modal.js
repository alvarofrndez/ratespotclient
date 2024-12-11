import { defineStore } from 'pinia'
import { defineAsyncComponent, ref, shallowRef } from 'vue'

export const modalStore = defineStore('modal', () => {

    let showing = ref(false)
    let component = shallowRef(null)
    let data = ref({})

    let onRateAddCallback = ref(null)
    let onRateEditCallback = ref(null)

    function openModal(comp, dt = {}){
        setComponent(comp)
        data.value = dt
        showing.value = true
    }

    function resetData(){
        data.value = {}
    }

    function setComponent(comp){
        switch(comp){
            case 'NewSpot':
                component.value = defineAsyncComponent(() => import('@/components/modal/components/NewSpotComponent.vue'))
                break
            case 'NewGroup':
                component.value = defineAsyncComponent(() => import('@/components/modal/components/NewGroupComponent.vue'))
                break
            case 'JoinGroup':
                component.value = defineAsyncComponent(() => import('@/components/modal/components/JoinGroupComponent.vue'))
                break
            case 'AddRate':
                component.value = defineAsyncComponent(() => import('@/components/modal/components/AddRateComponent.vue'))
                break
            case 'EditRate':
                component.value = defineAsyncComponent(() => import('@/components/modal/components/EditRateComponent.vue'))
                break
            default:
                component.value = null
        }     
    }

    function closeModal(){
        showing.value = false
    }

    function setOnRateAddCallback(callback){
        onRateAddCallback.value = callback
    }

    function triggerOnRateAddCallback(){
        if(onRateAddCallback.value)
            onRateAddCallback.value()
    }

    function setOnRateEditCallback(callback){
        onRateEditCallback.value = callback
    }

    function triggerOnRateEditCallback(){
        if(onRateEditCallback.value)
            onRateEditCallback.value()
    }
    
    return{
        showing,
        component,
        data,
        onRateAddCallback,
        onRateEditCallback,
        openModal,
        resetData,
        closeModal,
        setOnRateAddCallback,
        triggerOnRateAddCallback,
        setOnRateEditCallback,
        triggerOnRateEditCallback,
    }
})