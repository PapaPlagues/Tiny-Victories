import Card from "../Card/Card";
import './PostList.css';

const PostList = ({ posts, onDelete }) => {
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
                        onDelete={onDelete}
                    />
                
                ))}
        </div>
       
    )
}

export default PostList;