<style>
</style>

<script context="module">
	export async function preload(page, session) {
	}
</script>

<svelte:head>
	<title>Sapper project template</title>
	<meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Siimple - Bootstrap Landing Page Template</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="asset-index/img/favicon.png" rel="icon">
  <link href="asset-index/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,600,600i,700,700i" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="asset-index/css/style.css" rel="stylesheet">
</svelte:head>

<script>
	import { goto } from '@sapper/app'
	function logout(params) {
		return firebase.auth().signOut().then(() => {
			goto('/login')
		})
	}
</script>

<!-- <button on:click={logout}>Logout</button> -->
<!-- ======= Header ======= -->
<header id="header">
<div class="container-fluid">

	<div class="logo float-left">
	<h1 class="text-light"><a href="index.html"><span></span></a></h1>
	</div>

	<!-- <button type="button" class="nav-toggle"><i class="bx bx-menu"></i></button> -->
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right index-navbar">
        <li class="actives nav-option"><a href="/">Home</a></li>
        <li class="actives nav-option"><a href="/posts">Posts</a></li>
        <li class="actives nav-option"><a href="/pos">Forum</a></li>
      </ul>
	</div>
</div>
</header><!-- End /header -->

<!-- ======= Hero Section ======= -->
<section id="hero">
<div class="hero-container">
	<h1>RT.01 Permata Padalarang</h1>
	<h2>Paguyuban warga RT.01 Permata Padalarang</h2>

</div>
</section>
<footer id="footer">
<div class="container">
	<div class="copyright">
	&copy; Copyright <strong><span>Permata padalarang</span></strong>. All Rights Reserved
	</div>
	<div class="credits">
	<!-- All the links in the footer should remain intact. -->
	<!-- You can delete the links only if you purchased the pro version. -->
	<!-- Licensing information: https://bootstrapmade.com/license/ -->
	<!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/free-bootstrap-landing-page/ -->
	Designed by <a href="https://bootstrapmade.com/">Surya</a>
	</div>
</div>
</footer><!-- End /footer -->