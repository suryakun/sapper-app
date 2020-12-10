<script>
    import Swal from 'sweetalert2'
    import { user, profile } from '../stores/user.store.js'
    import { showLoading, hideLoading } from '../stores/app.store.js'
    import { onMount } from "svelte";
    import { ErrorModal } from "../helpers/alert"

    let name = ''
    let profileImate = 'img/profile.svg'

    async function initialize(userData) {
        if (userData) {
            const db = firebase.firestore()
            const query = await db.collection(`users`).where("userId", "==", userData.uid).get()
            if (!query.empty) {
                const snapshot = query.docs[0]
                const profileData = snapshot.data()
                name = userData.email
                profileImate = profileData.imageUrl
                profile.update(data => ({...userData, imageUrl: profileImate}))
            }
        } 
    }

    onMount(() => {
        user.subscribe(initialize)
    })

    async function saveProfile(location) {
        try {
            const uid = firebase.auth().currentUser.uid
            const db = firebase.firestore()
            const doc = await db.collection("users").doc(`profile-${uid}`).set({
                userId: uid,
                imageUrl: location
            })
        } catch (error) {
          ErrorModal(err.code)
        }
    }

    async function fileChanged(file) {
        try {
            showLoading()
            if(!file) {
                throw new Error('storage/no-profile-pic')
            }
            const uid = firebase.auth().currentUser.uid
            const image = await firebase.storage().ref(`/users/${uid}/profile/${file.name}`).put(file)
            const location = await firebase.storage().ref(image.metadata.fullPath).getDownloadURL()
            saveProfile(location)
            profileImate = location
            hideLoading()
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
    
    async function openFileModal() {
        const { value: file } = await Swal.fire({
            title: 'Perbaharui photo',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Pilih photo profile anda'
            }
        })

        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                Swal.fire({
                title: 'Photo profile anda',
                imageUrl: e.target.result,
                imageAlt: 'The uploaded picture'
                })
            }
            reader.readAsDataURL(file)
            fileChanged(file)
        } 
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
                <img alt="image" src={profileImate} on:click={openFileModal}/>
            </a>
            <h1>{name}</h1>
            <!-- <p>@username</p> -->
        </div>

        <ul class="nav nav-pills nav-stacked">
            <li><a href="test"> <i class="fa fa-image"></i> Photos</a></li>
            <!-- <li class="active"><a href="/pos"> <i class="fa fa-user"></i> Perbaharui photo profile </a></li> -->
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