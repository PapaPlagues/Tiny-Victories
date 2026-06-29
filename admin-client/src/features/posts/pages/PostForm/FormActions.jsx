const FormActions = ({ mode, onCancel }) => {
    return (
        <div className="form-actions">

            <button
                type="submit"
                className="btn"
                id="main-btn"
            >
                {mode === "edit"
                    ? "Save Changes"
                    : "Create Post"}
            </button>

            <button
                type="button"
                className="btn"
                id="secondary-btn"
                onClick={onCancel}
            >
                Cancel
            </button>

        </div>
    );
};

export default FormActions;