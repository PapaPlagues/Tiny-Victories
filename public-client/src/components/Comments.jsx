import Comment from "./Comment";
import '../styles/Comments.css';

const Comments = ({ post }) => {

    return(
        <div className="comments-content">
            <h2>Comments</h2>

            <form action="">
                <label htmlFor="comment">Comment here: </label>
                <input id="comment" type="text" />
            </form>

            <div className="comments-list">
                {post.comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        username={comment.username}
                        content={comment.content}
                        createdAt={comment.createdAt} 
                    />
                ))}
            </div>
        
        </div>
    )
}

export default Comments;