import './PostFormPage.css';
import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router";
import { getPost, createPost, updatePost } from '../../api/postService';

const PostForm = ({ mode }) => {
    const { setPosts } = useOutletContext();
    const { postId } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);

   useEffect(() => {
    setTitle("");
    setContent("");
    setPublished(false);

    if (!postId) return;

    const loadPost = async () => {
        const data = await getPost(postId);

        setTitle(data.title);
        setContent(data.content);
        setPublished(data.published);
    };

    loadPost();
}, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let post;

            if (mode === 'create') {

                post = await createPost({
                    title, 
                    content, 
                    published, 
                    token,
                });
                
                setPosts((prev) => [...prev, post]);

                setTitle("");
                setContent("");
            } else {
               
                post = await updatePost(postId, {
                    title,
                    content,
                    published,
                    token,
                });

                setPosts(prev => 
                    prev.map(p => p.id === post.id ? post : p)
                );
            }

            navigate("/admin");
        } catch(err){
            console.error(err);
        }
    }

    return (
        <div className="post-form-page">

            <div className="post-form-container">

                <h1 className="form-title">
                    {mode === "edit" ? "Edit Post" : "Create Post"}
                </h1>

                <form className="post-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter post title..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Cover Image URL</label>
                        <input
                            type="text"
                            id="image"
                            placeholder="Paste image URL (or upload later)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            rows="12"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your post..."
                        />
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="published"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)} 
                        />
                        <label htmlFor="published">
                            Publish immediately
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn" id="main-btn">
                            {mode === "edit" ? "Save Changes" : "Create Post"}
                        </button>

                        <button type="button" className="btn" id="secondary-btn" onClick={() => navigate("/admin")}>
                            Cancel
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default PostForm;