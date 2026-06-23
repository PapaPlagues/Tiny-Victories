import "../styles/Card.css";
import placeholderImage from "../assets/placeholder.png";

function Card({ title, excerpt, img, link}) {
    return(
        <a className="card" href={link}>
            {/* {img && <img src={img} alt={title} className="card-img" />} */}
            
            {/* delete placeholder later */}
            <img src={placeholderImage} alt={title} className="card-img"/>

            <div className="card-content">
                <h2>{title}</h2>
                <p>{excerpt}</p>
            </div>
        </a>
    );
}


export default Card;