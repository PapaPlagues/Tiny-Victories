import Card from "./Card";
import '../styles/PostList.css';

const PostList = ({ posts, activeTag, setActiveTag }) => {
    if (!posts || posts.length === 0) {
        return <p>No posts available.</p>
    }

    const filteredPosts = activeTag ? posts.filter(post =>
        post.tags?.some(tag => 
        (typeof tag === "string" ? tag : tag.name) === activeTag
        )
    ) : posts;

    const stripMarkdown = (text) => {
        if (!text) return "";

        return text
            .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
            .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
            .replace(/(`{1,3})(.*?)\1/g, "$2")
            .replace(/^#{1,6}\s*/gm, "")
            .replace(/^\s*>\s?/gm, "")
            .replace(/^\s*([-+*]|\d+\.)\s+/gm, "")
            .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
            .replace(/~~(.*?)~~/g, "$1")
            .replace(/<[^>]+>/g, "")
            .replace(/\s{2,}/g, " ")
            .trim();
    };

    const makeExcerpt = (text, max = 200) => {
        const plainText = stripMarkdown(text);
        if (!plainText) return "";
        if (plainText.length <= max) return plainText;
        return plainText.slice(0, max).trim() + "...";
    };

    return(
        <div id="post-list">
            {filteredPosts.map((post) => (
                <Card
                    key={post.id}
                    title={post.title}
                    excerpt={makeExcerpt(post.content, 250)}
                    img={post.imageUrl}
                    link={`/posts/${post.id}`}
                    tags={post.tags}
                    onTagClick={setActiveTag}
                />
            ))}
        </div>
    );
};

export default PostList;