import './Card.css'
import { Link } from 'react-router';
const Card = ({ title, published, id }) => {

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

            <button className="btn" id="secondary-btn">
                {published ? "Unpublish" : "Publish"}
            </button>

            <button className="btn" id="secondary-btn">
                Delete
            </button>
        </div>
    </div>    

    )
}

export default Card;