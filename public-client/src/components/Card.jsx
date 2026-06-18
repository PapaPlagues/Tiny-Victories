import "../../styles/Card.css";

function Card({ title, excerpt, img, link}) {
    return(
        <a className="card" href={link}>
            {img && <img src={img} alt={title} className="card-img" />}

            <div className="card-content">
                <h2>{excerpt}</h2>
                <p>{excerpt}</p>
            </div>
        </a>
    );
}


export default Card;