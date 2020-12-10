<script>
    import { onMount } from "svelte";
    import StoryInput from "./StoryInput.svelte";
    import { stories, addStory } from '../stores/story.store.js'
    import { ErrorModal } from "../helpers/alert";

    let localStories = []

    onMount(async () => {
        try {
            const db = firebase.firestore()
            const query = await db.collection(`story`).get()
            query.forEach(story => {
                addStory(story.data())
            });
            stories.subscribe(data => {
                localStories = data
            })
            console.log(localStories)
        } catch (error) {
            console.log(error)
            ErrorModal(error.code)
        }
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
                    {#if item.imageUrl !== ""}
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img alt="image"class="img-circle" src={item.imageUrl} />
                    {:else}
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img alt="image"class="img-circle" src="img/profile.svg" />
                    {/if}
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <span class="username"><a href="test">John Breakgrow jr.</a></span>
                    <span class="description">Shared publicly - 7:30 PM Today</span>
                    </div>
                </div>

                <div class="box-body" style="display: block;">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img alt="image"class="img-responsive show-in-modal" src="img/Post/young-couple-in-love.jpg" />
                    <p>I took this photo this morning. What do you guys think?</p>
                    <button type="button" class="btn btn-default btn-xs"><i class="fa fa-share"></i> Share</button>
                    <button type="button" class="btn btn-default btn-xs"><i class="fa fa-thumbs-o-up"></i> Like</button>
                    <span class="pull-right text-muted">127 likes - 3 comments</span>
                </div>
                <div class="box-footer box-comments" style="display: block;">
                    <div class="box-comment">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img alt="image"class="img-circle img-sm" src="img/Friends/guy-2.jpg" />
                    <div class="comment-text">
                        <span class="username">
                        Maria Gonzales
                        <span class="text-muted pull-right">8:03 PM Today</span>
                        </span>
                        It is a long established fact that a reader will be distracted
                        by the readable content of a page when looking at its layout.
                    </div>
                    </div>

                    <div class="box-comment">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img alt="image"class="img-circle img-sm" src="img/Friends/guy-3.jpg" />
                    <div class="comment-text">
                        <span class="username">
                        Luna Stark
                        <span class="text-muted pull-right">8:03 PM Today</span>
                        </span>
                        It is a long established fact that a reader will be distracted
                        by the readable content of a page when looking at its layout.
                    </div>
                    </div>
                </div>
                <div class="box-footer" style="display: block;">
                    <form action="#" method="post">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img alt="image"class="img-responsive img-circle img-sm" src="img/Friends/guy-3.jpg" />
                    <div class="img-push">
                        <input type="text" class="form-control input-sm" placeholder="Press enter to post comment">
                    </div>
                    </form>
                </div>
                </div>
                <!--  end posts-->
            {/each}




            <!-- post -->
            <div class="box box-widget">
            <div class="box-header with-border">
                <div class="user-block">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img alt="image"class="img-circle" src="img/Friends/guy-3.jpg" />
                <span class="username"><a href="test">Jonathan Burke Jr.</a></span>
                <span class="description">Shared publicly - 7:30 PM Today</span>
                </div>
                <div class="box-tools">
                <button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="" data-original-title="Mark as read">
                <i class="fa fa-circle-o"></i></button>
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="box-body">
                <p>Far far away, behind the word mountains, far from the
                countries Vokalia and Consonantia, there live the blind
                texts. Separated they live in Bookmarksgrove right at</p>

                <p>the coast of the Semantics, a large language ocean.
                A small river named Duden flows by their place and supplies
                it with the necessary regelialia. It is a paradisematic
                country, in which roasted parts of sentences fly into
                your mouth.</p>

                <div class="attachment-block clearfix">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="attachment-img" src="img/Photos/2.jpg" alt="Attachment Image"/>
                <div class="attachment-pushed">
                <h4 class="attachment-heading"><a href="http://www.bootdey.com/">Lorem ipsum text generator</a></h4>
                <div class="attachment-text">
                Description about the attachment can be placed here.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry... <a href="test">more</a>
                </div>
                </div>
                </div>
                <button type="button" class="btn btn-default btn-xs"><i class="fa fa-share"></i> Share</button>
                <button type="button" class="btn btn-default btn-xs"><i class="fa fa-thumbs-o-up"></i> Like</button>
                <span class="pull-right text-muted">45 likes - 2 comments</span>
            </div>
            <div class="box-footer box-comments">
                <div class="box-comment">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="img-circle img-sm" src="img/Friends/guy-5.jpg" alt="User Image"/>
                <div class="comment-text">
                    <span class="username">
                    Maria Gonzales
                    <span class="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                </div>
                </div>
                <div class="box-comment">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="img-circle img-sm" src="img/Friends/guy-6.jpg" alt="User Image"/>
                <div class="comment-text">
                    <span class="username">
                    Nora Havisham
                    <span class="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    The point of using Lorem Ipsum is that it has a more-or-less
                    normal distribution of letters, as opposed to using
                    'Content here, content here', making it look like readable English.
                </div>
                </div>
            </div>
            <div class="box-footer">
                <form action="#" method="post">
                <img class="img-responsive img-circle img-sm" src="img/Friends/guy-3.jpg" alt="Alt Text"/>
                <div class="img-push">
                    <input type="text" class="form-control input-sm" placeholder="Press enter to post comment">
                </div>
                </form>
            </div>
            </div><!-- end post -->

            <!--  posts -->
            <div class="box box-widget">
            <div class="box-header with-border">
                <div class="user-block">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="img-circle" src="img/Friends/guy-3.jpg" alt="User Image"/>
                <span class="username"><a href="test">John Breakgrow jr.</a></span>
                <span class="description">Shared publicly - 7:30 PM Today</span>
                </div>
            </div>

            <div class="box-body" style="display: block;">
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac iaculis ligula, eget efficitur nisi. In vel rutrum orci. Etiam ut orci volutpat, maximus quam vel, euismod orci. Nunc in urna non lectus malesuada aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam dignissim mi ac metus consequat, a pharetra neque molestie. Maecenas condimentum lorem quis vulputate volutpat. Etiam sapien diam
                </p>
                <button type="button" class="btn btn-default btn-xs"><i class="fa fa-share"></i> Share</button>
                <button type="button" class="btn btn-default btn-xs"><i class="fa fa-thumbs-o-up"></i> Like</button>
                <span class="pull-right text-muted">127 likes - 3 comments</span>
            </div>
            <div class="box-footer box-comments" style="display: block;">
                <div class="box-comment">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="img-circle img-sm" src="img/Friends/guy-2.jpg" alt="User Image"/>
                <div class="comment-text">
                    <span class="username">
                    Maria Gonzales
                    <span class="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                </div>
                </div>

                <div class="box-comment">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="img-circle img-sm" src="img/Friends/guy-3.jpg" alt="User Image"/>
                <div class="comment-text">
                    <span class="username">
                    Luna Stark
                    <span class="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                </div>
                </div>
            </div>
            <div class="box-footer" style="display: block;">
                <form action="#" method="post">
                <img class="img-responsive img-circle img-sm" src="img/Friends/guy-3.jpg" alt="Alt Text"/>
                <div class="img-push">
                    <input type="text" class="form-control input-sm" placeholder="Press enter to post comment">
                </div>
                </form>
            </div>
            </div><!--  end posts -->

            <!--   posts -->
            <div class="box box-widget">
            <div class="box-header with-border">
                <div class="user-block">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="img-circle" src="img/Friends/guy-3.jpg" alt="User Image"/>
                <span class="username"><a href="test">John Breakgrow jr.</a></span>
                <span class="description">Shared publicly - 7:30 PM Today</span>
                </div>
            </div>

            <div class="box-body" style="display: block;">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="img-responsive pad" src="img/Photos/3.jpg" alt="Photo"/>
                <p>I took this photo this morning. What do you guys think?</p>
                <button type="button" class="btn btn-default btn-xs"><i class="fa fa-share"></i> Share</button>
                <button type="button" class="btn btn-default btn-xs"><i class="fa fa-thumbs-o-up"></i> Like</button>
                <span class="pull-right text-muted">127 likes - 3 comments</span>
            </div>
            <div class="box-footer box-comments" style="display: block;">
                <div class="box-comment">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="img-circle img-sm" src="img/Friends/guy-2.jpg" alt="User Image"/>
                <div class="comment-text">
                    <span class="username">
                    Maria Gonzales
                    <span class="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                </div>
                </div>

                <div class="box-comment">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img class="img-circle img-sm" src="img/Friends/guy-3.jpg" alt="User Image"/>
                <div class="comment-text">
                    <span class="username">
                    Luna Stark
                    <span class="text-muted pull-right">8:03 PM Today</span>
                    </span>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                </div>
                </div>
            </div>
            <div class="box-footer" style="display: block;">
                <form action="#" method="post">
                <img class="img-responsive img-circle img-sm" src="img/Friends/guy-3.jpg" alt="Alt Text"/>
                <div class="img-push">
                    <input type="text" class="form-control input-sm" placeholder="Press enter to post comment">
                </div>
                </form>
            </div>
            </div><!--  end posts -->
        </div>
        </div>
    </div><!-- end left posts-->
    </div>
</div><!-- end  center posts -->