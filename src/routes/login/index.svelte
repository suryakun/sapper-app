<svelte:head>
  <link href="assets/css/login_register.css" rel="stylesheet">
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import LoginForm from '../../components/Login.svelte'
  import RegisterForm from '../../components/Register.svelte'
  import { loading } from '../../stores/app.store.js'
  onMount(() => {
    loading.update(load => false)
  })
</script>

<div class="wrapper">
  <div class="parallax filter-black">
      <div class="parallax-image"></div>             
      <div class="small-info">
        <div class="col-sm-10 col-sm-push-1 col-md-6 col-md-push-3 col-lg-6 col-lg-push-3">
          <div class="card-group animated flipInX">
            <LoginForm />
            <RegisterForm />
          </div>
        </div>
      </div>
  </div>

  <footer class="footer">
    <div class="container">
      <p class="text-muted"> Copyright &copy; Company - All rights reserved </p>
    </div>
  </footer>
</div>