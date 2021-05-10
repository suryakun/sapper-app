<script>
  export let segment;
  console.log(segment);
</script>

<nav class="navbar navbar-white navbar-fixed-top app-nav" role="navigation">
  <div class="container">
    <div class="navbar-header">
      <button id="menu-toggle" type="button" class="navbar-toggle">
        <span class="sr-only">Navigasi</span>
        <span class="icon-bar bar1">Home</span>
        <span class="icon-bar bar2">Posts</span>
        <span class="icon-bar bar3">Forum</span>
      </button>
      <a class="navbar-brand" href="profile.html">Permata 1</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <li class="actives"><a href="/">Home</a></li>
        <li class="actives"><a href="/posts">Posts</a></li>
        <li class="actives"><a href="/pos">Forum</a></li>
      </ul>
    </div>
  </div>
</nav>
