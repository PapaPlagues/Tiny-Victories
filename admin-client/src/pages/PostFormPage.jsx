import '../styles/PostFormPage.css';
import { useState } from "react";
import { API_URL } from '../config/config';
import { useOutletContext } from "react-router";

const PostForm = ({ mode }) => {

    const { setPosts } = useOutletContext();

    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postSetting = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}` },
            body: JSON.stringify({ title, content })
        };

        try {

            const res = await fetch(`${API_URL}/posts`, postSetting);

            const newPost = await res.json();

            if (!res.ok) {
                console.log("Failed to create post");
                return;
            }

            // maybe with createpost? then prev => [...prev, newPost]
            setPosts((prev) => [...prev, newPost]);

            setTitle("");
            setContent("");
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
                        <input type="checkbox" id="published" />
                        <label htmlFor="published">
                            Publish immediately
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn" id="main-btn">
                            {mode === "edit" ? "Save Changes" : "Create Post"}
                        </button>

                        <button type="button" className="btn" id="secondary-btn">
                            Cancel
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default PostForm;