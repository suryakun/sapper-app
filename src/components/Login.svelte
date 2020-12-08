<script>
  import { goto } from "@sapper/app";
  import { ErrorModal } from "../helpers/alert"
  import About from "../routes/about.svelte";

  let email = "";
  let password = "";

  async function login() {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          goto("/pos")
        })
        .catch(err => {
          ErrorModal(err.code)
        })
    } catch (error) {
      ErrorModal('GENERAL_ERROR')
    }
  }
</script>

<div class="card">
  <div class="card-block">
    <div class="center">
      <h4 class="m-b-0"><span class="icon-text">Masuk</span></h4>
      <p class="text-muted">Akses akun anda</p>
    </div>
    <form on:submit|preventDefault={login}>
      <div class="form-group">
        <input bind:value={email} type="email" class="form-control" placeholder="Alamat Email" />
      </div>
      <div class="form-group">
        <input bind:value={password} type="password" class="form-control" placeholder="Password" />
        <!-- <a href="/" class="pull-xs-right"> <small>Forgot?</small> </a> -->
        <div class="clearfix" />
      </div>
      <div class="center">
        <button class="btn btn-azure"> Masuk </button>
      </div>
    </form>
  </div>
</div>
