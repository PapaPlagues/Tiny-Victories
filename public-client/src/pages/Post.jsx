import { useOutletContext, useParams } from "react-router";
import '../styles/Post.css';
import { useEffect, useState } from "react";
import Comments from "../components/Comments";

const Post = () => {
    const { API_URL } = useOutletContext();
    const { postId } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/posts/${postId}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [postId]);

    console.log(post);
    if (!post) {
        return <p>Loading post...</p>
    }

    const createdDate = new Date(post.createdAt);
    const updatedDate = new Date(post.updatedAt);

    return(
        <>
            {/* can have image here too */}
            <header className="post-header">
                <div className="post-header-inner">
                    <h1>{post.title}</h1>
                    {/* make authorid show author name later */}
                    <p>Posted by {post.author.username}</p>

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
                    <p>{post.content}</p>

                    <Comments post={post}/>
                </div> 
            </section>


            

        </>
    )
};


export default Post;