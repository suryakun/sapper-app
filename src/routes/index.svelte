<style>
</style>

<script context="module">
	export async function preload(page, session) {
	}
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script>
	import { goto } from '@sapper/app'
	function logout(params) {
		return firebase.auth().signOut().then(() => {
			goto('/login')
		})
	}
</script>

<h1>Great success!</h1>

<figure>
	<img alt='Success Kid' src='successkid.jpg'>
	<figcaption>Have fun with Sapper!</figcaption>
</figure>
<button on:click={logout}>Logout</button>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
