import { writable } from 'svelte/store'
export const stories = writable([])
export const setStories = data => stories.set(data)
export const addStory = data => stories.update(list => ( [...list, data] ))
export const putStory = data => stories.update(list => ( [data, ...list] )) 