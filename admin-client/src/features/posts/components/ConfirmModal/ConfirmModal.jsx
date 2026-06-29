import './ConfirmModal.css';

const ConfirmModal = ({
    isOpen,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">

                <h2>{title}</h2>
                <p>{message}</p>

                <div className="modal-actions">

                    <button
                        className="btn"
                        id="secondary-btn"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        className="btn danger"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ConfirmModal;