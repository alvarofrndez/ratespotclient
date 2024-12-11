import { defineStore } from 'pinia'
import { ref } from 'vue'
import { globalStore } from '@/stores/global.js'

const global_s = globalStore()

export const groupStore = defineStore('group', () => {
    const group = ref({})

    async function createGroup(name, code, username){
        const response = await fetch(global_s.API_URL + '/groups/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                code: code,
                username: username
            })
        })

        if(!response.ok){
            return false
        }

        const data = await response.json()
        return data
    }

    async function generateCode(){
        const response = await fetch(global_s.API_URL + '/groups/generateCode')

        if(!response.ok){
            return false
        }

        const data = await response.json()
        return data
    }

    function setNewGroup(group, user){
        group.value = group
        const current_groups = JSON.parse(localStorage.getItem(global_s.GROUP_LOCALSTORAGE_KEY)) || []
        current_groups.push(global_s.GROUP_LOCALSTORAGE_SALT + '' + group.id + '-' + group.code + '-' + user.id)
        localStorage.setItem(global_s.GROUP_LOCALSTORAGE_KEY, JSON.stringify(current_groups))
    }

    async function getGroupsOfLocalStorage(){
        let groups_localstorage = localStorage.getItem(global_s.GROUP_LOCALSTORAGE_KEY)
        let groups = groups_localstorage ? JSON.parse(groups_localstorage) : []
        let result = []

        for(let grp of groups){
            let group_key = grp.split('-')
            let group_id = group_key[0].slice(global_s.GROUP_LOCALSTORAGE_SALT.length)

            const group = await getGroupByIdWithUser(group_id, group_key[2])

            result.push(group)
        }

        return result
    }

    async function getGroupById(id){
        const response = await fetch(global_s.API_URL + '/groups/' + id)

        if(!response.ok){
            return false
        }

        const data = await response.json()
        return data
    }

    async function getGroupByIdWithUser(id, user_id){
        const response = await fetch(global_s.API_URL + '/groups/' + id + '/' + user_id)

        if(!response.ok){
            return false
        }

        const data = await response.json()
        return data
    }

    function setActiveGroup(group){
        group.value = group
    }

    function leaveGroup(){
        const current_groups = JSON.parse(localStorage.getItem(global_s.GROUP_LOCALSTORAGE_KEY))
        const new_groups = current_groups.filter(grp => grp.split('-')[0] !== global_s.GROUP_LOCALSTORAGE_SALT + '' + group.value.id)
        localStorage.setItem(global_s.GROUP_LOCALSTORAGE_KEY, JSON.stringify(new_groups))
        group.value = {}
    }

    async function getGroupByCode(code){
        const result = await fetch(global_s.API_URL + '/group/' + code)

        if(!result.ok){
            return false
        }

        const data = await result.json()
        return data
    }

    async function deleteGroup(id){
        const response = await fetch(global_s.API_URL + '/group/' + id, {
            method: 'DELETE',
        })

        if(!response.ok){
            return false
        }

        const data = await response.json()

        leaveGroup()
        group.value = {}

        return data
    }

    return {
        group,
        createGroup,
        generateCode,
        setNewGroup,
        getGroupsOfLocalStorage,
        getGroupById,
        getGroupByIdWithUser,
        setActiveGroup,
        leaveGroup,
        getGroupByCode,
        deleteGroup,
    }
})