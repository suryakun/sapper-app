<script>
    import { user } from '../stores/user.store.js'
    import { onMount } from "svelte";

    let profileImate 

    onMount(() => {
        user.subscribe((u) => {
            profileImate = u && u.photoURL
        })
    })

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
                {#if profileImate}
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img alt="image" src={profileImate} />
                {:else}
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img alt="image" src="img/profile.svg" />
                {/if}
            </a>
            <h1>{$user && $user.displayName}</h1>
            <!-- <p>@username</p> -->
        </div>

        <ul class="nav nav-pills nav-stacked">
            <li><a href="profile"> <i class="fa fa-user"></i> Profile</a></li>
            <li><a href="test"> <i class="fa fa-image"></i> Photos</a></li>
            <!-- <li class="active"><a href="/pos"> <i class="fa fa-user"></i> Perbaharui photo profile </a></li> -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <li on:click={logout}><a> <i class="fa fa-exit"></i> Keluar</a></li>
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