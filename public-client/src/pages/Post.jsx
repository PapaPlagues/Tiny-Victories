import { useOutletContext, useParams } from "react-router";
import '../styles/Post.css';
import { useEffect, useState } from "react";
import Comments from "../components/Comments";
import Tag from "../components/Tag";

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
    const tagList = post.tags || [];

    return(
        <>
            <header className="post-header">

                <div className="post-header-inner">

                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="post-cover"
                            style={{ width: "100%", maxHeight: "400px", objectFit: "cover", marginBottom: "1rem" }}
                        />
                    )}


                    <h1>{post.title}</h1>

                    <div className="post-meta">
                        <span>
                            By {post.author.username}
                        </span>

                        <span>
                            {createdDate.toLocaleDateString("en-US", {
                                year:"numeric",
                                month:"long",
                                day:"numeric"
                            })}
                        </span>
                    </div>

                    
                    <p>Updated {" "}
                        {updatedDate.toLocaleTimeString("en-US", {
                            year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                    </p>

                    <div className="post-tags">
                            {tagList.map((tag, index) => (
                                <Tag key={index}>
                                    {typeof tag === "string" ? tag : tag.name}
                                </Tag>
                            ))}
                    </div>

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