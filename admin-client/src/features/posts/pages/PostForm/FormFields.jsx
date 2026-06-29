const FormFields = ({
    title,
    setTitle,
    content,
    setContent,
    published,
    setPublished,
}) => {
    return (
        <>
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
                <label htmlFor="image">Cover Image</label>
                <input
                    type="file"
                    id="image"
                />
            </div>

            {/* Future TagInput component goes here */}
            <div className="form-group">
                <label htmlFor="tags">Tags</label>

                <input
                    type="text"
                    id="tags"
                    placeholder="React, JavaScript, Prisma..."
                />

                <small>
                    Separate tags with commas.
                </small>
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
        </>
    );
};

export default FormFields;