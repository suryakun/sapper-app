<script>
    import { onMount } from "svelte";
    import { profile } from '../stores/user.store.js'
    import { showLoading, hideLoading } from '../stores/app.store.js'
    import { ErrorModal } from "../helpers/alert"

    let localUser
    let textStory

    onMount(() => {
        profile.subscribe(user => {
            localUser = user
        })
    })

    async function submitPost() {
        try {
            showLoading()
            if(!textStory.length || !localUser) return
            const db = firebase.firestore()
            await db.collection("story").doc().set({
                ...localUser,
                content: textStory,
                timestamp: Date.now()
            })
            textStory = null
            hideLoading()
        } catch (error) {
            console.log(error)
            ErrorModal("GENERAL_ERROR")
            hideLoading()
        }
    }
</script>

<!-- post state form -->
<div class="box profile-info n-border-top">
    <form>
        <textarea class="form-control input-lg p-text-area" rows="2" bind:value={textStory} placeholder="Apa yang anda pikirkan saat ini?" maxlength="300"></textarea>
    </form>
    <div class="box-footer box-form">
        <button type="button" class="btn btn-azure pull-right" on:click={submitPost}>Post</button>
        <ul class="nav nav-pills">
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- <li><a><i class="fa fa-map-marker"></i></a></li> -->
            <li><a href="test"><i class="fa fa-camera"></i></a></li>
            <!-- <li><a href="test"><i class=" fa fa-film"></i></a></li> -->
            <!-- <li><a href="test"><i class="fa fa-microphone"></i></a></li> -->
        </ul>
    </div>
</div><!-- end post state form -->