import Card from "./Card";
import '../styles/PostList.css';

const PostList = ({ posts, activeTag, setActiveTag }) => {
    if (!posts || posts.length === 0) {
        return <p>No posts available.</p>
    }

    const filteredPosts = activeTag ? posts.filter(post =>
        post.tags?.some(tag => 
        (typeof tag === "string" ? tag : tag.name) === activeTag
        )
    ) : posts;

    return(
        <div id="post-list">
            {filteredPosts.map((post) => (
                <Card
                    key={post.id}
                    title={post.title}
                    excerpt={post.content}
                    img={post.imageUrl}
                    link={`/posts/${post.id}`}
                    tags={post.tags}
                    onTagClick={setActiveTag}
                />
            ))}
        </div>
    );
};

export default PostList;