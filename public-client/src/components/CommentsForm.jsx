import '../styles/CommentsForm.css';
import { useState } from "react";
import { useParams, useOutletContext } from "react-router";

const CommentsForm = ({ setComments }) => {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { postId } = useParams();
    const { API_URL } = useOutletContext();


    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setIsSubmitting(true);

        const commentSetting = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ username, content })
        };

        try {
            const res = await fetch(`${API_URL}/posts/${postId}/comments`, commentSetting);

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to post comment.");
                return;
            }
         
            setComments((prev) => [...prev, data]);

            setUsername("");
            setContent("");
        } catch(err) {
            console.error(err);
            setError("Unable to connect to the server.");
        } finally {
            setIsSubmitting(false);
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
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                            }
                        } 
                        placeholder="Your name"
                        maxLength={30} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            setError("");
                            }
                        } 
                        rows="5" 
                        placeholder="Share your thoughts..."
                        maxLength={500}
                    />
                    <p>{content.length}/500</p>
                </div>

                {error && <p className='error-message'>{error}</p>}
               
               <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Posting..." : "Post Comment"}
               </button>
            </form>
    )
};

export default CommentsForm;