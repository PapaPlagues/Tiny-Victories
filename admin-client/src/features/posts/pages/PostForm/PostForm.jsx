import './PostFormPage.css';
import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router";

import {
    getPost,
    createPost,
    updatePost,
} from '../../api/postService';

import FormFields from './FormFields';
import FormActions from './FormActions';

const PostForm = ({ mode }) => {
    const { setPosts } = useOutletContext();
    const { postId } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);

    useEffect(() => {
        setTitle("");
        setContent("");
        setPublished(false);

        if (!postId) return;

        const loadPost = async () => {
            const data = await getPost(postId);

            setTitle(data.title);
            setContent(data.content);
            setPublished(data.published);
        };

        loadPost();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let post;

            if (mode === "create") {
                post = await createPost({
                    title,
                    content,
                    published,
                    token,
                });

                setPosts(prev => [...prev, post]);

                setTitle("");
                setContent("");
                setPublished(false);

            } else {

                post = await updatePost(postId, {
                    title,
                    content,
                    published,
                    token,
                });

                setPosts(prev =>
                    prev.map(p =>
                        p.id === post.id ? post : p
                    )
                );
            }

            navigate("/admin");

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="post-form-page">

            <div className="post-form-container">

                <h1 className="form-title">
                    {mode === "edit"
                        ? "Edit Post"
                        : "Create Post"}
                </h1>

                <form
                    className="post-form"
                    onSubmit={handleSubmit}
                >

                    <FormFields
                        title={title}
                        setTitle={setTitle}
                        content={content}
                        setContent={setContent}
                        published={published}
                        setPublished={setPublished}
                    />

                    <FormActions
                        mode={mode}
                        onCancel={() => navigate("/admin")}
                    />

                </form>

            </div>

        </div>
    );
};

export default PostForm;