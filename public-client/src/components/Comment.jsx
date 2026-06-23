import '../styles/Comment.css';

const Comment = ({ username ,content, createdAt }) => {

    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    if (!content) {
        return <p>No comment</p>
    }

    return(
        <div className="comment-card">
            <div className="comment-header">
                <p>{username}</p>

                <span>
                    {formattedDate}
                </span>
            </div>

            <p>{content}</p>
        </div>
    );
};

export default Comment;