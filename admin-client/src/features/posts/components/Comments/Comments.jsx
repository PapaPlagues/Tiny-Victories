import './Comments.css';
import { deleteComment } from '../../api/postService';

const Comments = ({form, setForm}) => {

    const handleDeleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem("token");

            await deleteComment(form.id, commentId, token);

            setForm(prev => ({
                ...prev,
                comments: prev.comments.filter(c => c.id !== commentId)
            }));
        } catch(err) {
            console.error("Failed to delete comment:", err);
        }
    }

    return(
   <div className="form-group">
        <label htmlFor="comments">Comments</label>

        {form.comments.length === 0 ? (
            <p>No comments yet.</p>
        ) : (
            form.comments.map((comment) => (
            <div key={comment.id} className="comment-card">
                <div className="comment-header">
                    
                    <span className="comment-username">
                        {comment.username}
                    </span>

                    <button
                        type="button"
                        className="comment-delete-btn"
                        onClick={() => handleDeleteComment(comment.id)}
                    >
                        Delete
                    </button>
                </div>
            <p>{comment.content}</p>
        </div>
            ))
        )}

        </div>
    ) 
    
}

export default Comments;