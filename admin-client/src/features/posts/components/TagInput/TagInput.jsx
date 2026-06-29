const TagInput = () => {

    return(
    <div className="form-group">
        <label htmlFor="tags">
            Tags
        </label>

        <input
            id="tags"
            type="text"
            placeholder="React, JavaScript, Prisma..."
        />

        <small>
            Separate tags with commas.
        </small>
    </div>
    )
}

export default TagInput;