import { writable } from 'svelte/store'
export const stories = writable([])
export const setStories = data => stories.set(data)
export const addStory = data => stories.update(list => ( [...list, data] ))
export const putStory = data => stories.update(list => ( [data, ...list] )) 
export const mergeStory = data => stories.update(list => ( list.concat(data) )) 
export const resetStory = data => stories.update(list => ( [] )) 
export const mergeComment = data => stories.update(list => {
    return list.map(el => el.id === data.id ? {...el, comments: data.comments} : el)
})