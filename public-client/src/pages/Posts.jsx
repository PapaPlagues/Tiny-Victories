import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import PostList from "../components/PostList";
import '../styles/Posts.css';
import '../styles/Tag.css';

const Posts = () => {
    const { backendData = [], refreshPosts } = useOutletContext();
    const [activeTag, setActiveTag] = useState(null);

    useEffect(() => {
        refreshPosts?.();
    }, [refreshPosts]);

    const allTags = [
        ...new Set(
            backendData.flatMap(post =>
                (post.tags || []).map(t =>
                    typeof t === "string" ? t : t.name
                )
            )
        )
    ];

    return (
        <>
            <header className="posts-header">
                <div className="posts-header-inner">
                    <h1>My <span className="brand">Tiny Victories</span></h1>

                    <p className="posts-subtitle">
                        A collection of projects, experiments, and things I'm figuring out.
                    </p>

                    <div className="tag-bar">
                        <span
                            className={`tag ${!activeTag ? "active" : ""}`}
                            onClick={() => setActiveTag(null)}
                        >
                            All
                        </span>

                        {allTags.map(tag => (
                            <span
                                key={tag}
                                className={`tag ${activeTag === tag ? "active" : ""}`}
                                onClick={() => setActiveTag(tag)}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                </div>
            </header>

            <section id='posts-body'>
                <PostList posts={backendData} activeTag={activeTag} setActiveTag={setActiveTag} />
            </section>
        </>
    );
};

export default Posts;
