<script>
    import { user } from '../stores/user.store.js'
    import { onDestroy, onMount, beforeUpdate } from "svelte";
    import { ErrorModal } from "../helpers/alert"
    let fileForm
    let files
    let email = ''
    let profileImate = 'img/profile.svg'
    let userProfile

    // onDestroy(unsubscribeUser)

    onMount(() => {
        user.subscribe(async user => {
            if (user) {
                const db = firebase.firestore()
                const query = await db.collection(`users`).where("userId", "==", user.uid).get()
                if (!query.empty) {
                    const snapshot = query.docs[0]
                    const profile = snapshot.data()
                    email = user.email
                    profileImate = profile.imageUrl
                }
            } 
        })
    })

    function openFile() {
        fileForm.click()
    }

    async function saveProfile(location) {
        try {
            const uid = firebase.auth().currentUser.uid
            const db = firebase.firestore()
            const doc = await db.collection("users").doc(`profile-${uid}`).set({
                userId: uid,
                imageUrl: location
            })
            console.log(doc)
        } catch (error) {
          ErrorModal(err.code)
        }
    }

    async function fileChanged() {
        try {
            if(!fileForm.files.length) {
                throw new Error('storage/no-profile-pic')
            }
            const uid = firebase.auth().currentUser.uid
            const file = fileForm.files[0]
            const image = await firebase.storage().ref(`/users/${uid}/profile/${file.name}`).put(fileForm.files[0])
            const location = await firebase.storage().ref(image.metadata.fullPath).getDownloadURL()
            saveProfile(location)
            profileImate = location
        } catch (error) {
            console.log(err)
            ErrorModal(err.code)
        }
    }

	function logout(params) {
		return firebase.auth().signOut().then(() => {
			goto('/login')
		})
	}
</script>
<!-- left links -->
<div class="col-md-3">
    <div class="profile-nav">
    <div class="widget">
        <div class="widget-body">
        <div class="user-heading round">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img alt="image" src={profileImate} />
                <input type="file" style="display:none" bind:this={fileForm} bind:value={files} on:change={fileChanged} accept="image/*"/>
            </a>
            <p/><h6 style="border: 1px solid grey; padding: 8px; cursor: pointer; border-radius: 10px;" on:click={openFile}>Perbaharui Photo</h6>
            <h1>{email}</h1>
            <!-- <p>@username</p> -->
        </div>

        <ul class="nav nav-pills nav-stacked">
            <li class="active"><a href="/pos"> <i class="fa fa-user"></i> News feed</a></li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <li on:click={logout}><a> <i class="fa fa-sign-out"></i> Keluar</a></li>
            <!-- <li>
            <a href="test"> 
                <i class="fa fa-envelope"></i> Messages 
                <span class="label label-info pull-right r-activity">9</span>
            </a>
            </li>
            <li><a href="test"> <i class="fa fa-calendar"></i> Events</a></li>
            <li><a href="test"> <i class="fa fa-image"></i> Photos</a></li>
            <li><a href="test"> <i class="fa fa-share"></i> Browse</a></li>
            <li><a href="test"> <i class="fa fa-floppy-o"></i> Saved</a></li> -->
        </ul>
        </div>
    </div>

    <!-- <div class="widget">
        <div class="widget-body">
        <ul class="nav nav-pills nav-stacked">
            <li><a href="test"> <i class="fa fa-globe"></i> Pages</a></li>
            <li><a href="test"> <i class="fa fa-gamepad"></i> Games</a></li>
            <li><a href="test"> <i class="fa fa-puzzle-piece"></i> Ads</a></li>
            <li><a href="test"> <i class="fa fa-home"></i> Markerplace</a></li>
            <li><a href="test"> <i class="fa fa-users"></i> Groups</a></li>
        </ul>
        </div>
    </div> -->
    </div>
</div><!-- end left links -->