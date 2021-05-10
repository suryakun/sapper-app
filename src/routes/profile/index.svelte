<script>
  import Swal from "sweetalert2";
  import { onMount } from "svelte";
  import { user } from "../../stores/user.store.js";
  import { showLoading, hideLoading } from '../../stores/app.store.js'
  import { ErrorModal } from "../../helpers/alert";

  let userLocal = {};
  let name, email, phone, block;
  let profileImage

  onMount(() => {
    user.subscribe((u) => {
      console.log(u);
      userLocal = u;
      profileImage = u && u.photoURL 
    });
  });

  async function saveProfile(location) {
    try {
      console.log(location);
      const currentUser = firebase.auth().currentUser;
      await currentUser.updateProfile({
        photoURL: location,
      });
    } catch (err) {
      ErrorModal(err.code);
    }
  }

  async function fileChanged(file) {
    try {
      showLoading();
      if (!file) {
        throw new Error("storage/no-profile-pic");
      }
      const uid = firebase.auth().currentUser.uid;
      const image = await firebase
        .storage()
        .ref(`/users/${uid}/profile/${file.name}`)
        .put(file);
      const location = await firebase
        .storage()
        .ref(image.metadata.fullPath)
        .getDownloadURL();
      saveProfile(location);
      profileImage = location;
      hideLoading();
    } catch (error) {
      console.log(error);
      ErrorModal(err.code);
    }
  }

  async function openFileModal() {
    const { value: file } = await Swal.fire({
      title: "Perbaharui photo",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Pilih photo profile anda",
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "Photo profile anda",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
      };
      reader.readAsDataURL(file);
      fileChanged(file);
    }
  }

  async function submit() {
    try {
      const currentUser = firebase.auth().currentUser;
      const payload = {
        displayName: name,
        email: email,
        phoneNumber: phone,
        block: block
      }

      const filteredPayload = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v != null && v.length > 0));
      console.log(filteredPayload)
      
      await currentUser.updateProfile(filteredPayload);
    } catch (err) {
      console.log(err)
      ErrorModal(err.code);
    }
  }

  $: console.log(userLocal);
</script>

<svelte:head>
  <link href="assets/css/edit_profile.css" rel="stylesheet" />
</svelte:head>

{#if userLocal}
  <div class="container page-content edit-profile">
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <!-- NAV TABS -->
        <ul class="nav nav-tabs nav-tabs-custom-colored tabs-iconized">
          <li class="active">
            <a href="pos" aria-expanded="true"><i class="fa fa-arrow-left" /> Kembali</a >
          </li>
          <!-- <li class="">
          <a href="#activity-tab" data-toggle="tab" aria-expanded="false"
            ><i class="fa fa-rss" /> Recent Activity</a
          >
        </li>
        <li class="">
          <a href="#settings-tab" data-toggle="tab" aria-expanded="false"
            ><i class="fa fa-gear" /> Settings</a
          >
        </li> -->
        </ul>
        <!-- END NAV TABS -->
        <div class="tab-content profile-page">
          <!-- PROFILE TAB CONTENT -->
          <div class="tab-pane profile active" id="profile-tab">
            <div class="row">
              <div class="col-md-3">
                <div class="user-info-left">
                  <!-- svelte-ignore a11y-img-redundant-alt -->
                  {#if profileImage}
                    <img src={profileImage} alt="Profile Picture" />
                  {:else}
                    <img src="img/profile.svg" alt="Profile Picture" />
                  {/if}
                  <h2>{userLocal.displayName}</h2>
                  <div class="contact">
                    <p>
                      <span class="file-input btn btn-azure btn-file" on:click={openFileModal}>
                        Ganti photo 
                      </span>
                    </p>
                    <!-- <p>
                    <span class="file-input btn btn-azure btn-file">
                      Change Cover <input type="file" multiple="" />
                    </span>
                  </p> -->
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="user-info-right">
                  <div class="basic-info">
                    <h3>
                      <i class="fa fa-square" /> Basic Information
                    </h3>
                    <p class="data-row">
                      <!-- <span class="data-name">Nama</span> -->
                      <input
                        type="text"
                        bind:value={name}
                        class="data-name"
                        placeholder="Nama"
                      />
                      <span class="data-value">{userLocal.displayName}</span>
                    </p>
                    <p class="data-row">
                      <input
                        type="email"
                        bind:value={email}
                        class="data-name"
                        placeholder="Email"
                      />
                      <span class="data-value">{userLocal.email}</span>
                    </p>
                    <p class="data-row">
                      <input
                        type="text"
                        bind:value={phone}
                        class="data-name"
                        placeholder="Telepon"
                      />
                      <span class="data-value">{userLocal.phoneNumber}</span>
                    </p>
                    <p class="data-row">
                      <input
                        type="text"
                        bind:value={block}
                        class="data-name"
                        placeholder="Blok / Nomor"
                      />
                      <!-- svelte-ignore a11y-invalid-attribute -->
                      <span class="data-value">{userLocal.address || ""}</span>
                    </p>
                    <!-- <p class="data-row">
                    <span class="data-name">Last Login</span>
                    <span class="data-value">2 hours ago</span>
                  </p>
                  <p class="data-row">
                    <span class="data-name">Date Joined</span>
                    <span class="data-value">Feb 22, 2012</span>
                  </p> -->
                  </div>
                  <!-- <div class="contact_info">
                  <h3>
                    <i class="fa fa-square" /> Contact Information
                  </h3>
                  <p class="data-row">
                    <span class="data-name">Email</span>
                    <span class="data-value">me@jonasmith.com</span>
                  </p>
                  <p class="data-row">
                    <span class="data-name">Phone</span>
                    <span class="data-value">(1800) 221 - 876543</span>
                  </p>
                  <p class="data-row">
                    <span class="data-name">Address</span>
                    <span class="data-value"
                      >Riverside City 66, 80123 Denver<br />Colorado</span
                    >
                  </p>
                </div> -->
                  <!-- <div class="about">
                  <h3><i class="fa fa-square" /> About Me</h3>
                  <p>
                    Dramatically facilitate proactive solutions whereas
                    professional intellectual capital. Holisticly utilize
                    competitive e-markets through intermandated meta-services.
                    Objectively.
                  </p>
                  <p>
                    Monotonectally foster future-proof infomediaries before
                    principle-centered interfaces. Assertively recaptiualize
                    cutting-edge web services rather than emerging "outside the
                    box" thinking. Phosfluorescently cultivate resource
                    maximizing technologies and user-centric convergence.
                    Completely underwhelm cross functional innovation vis-a-vis.
                  </p>
                </div> -->
                </div>
              </div>
            </div>
          </div>
          <!-- END PROFILE TAB CONTENT -->

          <!-- ACTIVITY TAB CONTENT -->
          <div class="tab-pane activity" id="activity-tab">
            <ul class="list-unstyled activity-list">
              <li>
                <i class="fa fa-times activity-icon pull-left" />
                <p>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">Jonathan</a> commented on
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">Special Deal 2013</a>
                  <span class="timestamp">12 minutes ago</span>
                </p>
              </li>
              <li>
                <i class="fa fa-times activity-icon pull-left" />
                <p>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">Jonathan</a> posted
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">a new blog post</a>
                  <span class="timestamp">4 hours ago</span>
                </p>
              </li>
              <li>
                <i class="fa fa-times activity-icon pull-left" />
                <p>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">Jonathan</a> edited his profile
                  <span class="timestamp">11 hours ago</span>
                </p>
              </li>
              <li>
                <i class="fa fa-times activity-icon pull-left" />
                <p>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">Jonathan</a> has added review on
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">jQuery Complete Guide</a>
                  book <span class="timestamp">Yesterday</span>
                </p>
              </li>
              <li>
                <i class="fa fa-times activity-icon pull-left" />
                <p>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">Jonathan</a> liked
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">a post</a>
                  <span class="timestamp">December 12</span>
                </p>
              </li>
              <li>
                <i class="fa fa-times activity-icon pull-left" />
                <p>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">Jonathan</a> has completed one task
                  <span class="timestamp">December 11</span>
                </p>
              </li>
              <li>
                <i class="fa fa-times activity-icon pull-left" />
                <p>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">Jonathan</a> uploaded
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">new photos</a>
                  <span class="timestamp">December 5</span>
                </p>
              </li>
              <li>
                <i class="fa fa-times activity-icon pull-left" />
                <p>
                  <!-- svelte-ignore a11y-invalid-attribute -->
                  <a href="#">Jonathan</a> has updated his credit card info
                  <span class="timestamp">September 28</span>
                </p>
              </li>
            </ul>
            <p class="text-center more">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a href="#" class="btn btn-custom-primary"
                >View more <i class="fa fa-long-arrow-right" /></a
              >
            </p>
          </div>
          <!-- END ACTIVITY TAB CONTENT -->

          <!-- SETTINGS TAB CONTENT -->
          <div class="tab-pane settings" id="settings-tab">
            <form class="form-horizontal" role="form">
              <fieldset>
                <h3><i class="fa fa-square" /> Change Password</h3>
                <div class="form-group">
                  <label for="old-password" class="col-sm-3 control-label"
                    >Old Password</label
                  >
                  <div class="col-sm-4">
                    <input
                      type="password"
                      id="old-password"
                      name="old-password"
                      class="form-control"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <label for="password" class="col-sm-3 control-label"
                    >New Password</label
                  >
                  <div class="col-sm-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="password2" class="col-sm-3 control-label"
                    >Repeat Password</label
                  >
                  <div class="col-sm-4">
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      class="form-control"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <h3><i class="fa fa-square" /> Privacy</h3>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      class="colored-blue"
                      checked="checked"
                    />
                    <span class="text">Show my display name</span>
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      class="colored-blue"
                      checked="checked"
                    />
                    <span class="text">Show my birth date</span>
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      class="colored-blue"
                      checked="checked"
                    />
                    <span class="text">Show my email</span>
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      class="colored-blue"
                      checked="checked"
                    />
                    <span class="text">Show my online status on chat</span>
                  </label>
                </div>
              </fieldset>
              <h3><i class="fa fa-square" />Notifications</h3>
              <fieldset>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      class="colored-blue"
                      checked="checked"
                    />
                    <span class="text">Receive message from administrator</span>
                  </label>
                </div>

                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      class="colored-blue"
                      checked="checked"
                    />
                    <span class="text">New product has been added</span>
                  </label>
                </div>

                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      class="colored-blue"
                      checked="checked"
                    />
                    <span class="text">Product review has been approved</span>
                  </label>
                </div>

                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      class="colored-blue"
                      checked="checked"
                    />
                    <span class="text">Others liked your post</span>
                  </label>
                </div>
              </fieldset>
            </form>
            <p class="text-center">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a href="#" class="btn btn-custom-primary"
                ><i class="fa fa-floppy-o" /> Save Changes</a
              >
            </p>
          </div>
          <!-- END SETTINGS TAB CONTENT -->
          <p class="text-center">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="btn btn-custom-primary" on:click={submit}
              ><i class="fa fa-floppy-o" /> Simpan Perubahan</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  input::placeholder {
    color: white;
  }
  img {
    width: 150px;
    height: 150px;
  }
</style>
