import { defineStore } from 'pinia'

export const globalStore = defineStore('global', () => {
  const API_URL = 'http://localhost:3000'
  const USER_LOCALSTORAGE_KEY = 'albondiga_frita'
  const GROUP_LOCALSTORAGE_KEY = 'salamance_alpinero'
  const GROUP_LOCALSTORAGE_SALT = '647280043212'

  return {
    API_URL,
    USER_LOCALSTORAGE_KEY,
    GROUP_LOCALSTORAGE_KEY,
    GROUP_LOCALSTORAGE_SALT
  }
})
