<script>
  import { onMount, onDestroy } from "svelte";
  import StoryInput from "./StoryInput.svelte";
  import { stories, addStory, putStory } from "../stores/story.store.js";
  import { ErrorModal } from "../helpers/alert";
  import moment from "moment";

  let localStories = [];
  let unsubscribe

  onMount(async () => {
    try {
      stories.subscribe((data) => {
        localStories = data;
      });

      const db = firebase.firestore();
      unsubscribe = db.collection('story').orderBy('timestamp', 'asc')
          .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              putStory(change.doc.data())
            })
          })
    } catch (error) {
      console.log(error);
      ErrorModal(error.code);
    }
  });

  onDestroy(() => {
      unsubscribe && unsubscribe()
  })

</script>

<!-- center posts -->
<div class="col-md-6">
  <div class="row">
    <!-- left posts-->
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <StoryInput />
          {#each localStories as item}
            <!--   posts -->
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
                  <span
                    class="description">{moment(item.timestamp).fromNow()}</span>
                </div>
              </div>

              <div class="box-body" style="display: block;">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                {#if item.images && item.images.length}
                  {#each item.images as image}
                    <img
                      alt="image"
                      class="img-responsive show-in-modal"
                      src={image} />
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
                <span class="pull-right text-muted">127 likes - 3 comments</span>
              </div>
              <div class="box-footer box-comments" style="display: block;">
                <div class="box-comment">
                  <!-- svelte-ignore a11y-img-redundant-alt -->
                  <img
                    alt="image"
                    class="img-circle img-sm"
                    src="img/Friends/guy-2.jpg" />
                  <div class="comment-text">
                    <span class="username">
                      Maria Gonzales
                      <span class="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </div>
                </div>

                <div class="box-comment">
                  <!-- svelte-ignore a11y-img-redundant-alt -->
                  <img
                    alt="image"
                    class="img-circle img-sm"
                    src="img/Friends/guy-3.jpg" />
                  <div class="comment-text">
                    <span class="username">
                      Luna Stark
                      <span class="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </div>
                </div>
              </div>
              <div class="box-footer" style="display: block;">
                <form action="#" method="post">
                  <!-- svelte-ignore a11y-img-redundant-alt -->
                  <img
                    alt="image"
                    class="img-responsive img-circle img-sm"
                    src="img/Friends/guy-3.jpg" />
                  <div class="img-push">
                    <input
                      type="text"
                      class="form-control input-sm"
                      placeholder="Press enter to post comment" />
                  </div>
                </form>
              </div>
            </div>
            <!--  end posts-->
          {/each}
        </div>
      </div>
    </div>
    <!-- end left posts-->
  </div>
</div>
<!-- end  center posts -->
