import { updatePost } from '../../api/postService';
import './Card.css'
import { Link, useOutletContext } from 'react-router';

const Card = ({ title, published, id, onDelete }) => {
    const { setPosts } = useOutletContext();
    const token = localStorage.getItem("token");

    const handlePublish = async () => {
        try {
            const updated = await updatePost(id, {
                token,
                published: !published,
            });

            setPosts(prev =>
                prev.map(p =>
                    p.id === updated.id ? updated : p
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    return(
    <div className="post-row">
        <div>
            <h3>{title}</h3>
            <p>{published ? "Published" : "Draft"}</p>
        </div>

        <div className="post-actions">
            <Link 
                to={`/admin/${id}/edit`}
                className='btn'
                id='secondary-btn'
            >
            Edit
            </Link>

            <button 
                className="btn" 
                id="secondary-btn"
                onClick={handlePublish}
            >
                {published ? "Unpublish" : "Publish"}
            </button>

            <button 
                className="btn" 
                id="secondary-btn"
                onClick={() => onDelete(id)}
            >
                Delete
            </button>
        </div>
    </div>    

    )
}

export default Card;