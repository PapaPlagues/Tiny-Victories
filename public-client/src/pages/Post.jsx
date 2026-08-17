import { useOutletContext, useParams } from "react-router";
import "../styles/Post.css";
import { useEffect, useState } from "react";
import Comments from "../components/Comments";
import Tag from "../components/Tag";
import ReactMarkdown from "react-markdown";

const Post = () => {
    const { API_URL } = useOutletContext();
    const { postId } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/posts/${postId}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [API_URL, postId]);

    if (!post) {
        return <p className="post-loading">Loading post...</p>;
    }

    const createdDate = new Date(post.createdAt);
    const updatedDate = new Date(post.updatedAt);
    const tagList = post.tags || [];

    return (
        <>
            <header className="post-header">
                <div className="post-header-inner">

                {post.imageUrl ? (
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="post-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                ) : null}

                    <div className="post-heading">
                        <div className="post-tags">
                            {tagList.map((tag, index) => (
                                <Tag key={index}>
                                    {typeof tag === "string" ? tag : tag.name}
                                </Tag>
                            ))}
                        </div>

                        <h1>{post.title}</h1>

                        <div className="post-meta">
                            <span>
                                By {post.author.username}
                            </span>

                            <span>
                                {createdDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </span>

                            {post.updatedAt !== post.createdAt && (
                                <span>
                                    Updated{" "}
                                    {updatedDate.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </span>
                            )}
                        </div>
                    </div>

                </div>
            </header>

            <main id="post-body">
                <article className="post-content">
                    <ReactMarkdown>
                        {post.content}
                    </ReactMarkdown>

                    <Comments post={post} />
                </article>
            </main>
        </>
    );
};

export default Post;