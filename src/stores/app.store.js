import { writable } from 'svelte/store'

export const loading = writable(true)
export const showLoading = () => loading.update(() => true)
export const hideLoading = () => loading.update(() => false)
