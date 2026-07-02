import Comments from "../../components/Comments/Comments";

const FormFields = ({ form, setForm }) => {

    const updateField = (key, value) => {
        setForm(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            updateField("image", file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prev => ({
                    ...prev,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
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
                {(form.imagePreview || form.imageUrl) && (
                <img
                    src={form.imagePreview || form.imageUrl}
                    alt="Preview"
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
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            {/* Tags */}
            <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                    type="text"
                    id="tags"
                    value={form.tagsInput ?? ""}
                    placeholder="React, JavaScript, Prisma..."
                    onChange={(e) => {
                        const nextValue = e.target.value;
                        const nextTags = nextValue
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean);

                        updateField("tagsInput", nextValue);
                        updateField("tags", nextTags);
                    }}
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

            {/* Comments */}
           <Comments form={form} setForm={setForm} />
        </>
    );
};

export default FormFields;