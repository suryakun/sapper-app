<script>
  import { goto } from '@sapper/app'
  import { ErrorModal } from "../helpers/alert"
  import { user } from '../stores/user.store';

  let displayName = ''
  let email = ''
  let password = ''
  let confpassword = ''
  let error = false

  async function register() {
    try {
      if (password !== confpassword) {
       ErrorModal("auth/wrong-password")
       return
      }
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const currentUser = firebase.auth().currentUser
      await currentUser.updateProfile({ displayName })
      user.update(u => ({ displayName, email }))
      goto("/pos")
    } catch (err) {
      console.log(err)
      ErrorModal(err.code)
    }
  }
</script>

<div class="card">
  <div class="card-block center">
    <h4 class="m-b-0"><span class="icon-text">Daftar</span></h4>
    <p class="text-muted">Daftarkan akun baru</p>
    {#if error}
      <span>{error}</span>
    {/if}
    <form on:submit|preventDefault={register}>
      <div class="form-group">
        <input bind:value={displayName} type="text" class="form-control" placeholder="Nama lengkap" />
      </div>
      <div class="form-group">
        <input bind:value={email} type="email" class="form-control" placeholder="Alamat Email" />
      </div>
      <div class="form-group">
        <input bind:value={password} type="password" class="form-control" placeholder="Password" />
      </div>
      <div class="form-group">
        <input
          bind:value={confpassword}
          type="password"
          class="form-control"
          placeholder="Confirm Password" />
      </div>
      <button type="submit" class="btn btn-azure">Daftar</button>
    </form>
  </div>
</div>
