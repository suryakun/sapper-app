<script>
  import { onMount, onDestroy } from "svelte";
  import StoryInput from "./StoryInput.svelte";
  import Post from './Post.svelte'
  import { stories, mergeStory, putStory, mergeComment, resetStory } from "../stores/story.store.js";
  import { ErrorModal } from "../helpers/alert";

  let localStories = [];
  let listeners = []
  let start
  let end
  const limit = 5

  function getStories(params) {
    const db = firebase.firestore();
    const ref = db.collection('story')
    ref.orderBy('timestamp', 'desc')
      .limit(limit)
      .get()
      .then(snapshot => {
        start = snapshot.docs[snapshot.docs.length - 1]
        if (!start) {
          return
        }
        const listener = ref.orderBy('timestamp')
          .startAt(start)
          .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              switch (change.type) {
                case "added":
                  putStory({...change.doc.data(), id: change.doc.id})
                  break;
                case "modified":
                  console.log(change.doc.data())
                  mergeComment({...change.doc.data(), id: change.doc.id})
                default:
                  break;
              }
            });
          })
        listeners.push(listener)
      })
  }

  function getMoreStories(params) {
    if (!start) {
      return
    }
    const db = firebase.firestore();
    const ref = db.collection('story')
    ref.orderBy('timestamp', 'desc')
      .startAt(start)
      .limit(limit)
      .get()
      .then(snapshot => {
        let collection = []
        end = start
        start = snapshot.docs[snapshot.docs.length - 1]
        const listener = ref.orderBy('timestamp')
          .startAt(start)
          .endBefore(end)
          .onSnapshot(stories => {
            stories.forEach(story => {
              collection.push({...story.data(), id: story.id})
            })
            collection.reverse()
            mergeStory(collection)
            collection = []
          })
        listeners.push(listener)
      })
  }

  onMount(async () => {
    try {
      resetStory()
      stories.subscribe((data) => {
        localStories = data;
      });

      getStories()

      window.addEventListener("scroll", function() {
        const {scrollHeight,scrollTop,clientHeight} = document.documentElement;
        if(scrollTop + clientHeight > scrollHeight - 5){
          getMoreStories()
        }
      });
    } catch (error) {
      console.log(error);
      ErrorModal(error.code);
    }
  });

  onDestroy(() => {
    listeners.forEach(listener => {
      listener()
    });
  })

</script>

<!-- center posts -->
<div class="col-md-6 post-container">
  <div class="row">
    <!-- left posts-->
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <StoryInput />
          {#each localStories as item}
            <!--   posts -->
            <Post item={item} />
            <!--  end posts-->
          {/each}
        </div>
      </div>
    </div>
    <!-- end left posts-->
  </div>
</div>
<!-- end  center posts -->