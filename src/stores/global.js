import { defineStore } from 'pinia'

export const globalStore = defineStore('global', () => {
  const API_URL = import.meta.env.VITE_API_URL
  const USER_LOCALSTORAGE_KEY = import.meta.env.VITE_USER_LOCALSTORAGE_KEY
  const GROUP_LOCALSTORAGE_KEY = import.meta.env.VITE_GROUP_LOCALSTORAGE_KEY
  const GROUP_LOCALSTORAGE_SALT = import.meta.env.VITE_GROUP_LOCALSTORAGE_SALT

  return {
    API_URL,
    USER_LOCALSTORAGE_KEY,
    GROUP_LOCALSTORAGE_KEY,
    GROUP_LOCALSTORAGE_SALT
  }
})
