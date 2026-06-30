const FormFields = ({ form, setForm }) => {

    const updateField = (key, value) => {
        setForm(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <>
            {/* Title */}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Enter post title..."
                />
            </div>

            {/* Image Preview */}
            <div className="form-group">    
                   {form.imageUrl && (
                <img
                    src={form.imageUrl}
                    alt="Current"
                    style={{ width: "150px", marginBottom: "10px" }}
                />
            )}
            </div>

            {/* Image */}
            <div className="form-group">
                <label htmlFor="image">Cover Image</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => updateField("image", e.target.files[0])}
                />
            </div>

            {/* Tags */}
            <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                    type="text"
                    id="tags"
                    placeholder="React, JavaScript, Prisma..."
                    onChange={(e) => updateField(
                        "tags",
                        e.target.value
                         .split(",")
                         .map(t => t.trim())
                    )
                }
                />

                <small>
                    Separate tags with commas.
                </small>
            </div>

            {/* Content */}
            <div className="form-group">
                <label htmlFor="content">Content</label>

                <textarea
                    id="content"
                    rows="12"
                    value={form.content}
                    onChange={(e) => updateField("content", e.target.value)}
                    placeholder="Write your post..."
                />
            </div>

            {/* Checkbox */}
            <div className="checkbox-group">
                <input
                    type="checkbox"
                    id="published"
                    checked={form.published}
                    onChange={(e) => updateField("published", e.target.checked)}
                />

                <label htmlFor="published">
                    Publish immediately
                </label>
            </div>
        </>
    );
};

export default FormFields;