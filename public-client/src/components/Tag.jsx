const Tag = ({children, onClick }) => {
    return(
        <span 
            className="tag"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick?.(children);
            }}
        >
            {children}
        </span>
    );
}

export default Tag;