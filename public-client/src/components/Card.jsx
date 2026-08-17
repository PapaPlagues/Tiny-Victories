import "../styles/Card.css";
import placeholderImage from "../assets/placeholder.png";
import Tag from "./Tag";

function Card({ title, excerpt, img, link, tags, onTagClick }) {

    const tagList = tags || [];

    return (
        <a className="card" href={link}>

             <img
                src={img || placeholderImage}
                alt={title}
                className="card-img"
                onError={(e) => {
                    e.currentTarget.src = placeholderImage;
                }}
            />

            <div className="card-content">
                <h2>{title}</h2>
                <p>{excerpt}</p>
            </div>

            {tagList.length > 0 && (
                <div className="card-tags">

                    {tagList.map((tag, index) => (
                        <Tag
                            key={index}
                            onClick={onTagClick}
                        >
                            {typeof tag === "string"
                                ? tag
                                : tag.name}
                        </Tag>
                    ))}

                </div>
            )}

        </a>
    );
}

export default Card;