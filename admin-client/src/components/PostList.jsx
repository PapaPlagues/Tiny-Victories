import Card from "./Card";
import '../styles/PostList.css';

const PostList = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return <p>No posts available.</p>
    }

    return(
        <div className="post-table">
                {posts.map((post) => (
                   <Card
                        key={post.id}
                        title={post.title}
                        published={post.published}
                        id={post.id}
                    />
                
                ))}
        </div>
       
    )
}

export default PostList;