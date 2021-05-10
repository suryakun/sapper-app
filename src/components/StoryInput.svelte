<script>
    import Swal from 'sweetalert2'
    import { onDestroy, onMount } from "svelte";
    import { user } from '../stores/user.store.js'
    import { showLoading, hideLoading } from '../stores/app.store.js'
    import { ErrorModal } from "../helpers/alert"

    let localUser
    let textStory = ''

    onMount(() => {
        user.subscribe(u => {
            localUser = u
        })
    })

    async function submitPost(e, file) {
        try {
            showLoading()
            if(!textStory.length || !localUser) return
            const payload = {
                ...localUser,
                content: textStory,
                comments: [],
                timestamp: firebase.firestore.Timestamp.now()
            }
            setTimeout(async () => {
                if (file) {
                    // for 200px
                    const url200 = `${file.split('.').slice(0, -1).join('.')}_200x200.png`
                    const filename200 = url200.substring(url200.lastIndexOf('/')+1);
                    const smallRef = firebase.storage().ref().child(decodeURIComponent(filename200))
                    const small = await smallRef.getDownloadURL()

                    // for 500px
                    const url500 = `${file.split('.').slice(0, -1).join('.')}_500x500.png`
                    const filename500 = url500.substring(url500.lastIndexOf('/')+1);
                    const thumbRef = firebase.storage().ref().child(decodeURIComponent(filename500))
                    const thumb = await thumbRef.getDownloadURL()
                    payload.images = [
                        {
                            original: file,
                            small,
                            thumb
                        }
                    ]
                }
                const db = firebase.firestore()
                const storyRef = await db.collection("story").add(payload)
                textStory = null
                const notif = {
                    ...payload,
                    id: storyRef.id,
                }
                await db.collection("notification").add(notif)
                hideLoading()
            }, 2000);
        } catch (error) {
            console.log(error)
            ErrorModal("GENERAL_ERROR")
            hideLoading()
        }
    }

    async function fileChanged(file, text) {
        try {
            showLoading()
            if(!file) {
                throw new Error('storage/no-profile-pic')
            }
            const image = firebase.storage().ref(`/stories/${Date.now() + file.name}`).put(file)
            image.on('state_changed', 
                function progress(snapshot) {
                    var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    console.log(percentage)
                },
                function error(err) {
                    console.log(err)
                },
                async function complete() {
                    const url = await image.snapshot.ref.getDownloadURL()
                    submitPost(null, url)
                }
            )
            hideLoading()
        } catch (error) {
            console.log(error)
            ErrorModal(error.code)
        }
    }

    async function openFileModal() {
        const { value: file } = await Swal.fire({
            title: 'Tambahkan gambar',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Pilih photo profile anda'
            }
        })

        if (file) {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const { value: text} = await Swal.fire({
                    imageUrl: e.target.result,
                    imageAlt: 'The uploaded picture',
                    input: 'textarea',
                    inputValue: textStory, 
                    inputPlaceholder: 'Apa yang anda pikirkan?'
                })
                textStory = text
                fileChanged(file, text)
            }
            reader.readAsDataURL(file)
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
            <li on:click={openFileModal}><a><i class="fa fa-camera"></i></a></li>
            <!-- <li><a href="test"><i class=" fa fa-film"></i></a></li> -->
            <!-- <li><a href="test"><i class="fa fa-microphone"></i></a></li> -->
        </ul>
    </div>
</div><!-- end post state form -->