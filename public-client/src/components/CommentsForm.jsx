import '../styles/CommentsForm.css';
import { useState } from "react";
import { useParams, useOutletContext } from "react-router";

const CommentsForm = ({ setComments }) => {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");

    const { postId } = useParams();
    const { API_URL } = useOutletContext();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentSetting = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ username, content })
        };

        try {
            const res = await fetch(`${API_URL}/posts/${postId}/comments`, commentSetting);

            const newComment = await res.json();

            if (!res.ok) {
                console.log("Failed to post comment");
                return;
            }
         
            setComments((prev) => [...prev, newComment]);

            setUsername("");
            setContent("");
        } catch(err) {
            console.error(err);
        }
    };
   
    return(
          <form className="comment-form" onSubmit={handleSubmit}>
                <h3>Leave a Comment</h3>
                
                <div className="form-group">
                     <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Your name" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)} 
                        rows="5" 
                        placeholder="Share your thoughts..."
                    />
                </div>
               
               <button type="submit">
                Post Comment
               </button>
            </form>
    )
};

export default CommentsForm;