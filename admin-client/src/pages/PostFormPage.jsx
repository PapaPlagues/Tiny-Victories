import '../styles/PostFormPage.css';

const PostForm = ({ mode, post, onSubmit }) => {



    return (
        <div className="post-form-page">

            <div className="post-form-container">

                <h1 className="form-title">
                    {mode === "edit" ? "Edit Post" : "Create Post"}
                </h1>

                <form className="post-form">

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
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