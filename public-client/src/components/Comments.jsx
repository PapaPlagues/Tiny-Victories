import Comment from "./Comment";
import CommentsForm from "./CommentsForm";
import { useEffect, useState } from "react";
import '../styles/Comments.css';

const Comments = ({ post }) => {
    
    const [comments, setComments] = useState(post.comments || []);

    return(
        <div className="comments-content">
            <h2>Comments</h2>

          <CommentsForm setComments={setComments}/>

            <div className="comments-list">
                {comments.map((comment) => (
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