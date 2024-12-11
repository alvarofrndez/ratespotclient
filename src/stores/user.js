import { defineStore } from "pinia"
import { ref } from "vue"
import { globalStore } from "@/stores/global.js"
import { groupStore } from "@/stores/group.js"

const global_s = globalStore()
const group_s = groupStore()

export const userStore = defineStore('user', () => {
    const user = ref({})
    const user_active = ref(null)

    async function check(){
        let user_key = localStorage.getItem(global_s.USER_LOCALSTORAGE_KEY)

        if(user_key){
            const result = await getUserWithGroup(user_key)

            if(result){
                user_active.value = true
                return true
            }

            user_active.value = false
            return false
        }else{
            user_active.value = false
            return false
        }
    }

    async function getUserWithGroup(user_key){
        const response = await fetch(`${global_s.API_URL}/users/${user_key}`)

        if(!response.ok){
            return false
        }

        const data = await response.json()
        user.value = data.user
        group_s.group = data.group
        return true
    }

    function setActiveUser(active_user){
        user.value = active_user
        user_active.value = true
        localStorage.setItem(global_s.USER_LOCALSTORAGE_KEY, active_user.id)
    } 

    async function leaveGroup(){
        const response = await fetch(`${global_s.API_URL}/groups/leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user.value.id
            })
        })

        if(!response.ok){
            return false
        }

        user.value = {}
        user_active.value = false
        localStorage.removeItem(global_s.USER_LOCALSTORAGE_KEY)

        group_s.leaveGroup()

        return true
    }

    async function joinToGroup(username, group){
        const response = await fetch(`${global_s.API_URL}/users/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                group_id: group.id
            })
        })

        if(!response.ok){
            return false
        }

        const data = await response.json()

        setActiveUser(data.user)
        group_s.setNewGroup(group, data.user)

        return true
    }

    function logout(){
        user.value = {}
        user_active.value = false
        localStorage.removeItem(global_s.USER_LOCALSTORAGE_KEY)
    }

    return { user, user_active, check, getUserWithGroup, setActiveUser, leaveGroup, joinToGroup, logout }
})