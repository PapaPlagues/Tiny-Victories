import Card from "./Card";
import '../../styles/PostList.css';

const PostList = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return <p>No posts available.</p>
    }

    return(
        <div id="post-list">
            {posts.map((post) => (
                <Card
                    key={post.id}
                    title={post.title}
                    excerpt={post.content}
                    link={`/posts/${post.id}`}
                />
            ))}
        </div>
    );
};

export default PostList;