import { useOutletContext, useParams } from "react-router";
import '../styles/Post.css';

const Post = () => {
    const { backendData  = [] } = useOutletContext();
    const { postId } = useParams();

    // wait until data exists
    if (!backendData.length) {
        return <p>Loading post...</p>
    }

    const singlePost = backendData.find((post)=> String(post.id) === String(postId));

    if (!singlePost) {
        return <p>No post found</p>
    }

    const createdDate = new Date(singlePost.createdAt);
    const updatedDate = new Date(singlePost.updatedAt);

    return(
        <>
            {/* can have image here too */}
            <header className="post-header">
                <div className="post-header-inner">
                    <h1>{singlePost.title}</h1>
                    {/* make authorid show author name later */}
                    <p>Posted by {singlePost.authorId}</p>

                    <p>Created at {" "}
                        {createdDate.toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric",
                        })}
                    </p>
                    
                    <p>Updated {" "}
                        {updatedDate.toLocaleTimeString("en-US", {
                            year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                    </p>

                </div>
            </header>

            <section id="post-body">
                <div className="post-content">
                    <p>{singlePost.content}</p>
                </div>
            </section>
            

        </>
    )
};


export default Post;