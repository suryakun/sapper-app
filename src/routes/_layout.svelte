<script>
	import Nav from '../components/Nav.svelte';
	import { onMount } from 'svelte'
	import { goto, stores } from '@sapper/app'
	import AuthMiddleware from '../middlewares/authMiddleware'
	import { loading } from '../stores/app.store.js'

	export let segment;
	const { page } = stores()
	console.log("segment", segment)

	onMount(async () => {
		loading.update(load => true)
		page.subscribe(({ path, params, query }) => {
			const from = window.location.pathname;
			const redirect = (href) => { goto(href); }
			AuthMiddleware.beforeChange(from, path, redirect, params, query);
		})
	})
</script>

{#if $loading}
	<div class="loading">Loading&#8230;</div>
{/if}
<!-- Dont use Navbar if segment is index -->
{#if segment}	
	<Nav {segment}/>
{/if}
<main>
	<slot></slot>
</main>