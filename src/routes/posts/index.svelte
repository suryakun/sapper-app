<svelte:head>
  <link href="assets/css/grid_posts.css" rel="stylesheet" />
  <script src="assets/js/jquery.1.11.1.min.js"></script>
  <script src="assets/js/grid_posts.js"></script>
</svelte:head>

<script>
  import Swal from 'sweetalert2'
  import { onMount } from "svelte";
  import moment from 'moment'
  let listeners = []
  let start
  let end
  const limit = 100
  let stories = []

  function getStories(params) {
    const db = firebase.firestore();
    const ref = db.collection('story').where("images", "!=", null)
    ref.orderBy('images')
      .limit(limit)
      .get()
      .then(snapshot => {
        // start = snapshot.docs[snapshot.docs.length - 1]
        // if (!start) {
        //   return
        // }
        // const listener = ref.orderBy('images')
        //   .startAt(start)
        //   .onSnapshot(snapshot => {
        //     snapshot.forEach(doc => {
        //       console.log(doc.data())
        //       stories = [...stories, doc.data()]
        //     });
        //   })
        // listeners.push(listener)
        snapshot.forEach(doc => {
          stories = [ doc.data(), ...stories ]
        });

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

  onMount( async () => {
    setTimeout(() => {
      window.$ && window.$('#blog-landing').pinterest_grid({
        no_columns: 4,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 700
      });
      getStories()
    }, 500);

  })

  function onClick(item) {
    Swal.fire({
      title: item.displayName,
      text: item.content,
      width: 1000,
      imageUrl: item.images[0].thumb,
      imageWidth: 800,
      imageHeight: 600,
      imageAlt: 'Custom image',
    })
  }
</script>

<!-- Begin page content -->
<div class="container page-content ">
  <div class="row">
    <div class="col-md-10 col-md-offset-1">
      <hr />
      <section id="blog-landing">
        {#each stories as story}
          <article class="white-panel animated fadeInUp" on:click={() => onClick(story)}>
            {#each story.images as image}
              <img src={image.small} alt="ALT" />
            {/each}
            <h1>
              <a href="view_photo.html">{`${story.displayName} posting pada tanggal ${moment(story.timestamp.toDate()).format("DD/mm/yyyy")}`}</a>
            </h1>
            <p>{story.content}<p>
          </article>
        {/each}
      </section>
    </div>
  </div>
</div>
