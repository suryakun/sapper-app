<style>
  .img-center {
    margin-left: auto;
    margin-right: auto;
  }
</style>
<script>
  import moment from 'moment'
  import { onMount } from 'svelte';
  import { user } from '../stores/user.store.js'
  export let item
  let textComment = ''
  let profile = {}
  let showComment = false

  onMount(() => {
    user.subscribe(u => {
      profile = u
    })
  })

  function addComment(event) {
    if (event.key === 'Enter') {
      const db = firebase.firestore()
      const ref = db.collection('story').doc(item.id)
      ref.update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          ...profile,
          comment: textComment,
          createdAt: firebase.firestore.Timestamp.now()
        })
      })
      textComment = ''
    }
  }

</script>

<div class="box box-widget">
  <div class="box-header with-border">
    <div class="user-block">
      {#if item.photoURL !== ''}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img alt="image" class="img-circle" src={item.photoURL} />
      {:else}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img alt="image" class="img-circle" src="img/profile.svg" />
      {/if}
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <span class="username"><a
          href="test">{item.displayName || item.email}</a></span>
      <span class="description">{moment(item.timestamp.toDate()).fromNow()}</span>
    </div>
  </div>

  <div class="box-body" style="display: block;" >
    <!-- svelte-ignore a11y-img-redundant-alt -->
    {#if item.images && item.images.length}
      {#each item.images as image}
        <img alt="image" class="img-responsive show-in-modal img-center" src={image.thumb} type="image/png" />
      {/each}
    {/if}
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <p>{item.content}</p>
    <button type="button" class="btn btn-default btn-xs"><i
        class="fa fa-share" />
      Share</button>
    <button type="button" class="btn btn-default btn-xs"><i
        class="fa fa-thumbs-o-up" />
      Like</button>
    {#if item.comments}
      <span class="pull-right text-muted" on:click={() => showComment = !showComment}> {item.comments.length} comments</span>
    {/if}
  </div>
  {#if showComment}
    <div class="box-footer box-comments" style="display: block;">
      {#if item.comments}
        {#each item.comments as comment}
          <div class="box-comment">
            {#if comment.photoURL}
              <!-- svelte-ignore a11y-img-redundant-alt -->
              <img alt="image" class="img-circle img-sm" src={comment.photoURL} />
            {:else}
              <!-- svelte-ignore a11y-img-redundant-alt -->
              <img alt="image" class="img-circle img-sm" src="img/profile.svg" />
            {/if}
            <div class="comment-text">
              <span class="username">
                {comment.displayName || comment.email}
                <span class="text-muted pull-right">{moment(comment.createdAt.toDate()).fromNow()}</span>
              </span>
              {comment.comment}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  {:else}
    <div class="box-footer box-comments" style="display: block;">
    {#if item.comments && item.comments[item.comments.length - 1]}
      <div class="box-comment">
        {#if item.comments[item.comments.length - 1].photoURL}
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img alt="image" class="img-circle img-sm" src={item.comments[item.comments.length - 1].photoURL} />
        {:else}
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img alt="image" class="img-circle img-sm" src="img/profile.svg" />
        {/if}
        <div class="comment-text">
          <span class="username">
            {item.comments[item.comments.length - 1].displayName || item.comments[item.comments.length - 1].email}
            <span class="text-muted pull-right">{moment(item.comments[item.comments.length - 1].createdAt.toDate()).fromNow()}</span>
          </span>
          {item.comments[item.comments.length - 1].comment}
        </div>
      </div>
    {/if}
    </div>
  {/if}
  <div class="box-footer" style="display: block;">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    {#if item.photoURL}
      <img
        alt="image"
        class="img-responsive img-circle img-sm"
        src={item.photoURL} />
    {:else}
      <img
        alt="image"
        class="img-responsive img-circle img-sm"
        src="img/Friends/guy-3.jpg" />
    {/if}
    <div class="img-push">
      <input
        type="text"
        bind:value={textComment}
        on:keydown={addComment}
        class="form-control input-sm"
        placeholder="Press enter to post comment" />
    </div>
  </div>
</div>